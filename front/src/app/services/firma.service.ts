import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirmaService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:4000/firma";

  dodavanjeFirme(naziv: string, adresa: string, geografskaSirina: number, geografskaDuzina: number, naziviUsluga: string[], ceneUsluga: number[], kontakt_osoba: string,
                godisnji_odmor_pocetak: Date, godisnji_odmor_kraj: Date,
                zaposleni: string[]) {
    const data = new FormData();
    data.append("naziv", naziv);
    data.append("adresa", adresa);
    data.append("geografskaSirina", JSON.stringify(geografskaSirina));
    data.append("geografskaDuzina", JSON.stringify(geografskaDuzina));
    data.append("naziviUsluga", JSON.stringify(naziviUsluga));
    data.append("ceneUsluga", JSON.stringify(ceneUsluga));
    data.append("kontakt_osoba", kontakt_osoba);
    data.append("godisnji_odmor_pocetak", JSON.stringify(godisnji_odmor_pocetak));
    data.append("godisnji_odmor_kraj", JSON.stringify(godisnji_odmor_kraj));
    data.append("zaposleni", JSON.stringify(zaposleni));

    return this.http.post(`${this.url}/dodavanje-firme`, data);
  }

  dohvatanjeFirme(naziv: string) {
    const data = new FormData();
    data.append("naziv", naziv);
    
    return this.http.post(`${this.url}/dohvatanje-firme`, data);
  }
 
  dohvatanjeFirmi() {
    return this.http.get(`${this.url}/dohvatanje-firmi`);
  }

  dohvatanjeSlobodnihDekoratera() {
    return this.http.get(`${this.url}/dohvatanje-slobodnih-dekoratera`);
  }
}

