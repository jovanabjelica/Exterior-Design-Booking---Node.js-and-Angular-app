import { Component, OnInit } from '@angular/core';
import { KorisnikService } from '../services/korisnik.service';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  
  constructor (private servis: KorisnikService) {  }
  
  vlasnici: Korisnik[] = [];

  dohvatiVlasnike() {
    this.servis.dohvatiVlasnike()
    .subscribe(data => {
      this.vlasnici = (data as any).korisnici;
    });
  }

  ngOnInit(): void {
    this.dohvatiVlasnike();
  }

  deaktivirajVlasnika(korisnickoIme: string) {
    this.servis.deaktiviranjeKorisnika(korisnickoIme)
    .subscribe(data => {
      this.dohvatiVlasnike();
    });
  }
}
