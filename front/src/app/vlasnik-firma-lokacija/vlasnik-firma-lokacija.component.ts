import { Component, OnInit } from '@angular/core';
import { Alert } from '../constants/Alert';
import { PovratnePoruke } from '../constants/Poruke';
import { Firma } from '../models/firma';
import { ActivatedRoute, Router } from '@angular/router';
import { FirmaService } from '../services/firma.service';

@Component({
  selector: 'app-vlasnik-firma-lokacija',
  templateUrl: './vlasnik-firma-lokacija.component.html',
  styleUrls: ['./vlasnik-firma-lokacija.component.css'],
})
export class VlasnikFirmaLokacijaComponent implements OnInit {

  korisnik: string = "";
  firma: Firma = new Firma();
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  constructor(private route: ActivatedRoute, private servis: FirmaService, private router: Router) { }

  ngOnInit(): void {
    this.dohvatanjeFirme();
  }

  dohvatanjeFirme(): void {
    this.route.params.subscribe(data => {
      const params = data as any;
      this.korisnik = params.korisnik;
      
      this.servis.dohvatanjeFirme(params.firma)
        .subscribe(data => {
          const odgovor = data as any;
          if (odgovor.poruka !== PovratnePoruke.FIRMA_USPESNO_PRONADJENA) {
            alert(Alert.GRESKA_PRILIKOM_DOHVATANJA_FIRME);
            this.router.navigate(['']);
          } else {
            this.firma = odgovor.firma as Firma;
            this.center = {
              lat: this.firma.geografskaSirina,
              lng: this.firma.geografskaDuzina
            };
          }
        });
    });
  }
}
