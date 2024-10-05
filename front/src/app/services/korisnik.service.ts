import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  url: string = "http://localhost:4000/korisnik";

  korisnickoImeJedinstveno(korisnickoIme: string) {
    const data = new FormData()
    data.append("korisnickoIme", korisnickoIme);

    return this.http.post(`${this.url}/korisnicko-ime-jedinstveno`, data);
  }

  emailJedinstven(email: string) {
    const data = new FormData();
    data.append("email", email);

    return this.http.post(`${this.url}/email-jedinstven`, data);
  }

  registracija(ime: string, prezime: string, korisnickoIme: string, lozinka: string, email: string, 
               telefon: string, pol: string, adresa: string, kreditnaKartica: string, slika: File | null) 
  {
    const data = new FormData();
    data.append("korisnickoIme", korisnickoIme);
    data.append("lozinka", lozinka);
    data.append("ime", ime);
    data.append("prezime", prezime);
    data.append("pol", pol);
    data.append("adresa", adresa);
    data.append("kontaktTelefon", telefon);
    data.append("email", email);
    data.append("brojKreditneKartice", kreditnaKartica);
    
    if (slika != null)
      data.append("file", slika);

    return this.http.post(`${this.url}/registracija-zahtev`, data);
  }

  prijava(korisnickoIme: string, lozinka: string) {
    const data = new FormData();
    data.append("korisnickoIme", korisnickoIme);
    data.append("lozinka", lozinka);    
    
    return this.http.post(`${this.url}/prijava`, data);
  }

  promenaLozinke(korisnickoIme: string, staraLozinka: string, novaLozinka: string) {
    const data = new FormData();
    data.append("korisnickoIme", korisnickoIme);
    data.append("staraLozinka", staraLozinka);    
    data.append("novaLozinka", novaLozinka);

    return this.http.post(`${this.url}/promena-lozinke`, data);
  }

  azuriranjeKorisnika(staroKorisnickoIme: string, novoKorisnickoIme: string, novoIme: string, novoPrezime: string, 
                      noviEmail: string, novaAdresa: string, noviKontaktTelefon: string, noviBrojKreditneKartice: string, novaProfilnaSlika: File|null)
  {
    const data = new FormData();
    data.append("staroKorisnickoIme", staroKorisnickoIme);
    data.append("korisnickoIme", novoKorisnickoIme);
    data.append("novoKorisnickoIme", novoKorisnickoIme);
    data.append("novoIme", novoIme);
    data.append("novoPrezime", novoPrezime);
    data.append("novaAdresa", novaAdresa);
    data.append("noviKontaktTelefon", noviKontaktTelefon);
    data.append("noviEmail", noviEmail);
    data.append("noviBrojKreditneKartice", noviBrojKreditneKartice);

    if (novaProfilnaSlika != null)
      data.append("file", novaProfilnaSlika);

    return this.http.post(`${this.url}/azuriranje-korisnika`, data);
  }

  dohvatiZahteve() {
    return this.http.get(`${this.url}/dohvati-zahteve`);
  }

  dohvatiVlasnike() {
    return this.http.get(`${this.url}/dohvati-vlasnike`);
  }

  dohvatiDekoratere() {
    return this.http.get(`${this.url}/dohvati-dekoratere`);
  }

  dohvatiDeaktivirane() {
    return this.http.get(`${this.url}/dohvati-deaktivirane`);
  }

  prihvatanjeZahteva(korisnickoIme: string) {
    const data = new FormData();
    data.append("korisnickoIme", korisnickoIme);
     
    return this.http.post(`${this.url}/prihvatanje-zahteva`, data); 
  }

  odbijanjeZahteva(korisnickoIme: string) {
    const data = new FormData();
    data.append("korisnickoIme", korisnickoIme);
     
    return this.http.post(`${this.url}/odbijanje-zahteva`, data); 
  }

  deaktiviranjeKorisnika(korisnickoIme: string) {
    const data = new FormData();
    data.append("korisnickoIme", korisnickoIme);
     
    return this.http.post(`${this.url}/deaktiviranje-korisnika`, data); 
  }

  dodavanjeDekoratera(korisnickoIme: string, lozinka: string, email: string, ime: string, prezime: string, 
                      pol: string, kontaktTelefon: string, brojKreditneKartice: string) 
  {
    const data = new FormData();
    data.append("korisnickoIme", korisnickoIme);
    data.append("lozinka", lozinka);
    data.append("ime", ime);
    data.append("prezime", prezime);
    data.append("email", email);
    data.append("pol", pol);
    data.append("kontaktTelefon", kontaktTelefon);
    data.append("brojKreditneKartice", brojKreditneKartice);
     
    return this.http.post(`${this.url}/registrovanje-dekoratera`, data); 
  }

  pronadjiKorisnika(korisnickoIme: string) {
    const data = new FormData();
    data.append("korisnickoIme", korisnickoIme);
     
    return this.http.post(`${this.url}/pronadji-korisnika`, data); 
  }
}
