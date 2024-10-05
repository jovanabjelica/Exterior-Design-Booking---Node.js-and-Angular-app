import { Component, OnInit } from '@angular/core';
import { FirmaService } from '../services/firma.service';
import { KorisnikService } from '../services/korisnik.service';
import { ZahtevService } from '../services/zahtev.service';
import { Firma } from '../models/firma';
import { Korisnik } from '../models/korisnik';
import { Zahtev } from '../models/zahtev';
import { StatusZahteva } from '../constants/Statusi';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {
  constructor(private korisnikServis: KorisnikService, private router: Router, 
  private firmaServis: FirmaService, private zahtevServis: ZahtevService) {  }

  ukupanBrojDekorisanihBasti: number = 0;

  ukupanBrojRegistrovanihVlasnika: number = 0;
  ukupanBrojRegistrovanihDekoratera: number = 0;
  
  brojZakazanihPoslovaUPoslednjih24h: number = 0;
  brojZakazanihPoslovaUPoslednjih7Dana: number = 0;
  brojZakazanihPoslovaUPoslednjih30Dana: number = 0;

  firme: Firma[] = [];
  backupFirme: Firma[] = [];

  izracunajBrojRegistrovanihVlasnika() {
    this.korisnikServis.dohvatiVlasnike().subscribe(data => {
      let korisnici = (data as any).korisnici as Korisnik[];
      this.ukupanBrojRegistrovanihVlasnika = korisnici.length;
    });
  }

  izracunajBrojRegistrovanihDekoratera() {
    this.korisnikServis.dohvatiDekoratere().subscribe(data => {
      let korisnici = (data as any).korisnici as Korisnik[];
      this.ukupanBrojRegistrovanihDekoratera = korisnici.length;
    });
  }

  izracunajParametrePovezaneSaZahtevima() {
    this.zahtevServis.dohvatanjeSvihZahteva().subscribe(data => {
      let zahtevi = (data as any).zahtevi as Zahtev[];

      for (let zahtev of zahtevi) {
        if (zahtev.zavrsniDatum) this.ukupanBrojDekorisanihBasti += 1;

        let danas: Date = new Date();
        
        let pre24h: Date = new Date(danas);  
        pre24h.setDate(danas.getDate() - 1); 

        let pre7dana: Date = new Date(danas);
        pre7dana.setDate(danas.getDate() - 7);
        
        let pre30dana: Date = new Date(danas);
        pre30dana.setDate(danas.getDate() - 30); 

        if (zahtev.datumKreiranja && zahtev.status == StatusZahteva.NA_CEKANJU) {
          let datum = new Date(zahtev.datumKreiranja);
          if (datum >= pre24h) this.brojZakazanihPoslovaUPoslednjih24h += 1;
          if (datum >= pre7dana) this.brojZakazanihPoslovaUPoslednjih7Dana += 1;
          if (datum >= pre30dana) this.brojZakazanihPoslovaUPoslednjih30Dana += 1;
        }
      }
    });
  }

  dohvFirme() {
    this.firmaServis.dohvatanjeFirmi()
    .subscribe(data => {
      this.firme = (data as any).firme as Firma[];
      this.backupFirme = this.firme;
    });
  }

  ngOnInit(): void {
    this.izracunajBrojRegistrovanihVlasnika();
    this.izracunajBrojRegistrovanihVlasnika();
    this.izracunajParametrePovezaneSaZahtevima();
    this.dohvFirme();    
  }

  prijava() {
    this.router.navigate(['/prijava']);
  }

  registracija() {
    this.router.navigate(['/registracija']);
  }

  // Kako su firme sortirane
  sortiranePoNazivuOpadajuce: boolean = false;
  sortiranePoNazivuRastuce: boolean = false;
  sortiranePoAdresiRastuce: boolean = false;
  sortiranePoAdresiOpadajuce: boolean = false;

  // Pretraga
  pretragaNaziv: string = "";
  pretragaAdresa: string = "";

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
}
