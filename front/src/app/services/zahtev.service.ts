import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipBaste } from '../constants/Tipovi';
import { Figura } from '../models/figure';

@Injectable({
  providedIn: 'root'
})
export class ZahtevService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:4000/zahtev";

  kreiranjeZahteva(kvadratura: number, datum: Date|null, vreme: String|null, tip: string, povrsinaZelenilo: number, dodatniZahtevi: string,
                   dekorater: string, korisnik: string, povrsinaBazen: number|null, povrsinaLezaljke: number|null, povrsinaStolovi: number|null,
                   povrsinaFontana: number|null, brojStolica: number|null, brojStolova: number|null, figure: Figura[], firma: string, datumKreiranja: Date) 
  {
    const data = new FormData();
    data.append("kvadratura", JSON.stringify(kvadratura));
    data.append("datum", JSON.stringify(datum));
    data.append("vreme", JSON.stringify(vreme));
    data.append("tip", tip);
    data.append("povrsinaZelenilo", JSON.stringify(povrsinaZelenilo));
    data.append("dodatniZahtevi", dodatniZahtevi);
    data.append("dekorater", dekorater);
    data.append("korisnik", korisnik);
    data.append("figure", JSON.stringify(figure));
    data.append("firma", firma);
    data.append("datumKreiranja", JSON.stringify(datumKreiranja));

    if (tip == TipBaste.PRIVATNA) {
      data.append("povrsinaBazen", JSON.stringify(povrsinaBazen));
      data.append("povrsinaLezaljke", JSON.stringify(povrsinaLezaljke));
      data.append("povrsinaStolovi", JSON.stringify(povrsinaStolovi));
    }
    else {
      data.append("povrsinaFontana", JSON.stringify(povrsinaFontana));
      data.append("brojStolica", JSON.stringify(brojStolica));
      data.append("brojStolova", JSON.stringify(brojStolova));
    }

    return this.http.post(`${this.url}/kreiranje-zahteva`, data);
  }

  dohvatanjeSvihZahteva() {
    return this.http.get(`${this.url}/dohvatanje-svih-zahteva`);
  }

  otkazivanjeZahteva(korisnik: string, dekorater: string, datum: Date|null) {
    const data = new FormData();
    data.append("korisnik", korisnik);
    data.append("dekorater", dekorater);
    data.append("datum", JSON.stringify(datum));

    return this.http.post(`${this.url}/otkazivanje-zahteva`, data);
  }

  dodavanjeKomentara(korisnik: string, dekorater: string, datum: Date|null, komentar: string, ocena: number) {
    const data = new FormData();
    data.append("korisnik", korisnik);
    data.append("dekorater", dekorater);
    data.append("datum", JSON.stringify(datum));
    data.append("komentar", komentar);
    data.append("ocena", JSON.stringify(ocena));

    return this.http.post(`${this.url}/dodavanje-komentara`, data);
  }

  dodavanjeOcene(dekorater: string, ocena: number, brojOcena: number) {
    const data = new FormData();
    data.append("dekorater", dekorater);
    data.append("ocena", JSON.stringify(ocena));
    data.append("brojOcena", JSON.stringify(brojOcena))
  
    return this.http.post(`${this.url}/dodavanje-ocene`, data);
  }

  pronalazakFirmeSaZadatimDekoraterom(dekorater: string) {
    const data = new FormData();
    data.append("dekorater", dekorater);
    
    return this.http.post(`${this.url}/pronadji-firmu-sa-zadatim-dekoraterom`, data);
  }

  dohvatanjeKomentara(dekorater: string) {
    const data = new FormData();
    data.append("dekorater", dekorater);

    return this.http.post(`${this.url}/dohvatanje-komentara`, data);
  }

  krajRada(korisnik: string, dekorater: string, datum: Date|null, zavrsniDatum: Date|null) {
    const data = new FormData();
    data.append("korisnik", korisnik);
    data.append("dekorater", dekorater);
    data.append("datum", JSON.stringify(datum));
    data.append("zavrsniDatum", JSON.stringify(zavrsniDatum));

    return this.http.post(`${this.url}/zavrseno-uredjivanje`, data);
  }

  zakazivanjeOdrzavanje(korisnik: string, dekorater: string, datum: Date|null) {
    const data = new FormData();
    data.append("korisnik", korisnik);
    data.append("dekorater", dekorater);
    data.append("datum", JSON.stringify(datum));
    
    return this.http.post(`${this.url}/zakazivanje-odrzavanja`, data);
  }

  odbijOdrzavanje(korisnik: string, dekorater: string, datum: Date|null) {
    const data = new FormData();
    data.append("korisnik", korisnik);
    data.append("dekorater", dekorater);
    data.append("datum", JSON.stringify(datum));

    return this.http.post(`${this.url}/odbij-odrzavanje`, data);
  }

  prihvatiOdrzavanje(korisnik: string, dekorater: string, datum: Date|null) {
    const data = new FormData();
    data.append("korisnik", korisnik);
    data.append("dekorater", dekorater);
    data.append("datum", JSON.stringify(datum));
    data.append("krajOdrzavanjaDatum", JSON.stringify(new Date()));
    
    return this.http.post(`${this.url}/prihvati-odrzavanje`, data);
  }

  prihvatiZahtev(korisnik: string, dekorater: string, datum: Date|null) {
    const data = new FormData();
    data.append("korisnik", korisnik);
    data.append("dekorater", dekorater);
    data.append("datum", JSON.stringify(datum));
    
    return this.http.post(`${this.url}/prihvati-zahtev`, data);
  }

  odbijZahtev(korisnik: string, dekorater: string, datum: Date|null, razlog: string) {
    const data = new FormData();
    data.append("korisnik", korisnik);
    data.append("dekorater", dekorater);
    data.append("datum", JSON.stringify(datum));
    data.append("razlog", razlog);

    return this.http.post(`${this.url}/odbij-zahtev`, data);
  }
}
