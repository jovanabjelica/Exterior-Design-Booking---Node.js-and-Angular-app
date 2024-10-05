import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Firma } from '../models/firma';
import { FirmaService } from '../services/firma.service';
import { PovratnePoruke } from '../constants/Poruke';
import { Alert } from '../constants/Alert';
import { ZahtevService } from '../services/zahtev.service';
import { formatDate, Time } from '@angular/common';
import { Greska } from '../constants/Greske';
import { Zahtev } from '../models/zahtev';
import { TipBaste } from '../constants/Tipovi';
import { Figura } from '../models/figure';
import { StatusZahteva } from '../constants/Statusi';

@Component({
  selector: 'app-vlasnik-firma',
  templateUrl: './vlasnik-firma.component.html',
  styleUrls: ['./vlasnik-firma.component.css']
})
export class VlasnikFirmaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private servisFirma: FirmaService, private servisZahtev: ZahtevService, private router: Router) {  }

  // Promenljive
  korisnik: string = "";
  firma: Firma = new Firma();
  dekorater: string = "";
  zahtevi: Zahtev[] = [];
  komentari: string[] = [];
  ocene: number[] = [];
  figure: Figura[] = [];
  modal1Otvoren: boolean = false;
  modal2Otvoren: boolean = false;
  prikaziCanvas: boolean = false;

  // Input polja  
  datum: Date|null = null;
  vreme: Time|null = null;
  kvadratura: number = 0;
  tip: string = "";
  povrsinaZelenilo: number|null = null;
  napomene: string = "";
  
  // Input polja - privatna basta
  povrsinaBazen: number|null = null;
  povrsinaLezaljke: number|null = null;
  povrsinaStolovi: number|null = null;

  // Input polja - basta restorana
  povrsinaFontana: number|null = null;
  brojStolova: number|null = null;
  brojStolica: number|null = null;

  // Greske
  datumGreska: string = "";
  vremeGreska: string = "";
  kvadraturaGreska: string = "";
  tipGreska: string = "";
  povrsinaZeleniloGreska: string = "";
  povrsinaBazenGreska: string = "";
  povrsinaLezaljkeGreska: string = "";
  povrsinaStoloviGreska: string = "";
  povrsinaFontanaGreska: string = "";
  brojStolovaGreska: string = "";
  brojStolicaGreska: string = "";
  jsonFileGreska: string = "";
  
  dohvatanjeSvihZahteva() {
    this.komentari = [];
    this.ocene = []
    this.servisZahtev.dohvatanjeSvihZahteva()
    .subscribe(data => {
      const odgovor = data as any;
      if (odgovor.poruka != PovratnePoruke.ZAHTEVI_USPESNO_DOHVACENI) {
        alert("ERROR");
        this.router.navigate(['']);
        return;
      }
      this.zahtevi = odgovor.zahtevi as Zahtev[];

      for (let z of this.zahtevi) {
        for (let d of this.firma.zaposleni) {
          if (z.dekorater == d) {
            if (z.recenzijaDodata) { this.komentari.push(z.komentar); this.ocene.push(z.ocena)}
          }
        }
      }
    });
  }

  dohvatanjeFirme() {
    this.route.params.subscribe(data => {
      const params = data as any;
      this.korisnik = params.korisnik;
      
      this.servisFirma.dohvatanjeFirme(params.firma)
      .subscribe(data => {
        const odgovor = data as any;
        if (odgovor.poruka != PovratnePoruke.FIRMA_USPESNO_PRONADJENA) {
          alert(Alert.GRESKA_PRILIKOM_DOHVATANJA_FIRME);
          this.router.navigate(['']);
        }
        this.firma = odgovor.firma as Firma;
      
        this.dohvatanjeSvihZahteva();
      });
    });
  }

  ngOnInit() {
    this.dohvatanjeFirme();
  }

  zatvoriModal(): void {
    this.modal1Otvoren = false;
    this.modal2Otvoren = false;
  }

  // Funkcija za parsiranje JSON fajla i smeštanje u niz figures
  parseJsonToFigures(jsonString: string) {
    const parsiraniPodaci = JSON.parse(jsonString);
  
    parsiraniPodaci.forEach((elem: any) => {
      const figura = new Figura();
      figura.x = elem.x;
      figura.y = elem.y;
      figura.tip = elem.tip;
      this.figure.push(figura);
    });
  }

  // Funkcija koja crta figure na Canvasu
  nacrtajFigure() {
    const canvas = <HTMLCanvasElement>document.getElementById('bastaCanvas');
    const ctx = canvas.getContext('2d');

    // Čišćenje prethodnog crteža
    ctx?.clearRect(0, 0, canvas.width, canvas.height);

    this.figure.forEach(figure => {
      switch (figure.tip) {
        case 'zelenilo':
          ctx!.fillStyle = 'green';
          ctx!.fillRect(figure.x, figure.y, 50, 50); // Zeleni kvadrat
          break;
        case 'bazen':
          ctx!.fillStyle = 'blue';
          ctx!.fillRect(figure.x, figure.y, 100, 50); // Plavi pravougaonik
          break;
        case 'fontana':
          ctx!.beginPath();
          ctx!.arc(figure.x, figure.y, 50, 0, 2 * Math.PI); // Plavi krug
          ctx!.fillStyle = 'blue';
          ctx!.fill();
          ctx!.closePath();
          break;
        case 'sto':
          ctx!.beginPath();
          ctx!.arc(figure.x, figure.y, 25, 0, 2 * Math.PI); // Braon krug
          ctx!.fillStyle = 'brown';
          ctx!.fill();
          ctx!.closePath();
          break;
        case 'lezaljka-stolica':
          ctx!.fillStyle = 'gray';
          ctx!.fillRect(figure.x, figure.y, 50, 30); // Sivi pravougaonik
          break;
      }
    });
  }

  // Funkcija za učitavanje fajla
  loadFromFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];  // Dohvata prvi fajl iz inputa
    this.figure = [];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;
        this.parseJsonToFigures(fileContent);  // Poziv funkcije za parsiranje JSON-a
        this.nacrtajFigure();
      };
      reader.readAsText(file);  // Čitanje fajla kao tekst
      this.prikaziCanvas = true;
    }
  }

  ok() {
    this.prikaziCanvas = false;
  }

  prviKorak() {
    // Vracanje greski i inputa na defaultne vrednosti
    this.datum = null;
    this.vreme = null;
    this.kvadratura = 0;
    this.tip = "";
    this.povrsinaZelenilo = null;
    this.povrsinaBazen = null;
    this.povrsinaStolovi = null;
    this.povrsinaLezaljke = null;
    this.povrsinaFontana = null;
    this.brojStolica = null;
    this.brojStolova = null;
    this.figure = [];
    this.datumGreska = "";
    this.vremeGreska = "";
    this.kvadraturaGreska = "";
    this.tipGreska = "";
    this.povrsinaZeleniloGreska = "";
    this.povrsinaBazenGreska = "";
    this.povrsinaLezaljkeGreska = "";
    this.povrsinaStoloviGreska = "";
    this.povrsinaFontanaGreska = "";
    this.brojStolicaGreska = "";
    this.brojStolovaGreska = "";
    this.jsonFileGreska = "";
    
    // Otvaranje modala za prvi korak
    this.modal1Otvoren = true;
    this.modal2Otvoren = false;
  }

  drugiKorak() {
    // Resetovanje greski koje proverava prelazak u drugi korak
    this.datumGreska = "";
    this.vremeGreska = "";
    this.kvadraturaGreska = "";
    this.tipGreska = "";

    if (this.datum == null) {
      this.datumGreska = Greska.PRAZAN_DATUM;
      return;
    }
    if (this.vreme == null) {
      this.vremeGreska = Greska.PRAZNO_VREME;
      return;
    }
    if (this.kvadratura == 0) {
      this.kvadraturaGreska = Greska.PRAZNA_KVADRATURA;
      return;
    }
    if (this.tip == "") {
      this.tipGreska = Greska.PRAZAN_TIP;
      return;
    }

    // Provera da li je firma u tom periodu na godisnjem odmoru
    if (this.firma.godisnji_odmor_pocetak && 
        this.firma.godisnji_odmor_kraj && 
        this.firma.godisnji_odmor_pocetak <= this.datum &&
        this.firma.godisnji_odmor_kraj >= this.datum
      ) 
    {
      this.datumGreska = Greska.FIRMA_NA_GODISNJEM;
      return;
    }

    // Provera da li u tom periodu ima slobodnih dekoratera
    for (let zaposlen of this.firma.zaposleni) {
      // Dohvati sve zahteve vezane za trenutnog dekoratera
      let zauzet:Zahtev[] = this.zahtevi.filter((a) => a.dekorater === zaposlen);
      
      // Proveri da li je trenutni dekorater slobodan
      let slobodan: boolean = true;
      for (let zahtev of zauzet) {
        if (zahtev.status != StatusZahteva.ODBIJEN && zahtev.status != StatusZahteva.OTKAZAN && 
            zahtev.datum && zahtev.datum.toString().split('T')[0] == this.datum.toString()) 
        {
          slobodan = false;
          break;
        } 
      }

      // Ako je slobodan sacuvaj
      if (slobodan) {
        this.dekorater = zaposlen;
        break;
      }
    }
  
    if (this.dekorater == "") {
      this.datumGreska = Greska.SVI_DEKORATERI_ZAUZETI;
      return;
    }

    this.modal1Otvoren = false;
    this.modal2Otvoren = true;
  }

  zakazi() {
    // Resetovanje greski koje proveravaju input polja potrebna za zakazivanje
    this.povrsinaZeleniloGreska = "";
    this.povrsinaBazenGreska = "";
    this.povrsinaLezaljkeGreska = "";
    this.povrsinaStoloviGreska = "";
    this.povrsinaFontanaGreska = "";
    this.brojStolicaGreska = "";
    this.brojStolovaGreska = "";
    this.jsonFileGreska = "";

    if (this.povrsinaZelenilo == null) {
      this.povrsinaZeleniloGreska = Greska.PRAZNA_POVRSINA_ZELENILA;
      return;
    }

    // Provera da li su uneta obavezna polja
    if (this.tip == TipBaste.PRIVATNA) {
      if (this.povrsinaBazen == null) {
        this.povrsinaBazenGreska = Greska.PRAZNA_POVRSINA_BAZENA;
        return;
      }
      if (this.povrsinaLezaljke == null) {
        this.povrsinaLezaljkeGreska = Greska.PRAZNA_POVRSINA_LEZALJKI;
        return;
      }
      if (this.povrsinaStolovi == null) {
        this.povrsinaStoloviGreska = Greska.PRAZNA_POVRSINA_STOLOVA;
        return;
      }
    }
    else {
      if (this.povrsinaFontana == null) {
        this.povrsinaFontanaGreska = Greska.PRAZNA_POVRSINA_FONTANE;
        return;
      }
      if (this.brojStolova == null) {
        this.brojStolovaGreska = Greska.PRAZAN_BROJ_STOLOVA;
        return;
      }
      if (this.brojStolica == null) {
        this.brojStolicaGreska = Greska.PRAZAN_BROJ_STOLICA;
        return;
      }
    }

    // Provera da li je prilozen json file
    if (this.figure.length == 0) {
      this.jsonFileGreska = Greska.PRAZAN_JSON_FILE;
      return;
    }

    this.servisZahtev.kreiranjeZahteva(this.kvadratura, this.datum, String(this.vreme), this.tip, this.povrsinaZelenilo, this.napomene, 
                                       this.dekorater, this.korisnik, this.povrsinaBazen, this.povrsinaLezaljke, this.povrsinaStolovi,
                                       this.povrsinaFontana, this.brojStolica, this.brojStolova, this.figure, this.firma.naziv, new Date())
    .subscribe(data => {
      this.dekorater = "";
      const odgovor = data as any;
      if (odgovor.poruka != PovratnePoruke.ZAHTEV_USPESNO_KREIRAN) {
        alert(Alert.GRESKA_PRILIKOM_KREIRANJA_ZAHTEVA);
        this.modal2Otvoren = false; 
      }
      else {
        alert(Alert.ZAHTEV_USPESNO_KREIRAN);
        this.modal2Otvoren = false;
        this.dohvatanjeSvihZahteva();
      }
    });
  }
}

