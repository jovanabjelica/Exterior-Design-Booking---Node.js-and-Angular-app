import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PovratnePoruke } from '../constants/Poruke';
import { Korisnik } from '../models/korisnik';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-vlasnik-side-menu',
  templateUrl: './vlasnik-side-menu.component.html',
  styleUrls: ['./vlasnik-side-menu.component.css']
})
export class VlasnikSideMenuComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private servis: KorisnikService) { }

  vlasnik: Korisnik = new Korisnik();

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      const params = data as any;
      const korisnickoIme = params.korisnik;
      this.servis.pronadjiKorisnika(korisnickoIme)
      .subscribe(data => {
        const ret = data as any;
        if (ret.poruka != PovratnePoruke.VLASNIK_POSTOJI) {
          alert("ERROR");
          this.router.navigate(['/prijava']);
        }
        else {
          this.vlasnik = ret.vlasnik;
        }
      });
    }); 
  }
}
