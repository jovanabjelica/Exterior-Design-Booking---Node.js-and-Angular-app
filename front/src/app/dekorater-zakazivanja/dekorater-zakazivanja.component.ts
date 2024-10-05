import { Component } from '@angular/core';
import { ZahtevService } from '../services/zahtev.service';
import { ActivatedRoute } from '@angular/router';
import { Zahtev } from '../models/zahtev';
import { StatusZahteva } from '../constants/Statusi';

@Component({
  selector: 'app-dekorater-zakazivanja',
  templateUrl: './dekorater-zakazivanja.component.html',
  styleUrls: ['./dekorater-zakazivanja.component.css']
})
export class DekoraterZakazivanjaComponent {
  // Promenljive
  zahteviNaCekanju: Zahtev[] = [];
  zahteviUIzradi: Zahtev[] = [];
  korisnik: string = "";
  modalOtvoren: boolean = false;
  zahtevZaOdbijanje: Zahtev = new Zahtev();

  // Input polja
  razlog: string = "";

  // Greske
  greskaRazlog: string = "";

  constructor(private servis: ZahtevService, private route: ActivatedRoute) {  }

  dohvZahteve() {
    this.servis.dohvatanjeSvihZahteva().
    subscribe(data => {
      let zahtevi = (data as any).zahtevi as Zahtev[];
      this.zahteviNaCekanju = zahtevi.filter((a) => 
        a.dekorater == this.korisnik + "@gmail.com" && a.status == StatusZahteva.NA_CEKANJU );
      this.zahteviUIzradi = zahtevi.filter((a) => 
        a.dekorater == this.korisnik + "@gmail.com" && a.status == StatusZahteva.ODOBREN && !a.zavrsniDatum );
    });
  }

  ngOnInit() {
    this.route.params.subscribe(data =>{
      this.korisnik = (data as any).korisnik;
      this.dohvZahteve();
    });
  }

  prihvatiZahtev(zahtev: Zahtev) {
    this.servis.prihvatiZahtev(zahtev.korisnik, zahtev.dekorater, zahtev.datum)
    .subscribe(data => {

    });
    alert("Zahtev uspesno prihvacen.");
    this.dohvZahteve();
  }

  odbijZahtev() {
    if (this.razlog == "") {
      this.greskaRazlog = "Morate uneti razlog odbijanja.";
      return;
    }
    
    this.servis.odbijZahtev(this.zahtevZaOdbijanje.korisnik, this.zahtevZaOdbijanje.dekorater, this.zahtevZaOdbijanje.datum, this.razlog)
    .subscribe(data => {

    });

    alert("Zahtev uspesno odbijen");
    this.dohvZahteve();
    this.zatvoriModal();
  }

  otvoriModal(zahtev: Zahtev) {
    this.zahtevZaOdbijanje = zahtev;
    this.modalOtvoren = true;
  }

  zatvoriModal() {
    this.razlog = "";
    this.greskaRazlog = "";
    this.modalOtvoren = false;
  }

  krajUredjivanja(zahtev: Zahtev) {
    this.servis.krajRada(zahtev.korisnik, zahtev.dekorater, zahtev.datum, new Date())
    .subscribe(data => {

    });
    alert("Zahtev uspesno azuriran.");
    this.dohvZahteve();
  }
}
