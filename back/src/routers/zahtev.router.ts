import express from 'express';
import { ZahtevController } from '../controllers/zahtev.controller';

const zahtevRouter = express.Router();

zahtevRouter.route('/kreiranje-zahteva').post(
    (req: express.Request, res:express.Response) => { return new ZahtevController().kreiranjeZahteva(req, res); }
)

zahtevRouter.route('/dohvatanje-svih-zahteva').get(
    (req: express.Request, res:express.Response) => { return new ZahtevController().dohvatanjeSvihZahteva(req, res); }
)

zahtevRouter.route('/otkazivanje-zahteva').post(
    (req: express.Request, res:express.Response) => { return new ZahtevController().otkaziZahtev(req, res); }
)

zahtevRouter.route('/dodavanje-komentara').post(
    (req: express.Request, res:express.Response) => { return new ZahtevController().dodavanjeKomentara(req, res); }
)

zahtevRouter.route('/dodavanje-ocene').post(
    (req: express.Request, res:express.Response) => { return new ZahtevController().dodavanjeOcene(req, res); }
)

zahtevRouter.route('/pronadji-firmu-sa-zadatim-dekoraterom').post(
    (req: express.Request, res:express.Response) => { return new ZahtevController().pronadjiFirmuSaZadatimDekoraterom(req, res); }
)

zahtevRouter.route('/dohvatanje-komentara').post(
    (req: express.Request, res:express.Response) => { return new ZahtevController().dohvatanjeKomentaraFirme(req, res); }
)

zahtevRouter.route('/zavrseno-uredjivanje').post(
    (req: express.Request, res:express.Response) => { return new ZahtevController().zavrsenoUredivanje(req, res); }
)

zahtevRouter.route('/zakazivanje-odrzavanja').post(
    (req: express.Request, res:express.Response) => { return new ZahtevController().zakazivanjeOdrzavanja(req, res); }
)

zahtevRouter.route('/prihvati-odrzavanje').post(
    (req: express.Request, res:express.Response) => { return new ZahtevController().prihvatiOdrzavanje(req, res); }
)

zahtevRouter.route('/odbij-odrzavanje').post(
    (req: express.Request, res:express.Response) => { return new ZahtevController().odbijOdrzavanje(req, res); }
)

zahtevRouter.route('/prihvati-zahtev').post(
    (req: express.Request, res:express.Response) => { return new ZahtevController().prihvatiZahtev(req, res); }
)

zahtevRouter.route('/odbij-zahtev').post(
    (req: express.Request, res:express.Response) => { return new ZahtevController().odbijZahtev(req, res); }
)

export default zahtevRouter;