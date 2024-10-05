import * as express from 'express'

import zahtev from '../models/zahtev'
import firma from '../models/firma';

import { TipBaste, TipPoruke } from '../constants/Tipovi'
import { PovratnePoruke } from '../constants/Poruke';
import { StatusZahteva } from '../constants/Statusi';

export class ZahtevController {
    kreiranjeZahteva = (req: express.Request, res: express.Response) => {
        console.log(`${TipPoruke.INFO} -> Zapoceto kreiranje zahteva`);

        // Dohvatanje podataka
        let datum = req.body.datum;
        let vreme = req.body.vreme;
        let kvadratura = req.body.kvadratura;
        let tip = req.body.tip;
        let povrsinaBazen = req.body.povrsinaBazen;
        let povrsinaZelenilo = req.body.povrsinaZelenilo;
        let povrsinaLezaljke = req.body.povrsinaLezaljke;
        let povrsinaStolovi = req.body.povrsinaStolovi;
        let povrsinaFontana = req.body.povrsinaFontana;
        let brojStolova = req.body.brojStolova;
        let brojStolica = req.body.brojStolica;
        let dodatniZahtevi = req.body.dodatniZahtevi;
        let dekorater = req.body.dekorater;
        let firma = req.body.firma;
        let korisnik = req.body.korisnik;
        let figure = JSON.parse(req.body.figure);
        let datumKreiranja = JSON.parse(req.body.datumKreiranja);

        // Kreiranje novog zahteva u zavisnosti od tipa
        let noviZahtev = new zahtev();
        
        noviZahtev.kvadratura = JSON.parse(kvadratura);
        noviZahtev.datum = JSON.parse(datum);
        noviZahtev.vreme = JSON.parse(vreme);
        noviZahtev.tip = tip;
        noviZahtev.povrsinaZelenilo = JSON.parse(povrsinaZelenilo);
        noviZahtev.dodatniZahtevi = dodatniZahtevi;
        noviZahtev.dekorater = dekorater;
        noviZahtev.korisnik = korisnik;
        noviZahtev.status = StatusZahteva.NA_CEKANJU;
        noviZahtev.figure = figure;
        noviZahtev.firma = firma;
        noviZahtev.datumKreiranja = datumKreiranja;

        if (tip == TipBaste.PRIVATNA) {
            noviZahtev.povrsinaBazen = JSON.parse(povrsinaBazen);
            noviZahtev.povrsinaLezaljke = JSON.parse(povrsinaLezaljke);
            noviZahtev.povrsinaStolovi = JSON.parse(povrsinaStolovi);
        }
        else {
            noviZahtev.povrsinaFontana = JSON.parse(povrsinaFontana);
            noviZahtev.brojStolica = JSON.parse(brojStolica);
            noviZahtev.brojStolova = JSON.parse(brojStolova);
        }

        // Cuvanje zahteva
        noviZahtev.save()
        .then(data=>{
            console.log(`${TipPoruke.INFO} -> zahtev uspesno kreiran`);
            return res.json({ poruka : PovratnePoruke.ZAHTEV_USPESNO_KREIRAN });
        })
        .catch(error=>{
            console.log(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_CUVANJA_PODATAKA });
        });
    } 

    dohvatanjeSvihZahteva = (req: express.Request, res: express.Response) => {
        console.log(`${TipPoruke.INFO} -> zapoceto dohvatanje svih zahteva`);
        zahtev.find()
        .then(zahtevi=>{
            console.log(`${TipPoruke.INFO} -> zahtevi uspesno dohvaceni`);
            return res.json({ poruka : PovratnePoruke.ZAHTEVI_USPESNO_DOHVACENI, zahtevi : zahtevi });
        })
        .catch(error=>{
            console.log(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_DOHVATANJA_PODATAKA });
        })
    }

    otkaziZahtev = (req: express.Request, res: express.Response) => {
        console.log(`${TipPoruke.INFO} -> zapoceto otkazivanje zahteva`);
        
        // Dohvatanje podataka
        let korisnik = req.body.korisnik;
        let dekorater = req.body.dekorater;
        let datum = JSON.parse(req.body.datum);

        // Azuriranje zahteva
        zahtev.findOneAndUpdate({ korisnik : korisnik, dekorater : dekorater, datum : datum }, 
                                { status : StatusZahteva.OTKAZAN })
        .then(data=>{
            console.log(`${TipPoruke.INFO} -> zahtev uspesno azuriran`);
            return res.json({ poruka : PovratnePoruke.ZAHTEV_USPESNO_AZURIRAN });
        })
        .catch(error=>{
            console.log(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_AZURIRANJA_PODATAKA });
        });
    }

    dodavanjeKomentara = (req: express.Request, res: express.Response) => {
        console.log(`${TipPoruke.INFO} -> zapoceto dodavanje komentara`);

        // Dohvatanje podataka
        let korisnik = req.body.korisnik;
        let dekorater = req.body.dekorater;
        let datum = JSON.parse(req.body.datum);
        let komentar = req.body.komentar;
        let ocena = JSON.parse(req.body.ocena);
        
        console.log(ocena);

        // Azuriranje zahteva
        zahtev.findOneAndUpdate({ korisnik : korisnik, dekorater : dekorater, datum : datum }, 
                                { komentar : komentar, ocena : ocena, recenzijaDodata : true })
        .then(data=>{
            console.log(`${TipPoruke.INFO} -> zahtev uspesno azuriran`);
            return res.json({ poruka : PovratnePoruke.ZAHTEV_USPESNO_AZURIRAN });
        })
        .catch(error=>{
            console.log(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_AZURIRANJA_PODATAKA });
        });
    }

    pronadjiFirmuSaZadatimDekoraterom = (req: express.Request, res: express.Response) => {
        console.log(`${TipPoruke.INFO} -> zapocet pronalazak firme sa zadatim dekoraterom`);

        // Dohvatanje podataka
        let dekorater = req.body.dekorater;

        console.log(dekorater);

        firma.findOne({ zaposleni: { $elemMatch: { $eq: dekorater } } })
        .then(data => {
            console.log(`${TipPoruke.INFO} -> firma uspesno pronadjena`);
            return res.json({ poruka : PovratnePoruke.FIRMA_USPESNO_PRONADJENA, firma : data });
        })
        .catch(error => {
            console.log(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_DOHVATANJA_PODATAKA });
        });
    }

    dodavanjeOcene = (req: express.Request, res: express.Response) => {
        console.log(`${TipPoruke.INFO} -> zapoceto dodavanje ocene`);

        // Dohvatanje podataka
        let dekorater = req.body.dekorater;
        let ocena = JSON.parse(req.body.ocena);
        let brojOcena = JSON.parse(req.body.brojOcena);
        
        firma.findOneAndUpdate({ zaposleni: { $elemMatch: { $eq: dekorater } } }, { ocena : ocena, brojOcena : brojOcena })
        .then(data=>{
            console.log(`${TipPoruke.INFO} -> firma uspesno azurirana`);
            return res.json({ poruka : PovratnePoruke.FIRMA_USPESNO_AZURIRANA });
        })
        .catch(error=>{
            console.log(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_AZURIRANJA_PODATAKA });
        });        
    }

    dohvatanjeKomentaraFirme = (req: express.Request, res: express.Response) => {
        console.log(`${TipPoruke.INFO} -> zapoceto dohvatanje komentara`);
        
        // Dohvatanje podataka
        let dekorater = req.body.dekorater;
        zahtev.find({ dekorater : dekorater })
        .then(data => {
            return res.json({ zahtevi : data });
        })
        .catch(data => {

        });
    }

    zavrsenoUredivanje = (req: express.Request, res: express.Response) => {
        // Dohvatanje podataka
        let korisnik = req.body.korisnik;
        let dekorater = req.body.dekorater;
        let datum = JSON.parse(req.body.datum);
        let zavrsniDatum = JSON.parse(req.body.zavrsniDatum);

        // Azuriraj zahtev
        zahtev.findOneAndUpdate({ korisnik : korisnik, dekorater : dekorater, datum : datum }, { zavrsniDatum : zavrsniDatum })
        .then(data => {

        })
        .catch(error => {

        });
    }

    zakazivanjeOdrzavanja = (req: express.Request, res: express.Response) => {
        // Dohvatanje podataka
        let korisnik = req.body.korisnik;
        let dekorater = req.body.dekorater;
        let datum = JSON.parse(req.body.datum);
        
        zahtev.findOneAndUpdate({ korisnik : korisnik, dekorater : dekorater, datum : datum }, { status : StatusZahteva.ODRZAVANJE, zavrsniDatum : null })
        .then(data=>{

        })
        .catch(error=>{

        });
    }

    prihvatiOdrzavanje = (req: express.Request, res: express.Response) => {
        // Dohvatanje podataka
        let korisnik = req.body.korisnik;
        let dekorater = req.body.dekorater;
        let datum = JSON.parse(req.body.datum);
        let krajOdrzavanjaDatum = JSON.parse(req.body.krajOdrzavanjaDatum);

        zahtev.findOneAndUpdate({ korisnik : korisnik, dekorater : dekorater, datum : datum }, { zavrsniDatum : krajOdrzavanjaDatum })
        .then(data=>{

        })
        .catch(error=>{

        });
    } 

    odbijOdrzavanje = (req: express.Request, res: express.Response) => {
        // Dohvatanje podataka
        let korisnik = req.body.korisnik;
        let dekorater = req.body.dekorater;
        let datum = JSON.parse(req.body.datum);
        let krajOdrzavanjaDatum = JSON.parse(req.body.krajOdrzavanjaDatum);

        zahtev.findOneAndUpdate({ korisnik : korisnik, dekorater : dekorater, datum : datum }, { status : StatusZahteva.ODBIJEN, zavrsniDatum : null })
        .then(data=>{

        })
        .catch(error=>{

        });
    } 

    prihvatiZahtev = (req: express.Request, res: express.Response) => {
        // Dohvatanje podataka
        let korisnik = req.body.korisnik;
        let dekorater = req.body.dekorater;
        let datum = JSON.parse(req.body.datum);

        zahtev.findOneAndUpdate({ korisnik : korisnik, dekorater : dekorater, datum : datum }, { status : StatusZahteva.ODOBREN })
        .then(data=>{

        })
        .catch(error=>{

        });
    }

    odbijZahtev = (req: express.Request, res: express.Response) => {
        // Dohvatanje podataka
        let korisnik = req.body.korisnik;
        let dekorater = req.body.dekorater;
        let datum = JSON.parse(req.body.datum);
        let razlog = req.body.razlog;

        zahtev.findOneAndUpdate({ korisnik : korisnik, dekorater : dekorater, datum : datum }, { status : StatusZahteva.ODBIJEN, razlogOdbijanja : razlog })
        .then(data=>{

        })
        .catch(error=>{

        });
    }
}
