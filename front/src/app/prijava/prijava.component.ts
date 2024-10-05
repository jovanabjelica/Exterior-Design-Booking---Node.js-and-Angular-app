import { Component } from '@angular/core';

import { KorisnikService } from '../services/korisnik.service';
import { Router } from '@angular/router';
import { Greska } from '../constants/Greske';
import { PovratnePoruke } from '../constants/Poruke';
import { Korisnik } from '../models/korisnik';
import { TipKorisnika } from '../constants/Tipovi';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent {

  constructor(private servis: KorisnikService, private router: Router) {  }

  // Input polja
  korisnickoIme: string = "";
  lozinka: string = "";

  // Greske
  greskaKorisnickoIme: string = "";
  greskaLozinka: string = "";
  greskaNepostojeciKorisnik: string = "";

  prijava() {
    // Vracanje greski na pocetne vrednosti
    this.greskaKorisnickoIme = "";
    this.greskaLozinka = "";
    this.greskaNepostojeciKorisnik = "";

    // Provera da li su uneta sva polja
    if (this.korisnickoIme == "") {
      this.greskaKorisnickoIme = Greska.PRAZNO_KORISNICKO_IME;
      return;
    }

    if (this.lozinka == "") {
      this.greskaLozinka = Greska.PRAZNA_LOZINKA;
      return;
    }
    
    // Pronalazak korisnika u bazi
    this.servis.prijava(this.korisnickoIme, this.lozinka)
    .subscribe(data => {
      const ret = data as any;
      if (ret.poruka != PovratnePoruke.KORISNIK_USPESNO_PRONADJEN || ret.korisnik.Tip == TipKorisnika.ADMINISTRATOR) {
        this.greskaNepostojeciKorisnik = Greska.NEPOSTOJECI_KORISNIK;
        return;
      }
      const korisnik = ret.korisnik as Korisnik;
      const parametri = { korisnik : korisnik.korisnickoIme };

      let putanja; 

      // Provera tipa korisnika
      if (korisnik.tip == TipKorisnika.VLASNIK) {
        putanja = '/vlasnik-profil';
      }
      else if (korisnik.tip == TipKorisnika.DEKORATER) {
        putanja = '/dekorater-profil';
      }
      else {
        this.greskaNepostojeciKorisnik = Greska.NEPOSTOJECI_KORISNIK;
        return;
      }

      this.router.navigate([
        putanja,
        parametri
      ]);
    });
  }
}
