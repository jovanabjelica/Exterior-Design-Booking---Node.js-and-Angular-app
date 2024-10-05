import { Component, OnInit } from '@angular/core';
import { Greska } from '../constants/Greske';
import { Alert } from '../constants/Alert';
import { PovratnePoruke } from '../constants/Poruke';
import { KorisnikService } from '../services/korisnik.service';
import { Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-admin-dekorater',
  templateUrl: './admin-dekorater.component.html',
  styleUrls: ['./admin-dekorater.component.css']
})
export class AdminDekoraterComponent implements OnInit {
  
  constructor(private servis: KorisnikService, private router: Router) {  }

  // Tip Kartice
  tipKartice: String = "";
  visa: boolean = false;
  diners: boolean = false;
  master: boolean = false;

  // Podaci
  daLiJeModalOtvoren = false;
  dekorateri: Korisnik[] = [];

  // Input polja
  korisnickoIme: string = "";
  lozinka: string = "";
  ime: string = "";
  prezime: string = "";
  kreditnaKartica: string = "";
  telefon: string = "";
  email: string = "";
  pol: string = "";

  // Greske
  greskaKorisnickoIme: string = "";
  greskaLozinka: string = "";
  greskaIme: string = "";
  greskaPrezime: string = "";
  greskaKreditnaKartica: string ="";
  greskaTelefon: string = "";
  greskaEmail: string = "";
  greskaPol: string = "";

  dohvatiDekoratere() {
    this.servis.dohvatiDekoratere()
    .subscribe(data => {
      this.dekorateri = (data as any).korisnici;
    });
  }

  ngOnInit(): void {
    this.visa = false;
    this.diners = false;
    this.master = false;
    this.dohvatiDekoratere();
  }

  pocetneVrednosti() {
    this.korisnickoIme = "";
    this.lozinka = "";
    this.ime = "";
    this.prezime = "";
    this.kreditnaKartica = "";
    this.telefon = "";
    this.email = "";
    this.pol = "";

    this.greskaKorisnickoIme = "";
    this.greskaLozinka = "";
    this.greskaIme = "";
    this.greskaPrezime = "";
    this.greskaKreditnaKartica = "";
    this.greskaTelefon = "";
    this.greskaEmail = "";
    this.greskaPol = "";
  }

  otvoriModal() {
    this.visa = false;
    this.diners = false;
    this.master = false;
    this.daLiJeModalOtvoren = true;
  }

  zatvoriModal() {
    this.pocetneVrednosti();
    this.daLiJeModalOtvoren = false;
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

  dodavanjeDekoratera() {
    // Vracanje greski na pocetne vrednosti
    this.greskaKorisnickoIme = "";
    this.greskaLozinka = "";
    this.greskaIme = "";
    this.greskaPrezime = "";
    this.greskaEmail = "";
    this.greskaKreditnaKartica = "";
    this.greskaTelefon = "";
    this.greskaPol = "";

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
          this.greskaKorisnickoIme = Greska.EMAIL_ZAUZET;
          return;
        }

        this.servis.dodavanjeDekoratera(this.korisnickoIme, this.lozinka, this.email, this.ime, this.prezime, this.pol, this.telefon, this.kreditnaKartica)
        .subscribe(data => {
          if ((data as any).poruka == PovratnePoruke.DEKORATER_KREIRAN) {
            alert(Alert.DEKORATER_USPESNO_REGISTROVAN);
          }
          else {
            alert(Alert.GRESKA_PRILIKOM_DODAVANJA_DEKORATERA);
          }
          
          this.zatvoriModal();
          this.dohvatiDekoratere();
        });
      });
    });
  }

  deaktivirajKorisnika(korisnickoIme: string) {
    this.servis.deaktiviranjeKorisnika(korisnickoIme)
    .subscribe(data => {
      this.dohvatiDekoratere();
    });
  }
}
