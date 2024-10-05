import * as express from 'express'

import korisnik from '../models/korisnik';

import { TipKorisnika, TipPoruke } from '../constants/Tipovi';
import { PovratnePoruke } from '../constants/Poruke';
import { StatusKorisnika } from '../constants/Statusi';

export class KorisnikController {
    
    kriptovanjeLozinke = (lozinka: String) => {
        const crypto = require('crypto');
        return crypto.createHash('sha256').update(lozinka).digest('hex');
    }
    
    korisnickoImeJedinstveno = (req:express.Request, res:express.Response) => {
        console.info(`${TipPoruke.INFO} -> zapoceta provera korisnickog imena`);

        // Dohvatanje podataka
        let korisnickoIme = req.body.korisnickoIme;
        
        // Provera jedinstvenosti korisnickog imena
        korisnik.findOne({ korisnickoIme : korisnickoIme })
        .then(korisnik => {
            if (korisnik != null) {
                console.info(`${TipPoruke.INFO} -> korisnik sa zadatim korisnickim imenom vec postoji`);
                return res.json({ poruka : PovratnePoruke.KORISNICKO_IME_NIJE_JEDINSTVENO });
            }
            else {
                console.info(`${TipPoruke.INFO} -> korisnik sa zadatim korisnickim imenom ne postoji`);
                return res.json({ poruka : PovratnePoruke.KORISNICKO_IME_JEDINSTVENO });
            }
        })
        .catch(error => {
            console.error(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_DOHVATANJA_PODATAKA });
        });
    }

    emailJedinstven = (req:express.Request, res:express.Response) => {
        console.info(`${TipPoruke.INFO} -> zapoceta provera email adrese`);

        // Dohvatanje podataka
        let  email = req.body.email;
        
        // Provera jedinstvenosti email adrese
        korisnik.findOne({ email : email })
        .then(korisnik => {
            if (korisnik != null) {
                console.info(`${TipPoruke.INFO} -> korisnik sa zadatom email adresom vec postoji`);
                return res.json({ poruka : PovratnePoruke.EMAIL_NIJE_JEDINSTVEN });
            }
            else {
                console.info(`${TipPoruke.INFO} -> korisnik sa zadatom email adresom ne postoji`);
                return res.json({ poruka : PovratnePoruke.EMAIL_JEDINSTVEN });
            }
        })
        .catch(error => {
            console.error(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_DOHVATANJA_PODATAKA });
        });
    }

    kreiranjeZahtevaRegistracija = (req:express.Request, res:express.Response) => {
        console.info(`${TipPoruke.INFO} -> zapoceto kreiranje zahteva za registraciju`);

        // Dohvatanje podataka
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let pol = req.body.pol;
        let adresa = req.body.adresa;
        let kontaktTelefon = req.body.kontaktTelefon;
        let email = req.body.email;
        let brojKreditneKartice = req.body.brojKreditneKartice;

        // Kriptovanje lozinke
        let kriptovanaLozinka = this.kriptovanjeLozinke(lozinka);

        // Kreiranje i inicijalizacija novog korisnika
        let noviKorisnik = new korisnik();
        noviKorisnik.korisnickoIme = korisnickoIme;
        noviKorisnik.lozinka = kriptovanaLozinka;
        noviKorisnik.ime = ime;
        noviKorisnik.prezime = prezime;
        noviKorisnik.pol = pol;
        noviKorisnik.adresa = adresa;
        noviKorisnik.kontaktTelefon = kontaktTelefon;
        noviKorisnik.email = email;
        noviKorisnik.brojKreditneKartice = brojKreditneKartice;
        noviKorisnik.tip = TipKorisnika.VLASNIK;
        noviKorisnik.status = StatusKorisnika.NA_CEKANJU;
        
        // Provera da li je korisnik dodao profilnu sliku
        if (req.file) {
            noviKorisnik.profilnaSlika = req.file.filename;
        }

        // Cuvanje korisnika u bazi
        noviKorisnik.save()
        .then(korisnik => {
            console.info(`${TipPoruke.INFO} -> uspesno kreiran zahtev za registraciju`);
            return res.json({ poruka : PovratnePoruke.ZAHTEV_ZA_REGISTRACIJU_KREIRAN });
        })
        .catch(error => {
            console.error(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_CUVANJA_PODATAKA });
        });
    }

    prijava = (req:express.Request, res:express.Response) => {
        console.info(`${TipPoruke.INFO} -> zapoceta prijava na sistem`);

        // Dohvatanje podataka
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;

        // Sifrovanje lozinke
        let kriptovanaLozinka = this.kriptovanjeLozinke(lozinka);

        // Provera da li korisnik sa unetim kredencijalima postoji u bazi podataka
        korisnik.findOne({ korisnickoIme : korisnickoIme, lozinka : kriptovanaLozinka, status : StatusKorisnika.ODOBREN })
        .then(korisnik => {
            if (korisnik == null) {
                console.info(`${TipPoruke.INFO} -> korisnik sa unetim kredencijalima ne postoji`);
                return res.json({ poruka : PovratnePoruke.KORISNIK_NIJE_PRONADJEN });
            }
            else {
                console.info(`${TipPoruke.INFO} -> korisnik sa unetim kredencijalima pronadjen`);
                return res.json({ korisnik : korisnik, poruka : PovratnePoruke.KORISNIK_USPESNO_PRONADJEN });
            }
        })
        .catch(error => {
            console.error(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_DOHVATANJA_PODATAKA });
        });
    }

    promenaLozinke = (req:express.Request, res:express.Response) => {
        console.info(`${TipPoruke.INFO} -> zapoceta promena lozinke`);

        // Dohvatanje podataka
        let korisnickoIme = req.body.korisnickoIme;
        let staraLozinka = req.body.staraLozinka;
        let novaLozinka = req.body.novaLozinka;

        // Sifrovanje lozinki
        let kriptovanaStaraLozinka = this.kriptovanjeLozinke(staraLozinka);
        let kriptovanaNovaLozinka = this.kriptovanjeLozinke(novaLozinka);

        // Promena lozinke
        korisnik.findOneAndUpdate({ korisnickoIme : korisnickoIme, lozinka : kriptovanaStaraLozinka }, { lozinka : kriptovanaNovaLozinka })
        .then(korisnik => {
            if (korisnik == null) {
                console.info(`${TipPoruke.INFO} -> korisnik sa unetim kredencijalima ne postoji`);
                return res.json({ poruka : PovratnePoruke.KORISNIK_NIJE_PRONADJEN });
            }
            else {
                console.info(`${TipPoruke.INFO} -> korisnik sa unetim kredencijalima pronadjen i lozinka je uspesno promenjena`);
                return res.json({ poruka : PovratnePoruke.LOZINKA_USPESNO_AZURIRANA });
            }
        })
        .catch(error => {
            console.error(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_AZURIRANJA_PODATAKA });
        }); 
    }

    azuriranjeKorisnika= (req:express.Request, res:express.Response) => {
        console.info(`${TipPoruke.INFO} -> zapoceto kreiranje zahteva za registraciju`);

        // Dohvatanje podataka
        let staroKorisnickoIme = req.body.staroKorisnickoIme;
        let novoKorisnickoIme = req.body.novoKorisnickoIme;
        let novoIme = req.body.novoIme;
        let novoPrezime = req.body.novoPrezime;
        let novaAdresa = req.body.novaAdresa;
        let noviKontaktTelefon = req.body.noviKontaktTelefon;
        let noviEmail = req.body.noviEmail;
        let noviBrojKreditneKartice = req.body.noviBrojKreditneKartice;
        let novaProfilnaSlika = "";

        // Provera da li je korisnik azurirao profilnu sliku
        if (req.file) {
            novaProfilnaSlika = req.file.filename;
        }

        // Objekat za ažuriranje sa svim novim vrednostima
        let azuriraniPodaci: any = {
            korisnickoIme: novoKorisnickoIme,
            ime: novoIme,
            prezime: novoPrezime,
            adresa: novaAdresa,
            kontaktTelefon: noviKontaktTelefon,
            email: noviEmail,
            brojKreditneKartice: noviBrojKreditneKartice
        };

        // Ako je nova profilna slika dostupna, dodajemo je u objekat za ažuriranje
        if (novaProfilnaSlika != "") {
            azuriraniPodaci.profilnaSlika = novaProfilnaSlika;
        }

        korisnik.findOneAndUpdate({ korisnickoIme : staroKorisnickoIme }, azuriraniPodaci, { new: true })
        .then(korisnik => {
            if (korisnik == null) {
                console.info(`${TipPoruke.INFO} -> korisnik sa unetim korisnickim imenom ne postoji`);
                return res.json({ poruka : PovratnePoruke.KORISNIK_NIJE_PRONADJEN });
            }
            else {
                console.info(`${TipPoruke.INFO} -> korisnik uspesno azuriran`);
                return res.json({ poruka : PovratnePoruke.KORISNICKI_PODACI_USPESNO_AZURIRANI, korisnik : korisnik });
            }
        })
        .catch(error => {
            console.error(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_AZURIRANJA_PODATAKA });
        }); 
    }

    dohvatiSveZahteve = (req:express.Request, res:express.Response) => {
        console.info(`${TipPoruke.INFO} -> zapoceto dohvatanje zahteva`);
    
        // Dohvatanje zahteva iz baze
        korisnik.find({ tip : TipKorisnika.VLASNIK, status : StatusKorisnika.NA_CEKANJU })
        .then(korisnici => {
            console.info(`${TipPoruke.INFO} -> zahtevi dohvaceni`);
            return res.json({ korisnici : korisnici, poruka : PovratnePoruke.ZAHTEVI_DOHVACENI });
        })
        .catch(error => {
            console.error(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_DOHVATANJA_PODATAKA });
        })
    }

    dohvatiSveDekoratere = (req:express.Request, res:express.Response) => {
        console.info(`${TipPoruke.INFO} -> zapoceto dohvatanje dekoratera`);
    
        // Dohvatanje zahteva iz baze
        korisnik.find({ tip : TipKorisnika.DEKORATER, status : StatusKorisnika.ODOBREN })
        .then(korisnici => {
            console.info(`${TipPoruke.INFO} -> dekorateri dohvaceni`);
            return res.json({ korisnici : korisnici, poruka : PovratnePoruke.DEKORATERI_DOHVACENI });
        })
        .catch(error => {
            console.error(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_DOHVATANJA_PODATAKA });
        })
    }

    dohvatiSveDeaktivirane = (req:express.Request, res:express.Response) => {
        console.info(`${TipPoruke.INFO} -> zapoceto dohvatanje deaktiviranih korisnika`);
    
        // Dohvatanje zahteva iz baze
        korisnik.find({ status : StatusKorisnika.DEAKTIVIRAN })
        .then(korisnici => {
            console.info(`${TipPoruke.INFO} -> deaktivirani korisnicki dohvaceni`);
            return res.json({ korisnici : korisnici, poruka : PovratnePoruke.DEAKTIVIRANI_KORISNICI_DOHVACENI });
        })
        .catch(error => {
            console.error(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_DOHVATANJA_PODATAKA });
        })
    }

    prihvatanjeZahteva = (req:express.Request, res:express.Response) => {
        console.info(`${TipPoruke.INFO} -> zapoceto prihvatanje zahteva`);
        
        // Dohvatanje podataka
        let korisnickoIme = req.body.korisnickoIme;

        // Azuriranje statusa
        korisnik.findOneAndUpdate({ korisnickoIme : korisnickoIme }, { status : StatusKorisnika.ODOBREN })
        .then(korisnik => {
            console.info(`${TipPoruke.INFO} -> zahtev uspesno prihvacen`);
            return res.json({ poruka : PovratnePoruke.ZAHTEV_PRIHVACEN });
        })
        .catch(error => {
            console.error(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_AZURIRANJA_PODATAKA });   
        });
    }
    
    odbijanjeZahteva = (req:express.Request, res:express.Response) => {
        console.info(`${TipPoruke.INFO} -> zapoceto odbijanje zahteva`);
        
        // Dohvatanje podataka
        let korisnickoIme = req.body.korisnickoIme;

        // Azuriranje statusa
        korisnik.findOneAndUpdate({ korisnickoIme : korisnickoIme }, { status : StatusKorisnika.ODOBREN })
        .then(korisnik => {
            console.info(`${TipPoruke.INFO} -> zahtev uspesno odbijen`);
            return res.json({ poruka : PovratnePoruke.ZAHTEV_ODBIJEN });
        })
        .catch(error => {
            console.error(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_AZURIRANJA_PODATAKA });   
        });
    }

    dohvatiRegistrovaneVlasnike = (req:express.Request, res:express.Response) => {
        console.info(`${TipPoruke.INFO} -> zapoceto dohvatanje registrovanih vlasnika`);
    
        // Dohvatanje zahteva iz baze
        korisnik.find({ tip : TipKorisnika.VLASNIK, status : StatusKorisnika.ODOBREN })
        .then(korisnici => {
            console.info(`${TipPoruke.INFO} -> vlasnici dohvaceni`);
            return res.json({ korisnici : korisnici, poruka : PovratnePoruke.REGISTROVANI_VLASNICI });
        })
        .catch(error => {
            console.error(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_DOHVATANJA_PODATAKA });
        });
    }

    deaktivirajKorisnika = (req:express.Request, res:express.Response) => {
        console.info(`${TipPoruke.INFO} -> zapoceto deaktiviranje korisnika`);
        
        // Dohvatanje podataka
        let korisnickoIme = req.body.korisnickoIme;

        // Azuriranje statusa
        korisnik.findOneAndUpdate({ korisnickoIme : korisnickoIme }, { status : StatusKorisnika.DEAKTIVIRAN })
        .then(korisnik => {
            console.info(`${TipPoruke.INFO} -> korisnik uspesno obrisan`);
            return res.json({ poruka : PovratnePoruke.KORISNIK_DEAKTIVIRAN });
        })
        .catch(error => {
            console.error(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_AZURIRANJA_PODATAKA });   
        });
    }

    dodajDekoratera = (req:express.Request, res:express.Response) => {
        console.info(`${TipPoruke.INFO} -> zapoceto dodavanje dekoratera`);

        // Dohvatanje podataka
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let pol = req.body.pol;
        let kontaktTelefon = req.body.kontaktTelefon;
        let email = req.body.email;
        let brojKreditneKartice = req.body.brojKreditneKartice;

        // Kriptovanje lozinke
        let kriptovanaLozinka = this.kriptovanjeLozinke(lozinka);

        // Kreiranje i inicijalizacija novog korisnika
        let noviKorisnik = new korisnik();
        noviKorisnik.korisnickoIme = korisnickoIme;
        noviKorisnik.lozinka = kriptovanaLozinka;
        noviKorisnik.ime = ime;
        noviKorisnik.prezime = prezime;
        noviKorisnik.pol = pol;
        noviKorisnik.kontaktTelefon = kontaktTelefon;
        noviKorisnik.email = email;
        noviKorisnik.brojKreditneKartice = brojKreditneKartice;
        noviKorisnik.tip = TipKorisnika.DEKORATER;
        noviKorisnik.status = StatusKorisnika.ODOBREN;

        // Cuvanje korisnika u bazi
        noviKorisnik.save()
        .then(korisnik => {
            console.info(`${TipPoruke.INFO} -> uspesno kreiranje dekoratera`);
            return res.json({ poruka : PovratnePoruke.DEKORATER_KREIRAN });
        })
        .catch(error => {
            console.error(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_CUVANJA_PODATAKA });
        });
    }

    pronadjiKorisnika = (req:express.Request, res:express.Response) => {
        console.info(`${TipPoruke.INFO} -> zapoceto pronalazenje vlasnika`);

        // Dohvatanje podataka
        let korisnickoIme = req.body.korisnickoIme;
        
        // Provera jedinstvenosti korisnickog imena
        korisnik.findOne({ korisnickoIme : korisnickoIme })
        .then(korisnik => {
            if (korisnik != null) {
                console.info(`${TipPoruke.INFO} -> vlasnik sa zadatim korisnickim imenom postoji`);
                return res.json({ poruka : PovratnePoruke.VLASNIK_POSTOJI, vlasnik : korisnik });
            }
            else {
                console.info(`${TipPoruke.INFO} -> vlasnik sa zadatim korisnickim imenom ne postoji`);
                return res.json({ poruka : PovratnePoruke.VLASNIK_NE_POSTOJI });
            }
        })
        .catch(error => {
            console.error(`${TipPoruke.ERROR} -> ${error}`);
            return res.json({ poruka : PovratnePoruke.GRESKA_PRILIKOM_DOHVATANJA_PODATAKA });
        });
    }
}