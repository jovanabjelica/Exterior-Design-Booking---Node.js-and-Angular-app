import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import { PovratnePoruke } from '../constants/Poruke';

@Component({
  selector: 'app-admin-zahtevi',
  templateUrl: './admin-zahtevi.component.html',
  styleUrls: ['./admin-zahtevi.component.css']
})
export class AdminZahteviComponent implements OnInit {

  constructor(private servis: KorisnikService) {  }

  // Podaci
  zahtevi: Korisnik[] = [];
  selectedUser: string | null = null;

  dohvatiZahteve() {
    this.servis.dohvatiZahteve()
    .subscribe(data => {
      this.zahtevi = (data as any).korisnici;
    });
  }

  ngOnInit(): void {
    this.dohvatiZahteve();
  }

  prihvatiZahtev(korisnickoIme: string) {
    this.servis.prihvatanjeZahteva(korisnickoIme)
    .subscribe(data => {
      if ((data as any).poruka == PovratnePoruke.ZAHTEV_PRIHVACEN) {
        this.dohvatiZahteve();
      }
    });
  }

  odbijZahtev(korisnickoIme: string) {
    this.servis.odbijanjeZahteva(korisnickoIme)
    .subscribe(data => {
      if ((data as any).poruka == PovratnePoruke.ZAHTEV_ODBIJEN) {
        this.dohvatiZahteve();
      }
    });
  }
}
