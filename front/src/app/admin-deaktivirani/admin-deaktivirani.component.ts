import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-admin-deaktivirani',
  templateUrl: './admin-deaktivirani.component.html',
  styleUrls: ['./admin-deaktivirani.component.css']
})
export class AdminDeaktiviraniComponent implements OnInit {
  constructor(private servis: KorisnikService) {  }

  // Podaci
  deaktivirani: Korisnik[] = [];

  dohvatiDeaktivirane() {
    this.servis.dohvatiDeaktivirane()
    .subscribe(data => {
      this.deaktivirani = (data as any).korisnici;
    });
  }

  ngOnInit(): void {
    this.dohvatiDeaktivirane();
  }

  aktivirajKorisnika(korisnickoIme: string) {
    this.servis.prihvatanjeZahteva(korisnickoIme)
    .subscribe(data => {
      this.dohvatiDeaktivirane();
    });
  }
}
