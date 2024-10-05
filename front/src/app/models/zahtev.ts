import { Figura } from "./figure";

export class Zahtev {
    datum: Date|null = null;
    vreme: string = "";
    kvadratura: number = 0;
    tip: string = "";
	povrsinaBazen: number = 0;
	povrsinaZelenilo: number = 0;
	povrsinaLezaljke: number = 0;
	povrsinaStolovi: number = 0;
	povrsinaFontana: number = 0;
	brojStolova: number = 0;
	brojStolica: number = 0;
	dodatniZahtevi: string = "";
	dekorater: string = "";
	korisnik: string = "";
	firma: string = "";
	canvas: string = "";
	status: string = "";
	figure: Figura[] = [];
	datumKreiranja: Date|null = null;
	komentar: string = "";
	ocena: number = 0;
	recenzijaDodata: boolean = false;
	zavrsniDatum: Date|null = null;
	razlog: string = "";
}