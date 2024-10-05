export class Firma {
    naziv: string = "";
    adresa: string = "";
    geografskaSirina: number = 0;
    geografskaDuzina: number = 0;
    naziviUsluga: string[] = [];
    ceneUsluga: number[] = [];
    kontakt_osoba: string = ""; 
    godisnji_odmor_pocetak: Date|null = null;
    godisnji_odmor_kraj: Date|null = null;
    zaposleni: string[] = [];
    ocena: number = 0;
    brojOcena: number = 0;
};