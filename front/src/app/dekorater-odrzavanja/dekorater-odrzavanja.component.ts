import { Component, OnInit } from '@angular/core';
import { Zahtev } from '../models/zahtev';
import { ActivatedRoute } from '@angular/router';
import { ZahtevService } from '../services/zahtev.service';
import { StatusZahteva } from '../constants/Statusi';

@Component({
  selector: 'app-dekorater-odrzavanja',
  templateUrl: './dekorater-odrzavanja.component.html',
  styleUrls: ['./dekorater-odrzavanja.component.css']
})
export class DekoraterOdrzavanjaComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private servis: ZahtevService) {  }

  odrzavanja: Zahtev[] = [];
  korisnik: string = "";

  dohvZahteve() {
    this.servis.dohvatanjeSvihZahteva()
    .subscribe(data => {
      let zahtevi = (data as any).zahtevi as Zahtev[];
      this.odrzavanja = zahtevi.filter((a) => 
        a.dekorater == this.korisnik + "@gmail.com" && a.status == StatusZahteva.ODRZAVANJE && !a.zavrsniDatum)
    })
  }

  ngOnInit() {
    this.route.params
    .subscribe(data => {
      this.korisnik = (data as any).korisnik;
      this.dohvZahteve();
    });
  }

  odbijOdrzavanje(zahtev: Zahtev) {
    this.servis.odbijOdrzavanje(zahtev.korisnik, zahtev.dekorater, zahtev.datum)
    .subscribe(data => {

    });
    alert("Odrzavanje uspesno odbijeno.");
    this.dohvZahteve();
  }

  prihvatiOdrzavanje(zahtev: Zahtev) {
    this.servis.prihvatiOdrzavanje(zahtev.korisnik, zahtev.dekorater, zahtev.datum)
    .subscribe(data => {

    });
    alert("Odrzavanje uspesno prihvaceno.");
    this.dohvZahteve();
  }
}
