import express from 'express';
import { KorisnikController } from '../controllers/korisnik.controller';

const korisnikRouter = express.Router();

korisnikRouter.route('/korisnicko-ime-jedinstveno').post(
    (req: express.Request, res: express.Response)=> { return new KorisnikController().korisnickoImeJedinstveno(req, res); }
);

korisnikRouter.route('/email-jedinstven').post(
    (req: express.Request, res: express.Response)=> { return new KorisnikController().emailJedinstven(req, res); }
);

korisnikRouter.route('/registracija-zahtev').post(
    (req: express.Request, res: express.Response)=> { return new KorisnikController().kreiranjeZahtevaRegistracija(req, res); }
);

korisnikRouter.route('/prijava').post(
    (req: express.Request, res: express.Response)=> { return new KorisnikController().prijava(req, res); }
);

korisnikRouter.route('/promena-lozinke').post(
    (req: express.Request, res: express.Response)=> { return new KorisnikController().promenaLozinke(req, res); }
);

korisnikRouter.route('/azuriranje-korisnika').post(
    (req: express.Request, res: express.Response)=> { return new KorisnikController().azuriranjeKorisnika(req, res); }
);

korisnikRouter.route('/dohvati-zahteve').get(
    (req: express.Request, res: express.Response)=> { return new KorisnikController().dohvatiSveZahteve(req, res); }
);

korisnikRouter.route('/dohvati-vlasnike').get(
    (req: express.Request, res: express.Response)=> { return new KorisnikController().dohvatiRegistrovaneVlasnike(req, res); }
);

korisnikRouter.route('/dohvati-dekoratere').get(
    (req: express.Request, res: express.Response)=> { return new KorisnikController().dohvatiSveDekoratere(req, res); }
);

korisnikRouter.route('/dohvati-deaktivirane').get(
    (req: express.Request, res: express.Response)=> { return new KorisnikController().dohvatiSveDeaktivirane(req, res); }
);

korisnikRouter.route('/prihvatanje-zahteva').post(
    (req: express.Request, res: express.Response)=> { return new KorisnikController().prihvatanjeZahteva(req, res); }
);

korisnikRouter.route('/odbijanje-zahteva').post(
    (req: express.Request, res: express.Response)=> { return new KorisnikController().odbijanjeZahteva(req, res); }
);

korisnikRouter.route('/deaktiviranje-korisnika').post(
    (req: express.Request, res: express.Response)=> { return new KorisnikController().deaktivirajKorisnika(req, res); }
);

korisnikRouter.route('/registrovanje-dekoratera').post(
    (req: express.Request, res: express.Response)=> { return new KorisnikController().dodajDekoratera(req, res); }
);

korisnikRouter.route('/pronadji-korisnika').post(
    (req: express.Request, res: express.Response)=> { return new KorisnikController().pronadjiKorisnika(req, res); }
);

export default korisnikRouter;