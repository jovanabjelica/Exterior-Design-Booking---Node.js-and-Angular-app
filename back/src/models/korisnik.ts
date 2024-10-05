import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Korisnik = new Schema({
    korisnickoIme: String,
    lozinka: String,
    ime: String,
    prezime: String,
    pol: String,
    adresa: String,
    kontaktTelefon: String,
    email: String,
    profilnaSlika: String,
    brojKreditneKartice: String,
    status: String,
    tip: String
}, { versionKey: false });

export default mongoose.model("korisnik", Korisnik, "korisnik");