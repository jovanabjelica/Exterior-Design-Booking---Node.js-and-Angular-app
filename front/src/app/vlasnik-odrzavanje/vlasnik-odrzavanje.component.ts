import { Component, OnInit } from '@angular/core';
import { Zahtev } from '../models/zahtev';
import { ZahtevService } from '../services/zahtev.service';
import { StatusZahteva } from '../constants/Statusi';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vlasnik-odrzavanje',
  templateUrl: './vlasnik-odrzavanje.component.html',
  styleUrls: ['./vlasnik-odrzavanje.component.css']
})
export class VlasnikOdrzavanjeComponent implements OnInit{
  
  constructor(private servis: ZahtevService, private route: ActivatedRoute) {  }

  korisnik: string = "";
  zavrseniZahtevi: Zahtev[] = [];
  odrzavanje: Zahtev[] = [];

  dohvZahteve() {
    this.servis.dohvatanjeSvihZahteva()
    .subscribe(data => {
      let zahtevi = (data as any).zahtevi as Zahtev[];
      this.zavrseniZahtevi = zahtevi.filter((a) => a.korisnik == this.korisnik && a.zavrsniDatum);
      this.odrzavanje = zahtevi.filter((a) => a.korisnik == this.korisnik && a.status == StatusZahteva.ODRZAVANJE && !a.zavrsniDatum);
    });
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.korisnik = (data as any).korisnik;
      this.dohvZahteve();
    });
  }

  proslo6Meseci(datum: Date) {
    const m = new Date(datum);
    m.setMonth(m.getMonth() + 6);

    const danas = new Date();
    if (danas >= m)
      return true;

    return false;
  }

  zakaziOdrzavanje(zahtev: Zahtev) {
    this.servis.zakazivanjeOdrzavanje(zahtev.korisnik, zahtev.dekorater, zahtev.datum)
    .subscribe(data => {
      
    });
    alert("Odrzavanje uspesno zakazano.")
    this.dohvZahteve();
  }
}
