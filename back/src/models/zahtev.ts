import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Zahtev = new Schema({
    datum: Date,
    vreme: String,
    kvadratura: Number,
    tip: String,
	povrsinaBazen: Number,
	povrsinaZelenilo: Number,
	povrsinaLezaljke: Number,
	povrsinaStolovi: Number,
	povrsinaFontana: Number,
	brojStolova: Number,
	brojStolica: Number,
	dodatniZahtevi: String,
	dekorater: String,
	korisnik: String,
	firma: String,
	canvas: String,
	status: String,
	figure: [{
		x: Number,
		y: Number,
		tip: String
	}],
	datumKreiranja: Date,
	komentar: String,
	ocena: Number,
	recenzijaDodata: Boolean,
	zavrsniDatum: Date,
	razlogOdbijanja: String
}, { versionKey: false });

export default mongoose.model("zahtev", Zahtev, "zahtev");