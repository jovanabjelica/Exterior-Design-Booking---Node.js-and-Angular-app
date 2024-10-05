import { Component, OnInit } from '@angular/core';
import { FirmaService } from '../services/firma.service';
import { Greska } from '../constants/Greske';
import { Alert } from '../constants/Alert';
import { PovratnePoruke } from '../constants/Poruke';
import { Firma } from '../models/firma';
import { Korisnik } from '../models/korisnik';

@Component({
  selector: 'app-admin-firma',
  templateUrl: './admin-firma.component.html',
  styleUrls: ['./admin-firma.component.css']
})
export class AdminFirmaComponent implements OnInit {

  constructor(private servis: FirmaService) {  }
  
  firme: Firma[] = [];
  dekorateri: Korisnik[] = [];

  // Input polja
  naziv: string = ""; 
  adresa: string = "";
  geografskaSirina: number = 0;
  geografskaDuzina: number = 0; 
  naziviUsluga: string[] = [];
  ceneUsluga: number[] = [];
  kontaktOsoba: string = "";
  godisnjiOdmorPocetak: Date|null = null; 
  godisnjiOdmorKraj: Date|null = null;
  zaposleni: string[] = [];
  nazivUsluge: string = "";
  cenaUsluge: number = 0;
  
  // Novi zaposleni
  zaposleniEmail: string = "";

  // Greske
  greskaNaziv: string = "";
  greskaAdresa: string = "";
  greskaUsluge: string = "";
  greskaKontaktOsoba: string = "";
  greskaGodisnjiOdmorPocetak: string = "";
  greskaGodisnjiOdmorKraj: string = "";
  greskaZaposleni: string = "";
  greskaNazivUsluge: string = "";
  greskaCenaUsluge: string = "";
  
  // Podaci
  daLiJeModalOtvoren = false;
  
  dohvatiFirme() {
    this.servis.dohvatanjeFirmi()
    .subscribe(data => {
      this.firme = (data as any).firme;
    });
  }

  dohvatiSlobodneDekoratere() {
    this.servis.dohvatanjeSlobodnihDekoratera()
    .subscribe(data=>{
      this.dekorateri = (data as any).dekorateri as Korisnik[];
    });
  }

  ngOnInit(): void {
    this.dohvatiFirme();
    this.dohvatiSlobodneDekoratere();
  }

  otvoriModal() {
    // Vracanje gresaka na pocetne vrednosti
    this.greskaNaziv = "";
    this.greskaAdresa = "";
    this.greskaNazivUsluge = "";
    this.greskaKontaktOsoba = "";
    this.greskaGodisnjiOdmorPocetak = "";
    this.greskaGodisnjiOdmorKraj = "";
    this.greskaZaposleni = "";
    
    // Vracanje input polja na pocetne vrednosti
    this.naziv = ""; 
    this.adresa = ""; 
    this.naziviUsluga = [];
    this.ceneUsluga = []; 
    this.kontaktOsoba = "";
    this.godisnjiOdmorPocetak = null; 
    this.godisnjiOdmorKraj = null;
    this.zaposleni = [];
    this.nazivUsluge = "";
    this.cenaUsluge = 0;
    
    this.daLiJeModalOtvoren = true;
  }

  zatvoriModal() {
    this.daLiJeModalOtvoren = false;
  }

  dodajZaposlenog() {
    if (this.zaposleniEmail == "") {
      this.greskaZaposleni = Greska.PRAZAN_EMAIL_ZAPOSLENOG;
      return;
    }
    
    // Provera da li je email slobodan
    let emailSlobodan = false;
    this.dekorateri.forEach(dekorater => {
      if (dekorater.email == this.zaposleniEmail) {
        emailSlobodan = true;
      }
    });

    if (!emailSlobodan) {
      this.greskaZaposleni = Greska.DEKORATER_VEC_ZAPOSLEN_ILI_NE_POSTOJI;
      return;
    }

    this.greskaZaposleni = "";
    this.zaposleni.push(this.zaposleniEmail);
    this.zaposleniEmail = "";
    alert(Alert.ZAPOSLENI_USPESNO_DODAT);
  }

  dodajUslugu() {
    this.greskaNazivUsluge = "";
    this.greskaCenaUsluge = "";
    if (this.nazivUsluge == "") {
      this.greskaNazivUsluge = Greska.PRAZAN_NAZIV_USLUGE;
      return;
    }
    if (this.cenaUsluge == 0) {
      this.greskaCenaUsluge = Greska.PRAZNA_CENA_USLUGE;
      return;
    }
    this.naziviUsluga.push(this.nazivUsluge);
    this.ceneUsluga.push(this.cenaUsluge)
    this.nazivUsluge = "";
    this.cenaUsluge = 0;
    this.greskaNazivUsluge = "";
    this.greskaCenaUsluge = "";
    alert(Alert.USLUGA_USPESNO_DODATA);
  }

  dodajFirmu() {
    // Vracanje gresaka na pocetne vrednosti
    this.greskaNaziv = "";
    this.greskaAdresa = "";
    this.greskaNazivUsluge = "";
    this.greskaKontaktOsoba = "";
    this.greskaGodisnjiOdmorPocetak = "";
    this.greskaGodisnjiOdmorKraj = "";
    this.greskaZaposleni = "";
    
    // Provera da li su sva polja uneta
    if (this.naziv == "") {
      this.greskaNaziv = Greska.PRAZAN_NAZIV;
      return;
    }
    if (this.adresa == "") {
      this.greskaAdresa = Greska.PRAZNA_ADRESA;
      return;
    }
    if (this.naziviUsluga.length == 0) {
      this.greskaNazivUsluge = Greska.PRAZNE_USLUGE;
      return;
    }
    if (this.godisnjiOdmorPocetak == null || this.godisnjiOdmorKraj == null) {
      this.greskaGodisnjiOdmorKraj = Greska.PRAZAN_PERIOD_GODISNJEG_ODMORA;
      return;
    }
    if (this.kontaktOsoba == "") {
      this.greskaKontaktOsoba = Greska.PRAZNA_KONTAKT_OSOBA;
      return;
    }
    if (this.zaposleni.length < 2) {
      this.greskaZaposleni = Greska.NEDOVOLJNO_ZAPOSLENIH;
      return;
    }

    this.geografskaSirina = +this.adresa.split('/')[1];
    this.geografskaDuzina = +this.adresa.split('/')[2];
    this.adresa = this.adresa.split('/')[0];

    // Sacuvaj firmu u bazi
    this.servis.dodavanjeFirme(this.naziv, this.adresa, this.geografskaSirina, this.geografskaDuzina, this.naziviUsluga, this.ceneUsluga, this.kontaktOsoba, this.godisnjiOdmorPocetak, 
                              this.godisnjiOdmorKraj, this.zaposleni)
    .subscribe(data => {
      const ret = data as any;
      if (ret.poruka != PovratnePoruke.FIRMA_KREIRANA) {
        alert(Alert.GRESKA_PRILIKOM_KREIRANJA_FIRME);
      }
      else {
        alert(Alert.FIRMA_USPESNO_KREIRANA);
        this.dohvatiFirme();
        this.dohvatiSlobodneDekoratere();
      }
      this.zatvoriModal();
    });
  }
}
