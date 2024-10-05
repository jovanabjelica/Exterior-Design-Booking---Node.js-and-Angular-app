import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Greska } from '../constants/Greske';
import { PovratnePoruke } from '../constants/Poruke';
import { TipKorisnika } from '../constants/Tipovi';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-prijava-admin',
  templateUrl: './prijava-admin.component.html',
  styleUrls: ['./prijava-admin.component.css']
})
export class PrijavaAdminComponent {
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
      if (ret.poruka != PovratnePoruke.KORISNIK_USPESNO_PRONADJEN || (ret.korisnik as Korisnik).tip != TipKorisnika.ADMINISTRATOR) {
        this.greskaNepostojeciKorisnik = Greska.NEPOSTOJECI_KORISNIK;
        return;
      }
      this.router.navigate(["/admin"]);
    });
  }
}
