import { Component } from '@angular/core';
import { Greska } from '../constants/Greske';
import { KorisnikService } from '../services/korisnik.service';
import { Router } from '@angular/router';
import { PovratnePoruke } from '../constants/Poruke';
import { Alert } from '../constants/Alert';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent {

  constructor(private servis: KorisnikService, private router: Router) {  }

  // Input polja
  korisnickoIme: string = "";
  staraLozinka: string = "";
  novaLozinka: string = "";

  // Greske
  greskaKorisnickoIme: string = "";
  greskaStaraLozinka: string = "";
  greskaNovaLozinka: string = "";
  greskaNepostojeciKorisnik: string = "";

  proveraFormataLozinke() {
    if (this.novaLozinka.length < 6 || this.novaLozinka.length > 10 ||
      !/^[a-zA-Z]/.test(this.novaLozinka) ||
      !/[A-Z]/.test(this.novaLozinka) ||
      (this.novaLozinka.match(/[a-z]/g) || []).length < 3 ||
      !/\d/.test(this.novaLozinka) ||
      !/[!@#\$%\^&\*\(\)_\+{}\[\]:;<>,.?~\\/-]/.test(this.novaLozinka)
    ) {
      this.greskaNovaLozinka = Greska.NEVALIDNA_LOZINKA;
      return false;
    }      
    return true;
  }

  promenaLozinke() {
    // Vracanje greski na pocetne vrednosti
    this.greskaKorisnickoIme = "";
    this.greskaStaraLozinka = "";
    this.greskaNovaLozinka = "";
    this.greskaNepostojeciKorisnik = "";

    // Provera da li su sva polja uneta
    if (this.korisnickoIme == "") {
      this.greskaKorisnickoIme = Greska.PRAZNO_KORISNICKO_IME;
      return;
    }

    if (this.staraLozinka == "") {
      this.greskaStaraLozinka = Greska.PRAZNA_STARA_LOZINKA;
      return;
    }

    if (this.staraLozinka == "") {
      this.greskaNovaLozinka = Greska.PRAZNA_NOVA_LOZINKA;
      return;
    }

    if (!this.proveraFormataLozinke()) {
      return;
    }

    // Promena lozinke
    this.servis.promenaLozinke(this.korisnickoIme, this.staraLozinka, this.novaLozinka)
    .subscribe(data => {
      const ret = data as any;
      if (ret.poruka == PovratnePoruke.LOZINKA_USPESNO_AZURIRANA) {
        alert(Alert.LOZINKA_PROMENJENA);
        this.router.navigate(['/prijava']);
        return;
      } 

      this.greskaNepostojeciKorisnik = Greska.NEPOSTOJECI_KORISNIK;
      return;
    });    
  }
}
