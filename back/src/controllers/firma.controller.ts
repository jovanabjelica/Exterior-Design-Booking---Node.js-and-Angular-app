import * as express from 'express'
import firma from '../models/firma';
import { TipKorisnika, TipPoruke } from '../constants/Tipovi';
import { PovratnePoruke } from '../constants/Poruke';
import korisnik from '../models/korisnik';

export class FirmaController {
    
    dodavanjeFirme = (req:express.Request, res:express.Response) => {
        console.info(`${TipPoruke.INFO} -> zapoceto kreiranje firme`);

        // Dohvatanje podataka
        let naziv = req.body.naziv;
        let adresa = req.body.adresa;
        let geografskaSirina = JSON.parse(req.body.geografskaSirina);
        let geografskaDuzina = JSON.parse(req.body.geografskaDuzina);
        let naziviUsluga = JSON.parse(req.body.naziviUsluga);
        let ceneUsluga = JSON.parse(req.body.ceneUsluga);
        let kontakt_osoba = req.body.kontakt_osoba;
        let godisnji_odmor_pocetak = JSON.parse(req.body.godisnji_odmor_pocetak);
        let godisnji_odmor_kraj = JSON.parse(req.body.godisnji_odmor_kraj);
        let zaposleni = JSON.parse(req.body.zaposleni);

        // Kreiranje firme
        let novaFirma = new firma();
        novaFirma.naziv = naziv;
        novaFirma.adresa = adresa;
        novaFirma.geografskaSirina = geografskaSirina;
        novaFirma.geografskaDuzina = geografskaDuzina;
        novaFirma.naziviUsluga = naziviUsluga;
        novaFirma.ceneUsluga = ceneUsluga;
        novaFirma.kontakt_osoba = kontakt_osoba;
        novaFirma.godisnji_odmor_pocetak = godisnji_odmor_pocetak;
        novaFirma.godisnji_odmor_kraj = godisnji_odmor_kraj;
        novaFirma.zaposleni = zaposleni;
        novaFirma.ocena = 0;
        novaFirma.brojOcena = 0;

        novaFirma.save()
        .then(data => {
            console.info(`${TipPoruke.INFO} -> firma uspesno kreirana`);
            return res.json({ poruka : PovratnePoruke.FIRMA_KREIRANA });
        })
        .catch(error => {
            console.error(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_CUVANJA_PODATAKA });
        }); 
    }

    dohvatanjeFirme= (req:express.Request, res:express.Response) => {
        console.info(`${TipPoruke.INFO} -> zapoceto dohvatanje firme`);

        // Dohvatanje podataka
        let naziv = req.body.naziv;
        
        firma.findOne({ naziv : naziv })
        .then(firma => {
            if (firma) {
                console.info(`${TipPoruke.INFO} -> firma uspesno pronadjena`);
                return res.json({ poruka : PovratnePoruke.FIRMA_USPESNO_PRONADJENA, firma : firma });
            }
            else {
                console.info(`${TipPoruke.INFO} -> firma ne postoji`);
                return res.json({ poruka : PovratnePoruke.FIRMA_NE_POSTOJI });
            }
        })
        .catch(error => {
            console.error(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_DOHVATANJA_PODATAKA });
        }); 
    }

    dohvatanjeFirmi = (req:express.Request, res:express.Response) => {
        console.info(`${TipPoruke.INFO} -> zapoceto dohvatanje firmi`);

        // Dohvati firme
        firma.find()
        .then(firme=>{
            console.info(`${TipPoruke.INFO} -> firme uspesno dohvacene`);
            return res.json({ firme : firme });
        })
        .catch(error => {
            console.error(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_DOHVATANJA_PODATAKA });
        });
    }

    dohvatanjeSlobodnihDekoratera = (req:express.Request, res:express.Response) => {
        console.info(`${TipPoruke.INFO} -> zapoceto dohvatanje slobodnih dekoratera`);

        // Dohvati firme
        firma.find()
        .then(firme=>{
            // Dohvati sve emailove koji su zauzeti
            const zaposleniEmailovi = firme.flatMap(firma => firma.zaposleni);
            
            korisnik.find({ email: { $nin: zaposleniEmailovi }, tip: TipKorisnika.DEKORATER })
            .then(slobodniDekorateri => {
                console.info(`${TipPoruke.INFO} -> slobodni dekorateri uspesno dohvaceni`);
                return res.json({ dekorateri: slobodniDekorateri });
            });
        })
        .catch(error => {
            console.error(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_DOHVATANJA_PODATAKA });
        });
    }
}

