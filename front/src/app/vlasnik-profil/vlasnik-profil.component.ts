import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import { PovratnePoruke } from '../constants/Poruke';
import { Greska } from '../constants/Greske';
import { Alert } from '../constants/Alert';

@Component({
  selector: 'app-vlasnik-profil',
  templateUrl: './vlasnik-profil.component.html',
  styleUrls: ['./vlasnik-profil.component.css']
})
export class VlasnikProfilComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private router: Router, private servis: KorisnikService) { }

  vlasnik: Korisnik = new Korisnik();

  // Input polja
  korisnickoIme: string = "";
  ime: string = "";
  prezime: string = "";
  email: string = "";
  adresa: string = "";
  kontaktTelefon: string = "";
  kreditnaKartica: string = "";
  slika: File|null = null;

  // Greske
  greskaKorisnickoIme: string = "";
  greskaIme: string = "";
  greskaPrezime: string = "";
  greskaEmail: string = "";
  greskaAdresa: string = "";
  greskaKontaktTelefon: string = "";
  greskaKreditnaKartica: string = "";
  greskaSlika: string = "";

  // Tip Kartice
  tipKartice: String = "";
  visa: boolean = false;
  diners: boolean = false;
  master: boolean = false;

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

  dohvKorisnika() {
    this.route.params.subscribe(data => {
      const params = data as any;
      let korisnickoIme = params.korisnik;
      this.servis.pronadjiKorisnika(korisnickoIme)
      .subscribe(data => {
        const ret = data as any;
        if (ret.poruka != PovratnePoruke.VLASNIK_POSTOJI) {
          alert("ERROR");
          this.router.navigate(['/prijava']);
        }
        else {
          this.vlasnik = ret.vlasnik;
          this.korisnickoIme = this.vlasnik.korisnickoIme;
          this.ime = this.vlasnik.ime;
          this.prezime = this.vlasnik.prezime;
          this.email = this.vlasnik.email;
          this.adresa = this.vlasnik.adresa;
          this.kontaktTelefon = this.vlasnik.kontaktTelefon;
          this.kreditnaKartica = this.vlasnik.brojKreditneKartice;
          this.proveraFormataKreditneKartice();
        }
      });
    });     
  }

  ngOnInit(): void {
    this.dohvKorisnika();
  }

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

  azuriranje(): void {
    this.servis.azuriranjeKorisnika(this.vlasnik.korisnickoIme, this.korisnickoIme, this.ime, this.prezime, this.email, this.adresa, this.kontaktTelefon, this.kreditnaKartica, this.slika) 
    .subscribe(data => {
      let odgovor = data as any;
      if (odgovor.poruka != PovratnePoruke.KORISNICKI_PODACI_USPESNO_AZURIRANI) {
        alert(Alert.GRESKA_PRILIKOM_AZURIRANJA_PODATAKA);
        return;
      }
      
      alert(Alert.KORISNIK_USPESNO_AZURIRAN);
      const korisnik = odgovor.korisnik as Korisnik;
      const parametri = { korisnik : korisnik.korisnickoIme };
      this.router.navigate(['/vlasnik-profil', parametri]);
    });                             
  }
 
  azurirajPodatke() {
    // Resetovanje greski
    this.greskaKorisnickoIme = "";
    this.greskaIme = "";
    this.greskaPrezime = "";
    this.greskaEmail = "";
    this.greskaAdresa = "";
    this.greskaKontaktTelefon = "";
    this.greskaKreditnaKartica = "";
    this.greskaSlika = "";

    // Provera input polja
    if (this.korisnickoIme == "") {
      this.greskaKorisnickoIme = Greska.PRAZNO_KORISNICKO_IME;
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
    }
    if (this.kontaktTelefon == "") {
      this.greskaKontaktTelefon = Greska.PRAZAN_KONTAKT_TELEFON;
      return;
    }
    if (this.kreditnaKartica == "") {
      this.greskaKreditnaKartica = Greska.PRAZAN_BROJ_KREDITNE_KARTICE;
      return;
    }
    if (!this.proveraFormataKreditneKartice()) {
      this.greskaKreditnaKartica = Greska.NEVALIDNA_KREDITNA_KARTICA;
      return;
    }
    
    if (this.korisnickoIme != this.vlasnik.korisnickoIme) {
      // Provera jedinstvenosti korisnickog imena AKO se razlikuje od trenutnog
      this.servis.korisnickoImeJedinstveno(this.korisnickoIme)
      .subscribe(data => {
          let odgovor = data as any;
          if (odgovor.poruka != PovratnePoruke.KORISNICKO_IME_JEDINSTVENO) {
            this.greskaKorisnickoIme = Greska.KORISNICKO_IME_ZAUZETO;
            return;
          }

          if (this.email != this.vlasnik.email) {
            // Provera jedinstvenosti email adrese AKO se razlikuje od trenutne
            this.servis.emailJedinstven(this.email)
            .subscribe(data => {
              let odgovor = data as any;

              if (odgovor.poruka != PovratnePoruke.EMAIL_JEDINSTVEN) {
                this.greskaEmail = Greska.EMAIL_ZAUZET;
                return;
              }

              this.azuriranje();
            });
          }
          else {
            this.azuriranje();
          }
        }
      );
    }
    else {
      if (this.email != this.vlasnik.email) {
        // Provera jedinstvenosti email adrese AKO se razlikuje od trenutne
        this.servis.emailJedinstven(this.email)
        .subscribe(data => {
          let odgovor = data as any;

          if (odgovor.poruka != PovratnePoruke.EMAIL_JEDINSTVEN) {
            this.greskaEmail = Greska.EMAIL_ZAUZET;
            return;
          }

          this.azuriranje();
        });
      }
      else {
        this.azuriranje();
      }
    }
  }
}
