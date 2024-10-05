import { Component, OnInit } from '@angular/core';
import { FirmaService } from '../services/firma.service';
import { Firma } from '../models/firma';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vlasnik-firme',
  templateUrl: './vlasnik-firme.component.html',
  styleUrls: ['./vlasnik-firme.component.css']
})
export class VlasnikFirmeComponent implements OnInit {
  constructor(private servis: FirmaService, private router: Router, private route: ActivatedRoute) {  }

  // Promenljive
  firme: Firma[] = [];
  firma: Firma|null = null;
  backupFirme: Firma[] = [];
  korisnik: string = "";

  // Kako su firme sortirane
  sortiranePoNazivuOpadajuce: boolean = false;
  sortiranePoNazivuRastuce: boolean = false;
  sortiranePoAdresiRastuce: boolean = false;
  sortiranePoAdresiOpadajuce: boolean = false;

  // Pretraga
  pretragaNaziv: string = "";
  pretragaAdresa: string = "";

  dohvatiFirme() {
    this.servis.dohvatanjeFirmi()
    .subscribe(data => {
      this.firme = (data as any).firme;
      this.backupFirme = this.firme;
    });
  }

  zatvoriModal(): void {
    this.firma = null;
  }

  otvoriModal(f: Firma): void {
    this.firma = f;
  }

  ngOnInit(): void {
    this.route.params.subscribe(data =>{
      const params = data as any;
      this.korisnik = params.korisnik;
    });

    this.dohvatiFirme();
  }

  sortirajFirmePoNazivuRastuce(): void {
    this.firme.sort((a: Firma, b: Firma) => {
      return a.naziv.localeCompare(b.naziv);
    });
    this.sortiranePoNazivuRastuce = true;
    this.sortiranePoNazivuOpadajuce = false;
  }

  sortirajFirmePoNazivuOpadajuce(): void {
    this.firme.sort((a: Firma, b: Firma) => {
      return b.naziv.localeCompare(a.naziv);
    });
    this.sortiranePoNazivuRastuce = false;
    this.sortiranePoNazivuOpadajuce = true;
  }

  sortirajFirmePoAdresiRastuce(): void {
    this.firme.sort((a: Firma, b: Firma) => {
      return a.adresa.localeCompare(b.adresa);
    });
    this.sortiranePoAdresiRastuce = true;
    this.sortiranePoAdresiOpadajuce = false;
  }

  sortirajFirmePoAdresiOpadajuce(): void {
    this.firme.sort((a: Firma, b: Firma) => {
      return b.adresa.localeCompare(a.adresa);
    });
    this.sortiranePoAdresiRastuce = false;
    this.sortiranePoAdresiOpadajuce = true;
  }

  sortirajFirmePoNazivu(): void {
    if (this.sortiranePoNazivuRastuce) {
      this.sortirajFirmePoNazivuOpadajuce();
    } 
    else {
      this.sortirajFirmePoNazivuRastuce();
    }
  }
  
  sortirajFirmePoAdresi(): void {
    if (this.sortiranePoAdresiRastuce) {
      this.sortirajFirmePoAdresiOpadajuce();
    } 
    else {
      this.sortirajFirmePoAdresiRastuce();
    }
  }
  
  filtrirajFirme() {
    return this.firme.filter(firma =>
        firma.naziv.toLowerCase().includes(this.pretragaNaziv.toLowerCase()) &&
        firma.adresa.toLowerCase().includes(this.pretragaAdresa.toLowerCase())
    );
  }

  onSearchChange(event: Event) {
    if (this.pretragaNaziv == "" && this.pretragaAdresa == "") {
      this.firme = this.backupFirme;
    }
    else {
      this.firme = this.filtrirajFirme();
    }
  }

  prikaziDetalje(firmaNaziv: string) {
    this.router.navigate(['vlasnik-firma', { korisnik: this.korisnik, firma: firmaNaziv }])        
  }  
}
