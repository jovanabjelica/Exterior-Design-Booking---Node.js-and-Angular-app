import { Component, OnInit } from '@angular/core';
import { Zahtev } from '../models/zahtev';
import { ActivatedRoute, Router } from '@angular/router';
import { ZahtevService } from '../services/zahtev.service';
import { PovratnePoruke } from '../constants/Poruke';
import { StatusZahteva } from '../constants/Statusi';
import { Firma } from '../models/firma';
import { Alert } from '../constants/Alert';
import { Greska } from '../constants/Greske';

@Component({
  selector: 'app-vlasnik-zakazivanje',
  templateUrl: './vlasnik-zakazivanje.component.html',
  styleUrls: ['./vlasnik-zakazivanje.component.css']
})
export class VlasnikZakazivanjeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private servis: ZahtevService) {  }

  // Polja klase
  zakazaniZahtevi: Zahtev[] = [];
  arhiviraniZahtevi: Zahtev[] = [];
  korisnik: string = "";
  firma: Firma = new Firma();

  // Input polja
  komentar: string = "";
  ocena: number|null = null;
  zvezdice: number[] = [1, 2, 3, 4, 5];

  // Greske
  greskaKomentar: string = "";
  greskaOcena: string = "";

  modalOtvoren: boolean = false;
  odabranZahtev: Zahtev = new Zahtev();

  dohvZahteve() {
    this.servis.dohvatanjeSvihZahteva()
    .subscribe(data => {
      const odgovor = data as any;
      if (odgovor.poruka != PovratnePoruke.ZAHTEVI_USPESNO_DOHVACENI) {
        alert("Error");
        this.router.navigate(['']);
        return;
      }

      const zahtevi = odgovor.zahtevi as Zahtev[];
      this.zakazaniZahtevi = zahtevi.filter((zahtev) => zahtev.korisnik == this.korisnik && 
                                                        (zahtev.status == StatusZahteva.NA_CEKANJU ||
                                                        (zahtev.status == StatusZahteva.ODOBREN &&
                                                         zahtev.datum && zahtev.datum > new Date())));
      this.arhiviraniZahtevi = zahtevi.filter((zahtev) => zahtev.korisnik == this.korisnik);
      this.arhiviraniZahtevi.sort((a, b) => { 
        if (a.datum && b.datum)
          return a.datum > b.datum ? 1 : -1;
        return 0;
      });
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(data =>{
      const params = data as any;
      this.korisnik = params.korisnik;
      this.dohvZahteve();
    });
  }

  danas(): string {
    let danas = new Date();
    let nulaMesec = false;
    let nulaDan = false;

    if (danas.getDay() < 10) {
      nulaDan = true;
    }
    if (danas.getMonth() < 10) {
      nulaMesec = true;
    }
    let ret = `${danas.getFullYear()}-`
    if (nulaMesec) {
      ret += `0`
    }
    ret += `${danas.getMonth()}-`;
    if (nulaDan) {
      ret += `0`;
    }
    ret += `${danas.getDay()}`
    return ret;
  }

  otkazivanjeZahteva(zahtev: Zahtev) {
    this.servis.otkazivanjeZahteva(zahtev.korisnik, zahtev.dekorater, zahtev.datum)
    .subscribe(data => {
      const odgovor = data as any;
      if (odgovor.poruka != PovratnePoruke.ZAHTEV_USPESNO_AZURIRAN) {
        alert(Alert.GRESKA_PRILIKOM_AZURIRANJA_PODATAKA);
        return;
      }
      alert(Alert.ZAHTEV_USPESNO_AZURIRAN);
      this.dohvZahteve();
    });
  }

  dodajKomentar(korisnik: string, dekorater: string, datum: Date) {
    if (!this.ocena) return;
    this.servis.dodavanjeKomentara(korisnik, dekorater, datum, this.komentar, this.ocena)
    .subscribe(data => {
      const odgovor = data as any;
      if (odgovor.poruka != PovratnePoruke.ZAHTEV_USPESNO_AZURIRAN) {
        return;
      }
      this.dohvZahteve();
    });
  } 

  azurirajOcenu(ocena: number) {
    this.ocena = ocena;
  }

  azurirajFirmu(dekorater: string, ocena: number, brojOcena: number) {
    this.servis.dodavanjeOcene(dekorater, ocena, brojOcena)
    .subscribe(data => {
      const odgovor = data as any;
      if (odgovor.poruka != PovratnePoruke.FIRMA_USPESNO_AZURIRANA) {
        return;
      }
    });
  }

  dodajOcenu(dekorater: string) {
    this.servis.pronalazakFirmeSaZadatimDekoraterom(dekorater)
    .subscribe(data1 => {
      const odgovor1 = data1 as any;
      if (odgovor1.poruka != PovratnePoruke.FIRMA_USPESNO_PRONADJENA) {
        return;
      }
      if (!this.ocena) return;
      this.firma = odgovor1.firma;
      let brojOcena = this.firma.brojOcena + 1;
      let srednjaOcena = (this.firma.ocena + this.ocena) / brojOcena;
      this.azurirajFirmu(dekorater, srednjaOcena, brojOcena);
    });
  }

  otvoriModal(zahtev: Zahtev) {
    this.komentar = "";
    this.ocena = null;
    this.greskaKomentar = "";
    this.greskaOcena = "";
    this.modalOtvoren = true;
    this.odabranZahtev = zahtev;
  }

  zatvoriModal() {
    this.modalOtvoren = false;
  }

  dodavanjeRecenzije() {
    this.greskaKomentar = "";
    this.greskaOcena = "";
    
    if (this.komentar == "") {
      this.greskaKomentar = Greska.PRAZAN_KOMENTAR;
      return;
    }
    if (this.ocena == null) {
      this.greskaOcena = Greska.PRAZNA_OCENA;
      return;
    }
    if (!this.odabranZahtev.datum) return;
    this.dodajKomentar(this.odabranZahtev.korisnik, this.odabranZahtev.dekorater, this.odabranZahtev.datum);
    this.dodajOcenu(this.odabranZahtev.dekorater);
    this.modalOtvoren = false;
  }
}

