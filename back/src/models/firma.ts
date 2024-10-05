import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Firma = new Schema({
    naziv: String,
    adresa: String,
    geografskaSirina: Number,
    geografskaDuzina: Number,
    naziviUsluga: [String],
    ceneUsluga: [Number],
    kontakt_osoba: String,
    godisnji_odmor_pocetak: Date,
    godisnji_odmor_kraj: Date,
    zaposleni: [String],
    ocena: Number,
    brojOcena: Number
}, { versionKey: false });

export default mongoose.model("firma", Firma, "firma");