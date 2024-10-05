import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { KorisnikService } from '../services/korisnik.service';
import { Greska } from '../constants/Greske';
import { PovratnePoruke } from '../constants/Poruke';
import { Alert } from '../constants/Alert';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent  implements OnInit{
  constructor(private router: Router, private servis: KorisnikService) { }

  // Input polja
  korisnickoIme: string = "";
  lozinka: string = "";
  ime: string = "";
  prezime: string = "";
  email: string = "";
  pol: string = "";
  adresa: string = "";
  telefon: string = "";
  kreditnaKartica: string = "";
  slika: File|null = null;

  // Greske
  greskaKorisnickoIme: string = "";
  greskaLozinka: string = "";
  greskaIme: string = "";
  greskaPrezime: string = "";
  greskaEmail: string = "";
  greskaPol: string = "";
  greskaAdresa: string = "";
  greskaTelefon: string = "";
  greskaKreditnaKartica: string = "";
  greskaSlika: string = "";

  // Tip Kartice
  tipKartice: String = "";
  visa: boolean = false;
  diners: boolean = false;
  master: boolean = false;

  ngOnInit(): void {
    this.visa = false;
    this.diners = false;
    this.master = false;
  }

  // Cuvanje slike
  odabirSlike(event: any) {
    const file = event.target.files[0];

    // Provera veličinu fajla u pikselima
    const minSize = 100 * 100; // 100x100 px
    const maxSize = 300 * 300; // 300x300 px
  
    // Veličina fajla u bajtovima
    const fileSizeInBytes = file.size;
  
    // Konvertovanje bajtove u piksele (pretpostavka: 1 px = 3 bajta za RGB sliku)
    const fileSizeInPixels = fileSizeInBytes / 3;
  
    if (fileSizeInPixels < minSize || fileSizeInPixels > maxSize) {
      this.greskaSlika = Greska.NEVALIDNE_DIMENZIJE_SLIKE;
    } else {
      this.slika = file;
    }
  }

  proveraFormataLozinke() {
    if (this.lozinka.length < 6 || this.lozinka.length > 10 ||
      !/^[a-zA-Z]/.test(this.lozinka) ||
      !/[A-Z]/.test(this.lozinka) ||
      (this.lozinka.match(/[a-z]/g) || []).length < 3 ||
      !/\d/.test(this.lozinka) ||
      !/[!@#\$%\^&\*\(\)_\+{}\[\]:;<>,.?~\\/-]/.test(this.lozinka)
    ) {
      this.greskaLozinka = Greska.NEVALIDNA_LOZINKA;
      return false;
    }      
    return true;
  }

  proveraFormataKreditneKartice() {
    const dinersRegex1 = /^(300|301|302|303)\d{12}$/;
    const dinersRegex2 = /^(36|38)\d{13}$/;
    const masterCardRegex = /^(51|52|53|54|55)\d{14}$/;
    const visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/;
  
    if (dinersRegex1.test(this.kreditnaKartica) || dinersRegex2.test(this.kreditnaKartica)) {
      this.diners = true;
      this.master = false;
      this.visa = false;
      return true;
    } else if (masterCardRegex.test(this.kreditnaKartica)) {
      this.master = true;
      this.diners = false;
      this.visa = false;
      return true;
    } else if (visaRegex.test(this.kreditnaKartica)) {
      this.visa = true;
      this.master = false;
      this.diners = false;
      return true;
    } else {
      this.diners = false;
      this.visa = false;
      this.master = false;
      return false;
    }
  }

  registracija() {
    // Vracanje greski na pocetne vrednosti
    this.greskaKorisnickoIme = "";
    this.greskaLozinka = "";
    this.greskaIme = "";
    this.greskaPrezime = "";
    this.greskaEmail = "";
    this.greskaAdresa = "";
    this.greskaKreditnaKartica = "";
    this.greskaTelefon = "";
    this.greskaPol = "";
    this.greskaSlika = "";

    // Provera sa li su uneta sva obavezna polja
    if (this.korisnickoIme == "") {
      this.greskaKorisnickoIme = Greska.PRAZNO_KORISNICKO_IME;
      return;
    }

    if (this.lozinka == "") {
      this.greskaLozinka = Greska.PRAZNA_LOZINKA;
      return;
    }

    if (this.ime == "") {
      this.greskaIme = Greska.PRAZNO_IME;
      return;
    }

    if (this.prezime == "") {
      this.greskaPrezime = Greska.PRAZNO_PREZIME;
      return;
    }

    if (this.email == "") {
      this.greskaEmail = Greska.PRAZAN_EMAIL;
      return;
    }

    if (this.adresa == "") {
      this.greskaAdresa = Greska.PRAZNA_ADRESA;
      return;
    }

    if (this.kreditnaKartica == "") {
      this.greskaKreditnaKartica = Greska.PRAZAN_BROJ_KREDITNE_KARTICE;
      return;
    }

    if (this.telefon == "") {
      this.greskaTelefon = Greska.PRAZAN_KONTAKT_TELEFON;
      return;
    }

    if (this.pol == "") {
      this.greskaPol = Greska.PRAZAN_POL;
      return;
    }

    // Provera da li je lozinka u dobrom formatu
    if (!this.proveraFormataLozinke()) {
      return;
    }

    // Provera da li je kreditna kartica u dobrom formatu
    if (!this.proveraFormataKreditneKartice()) {
      this.greskaKreditnaKartica = Greska.NEVALIDNA_KREDITNA_KARTICA;
      return;
    }

    // Provera da li je korisnicko ime jedinstveno
    this.servis.korisnickoImeJedinstveno(this.korisnickoIme)
    .subscribe(data => {
      let odgovor = data as any;

      if (odgovor.poruka != PovratnePoruke.KORISNICKO_IME_JEDINSTVENO) {
        this.greskaKorisnickoIme = Greska.KORISNICKO_IME_ZAUZETO;
        return;
      }

      // Provera da li je email jedinstven
      this.servis.emailJedinstven(this.email).subscribe(data => {
        let odgovor = data as any;

        if (odgovor.poruka != PovratnePoruke.EMAIL_JEDINSTVEN) {
          this.greskaEmail = Greska.EMAIL_ZAUZET;
          return;
        }

        // Cuvanje zahteva za registracijom u bazi
        this.servis.registracija(this.ime, this.prezime, this.korisnickoIme, this.lozinka, this.email, this.telefon, this.pol, this.adresa, this.kreditnaKartica, this.slika)
        .subscribe(data => {
          alert(Alert.POSLAT_ZAHTEV_ZA_REGISTRACIJOM);
          this.router.navigate(['']);
          return;
        });      
      });
    });
  }
}
