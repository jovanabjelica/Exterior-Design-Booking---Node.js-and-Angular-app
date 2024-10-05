import express from 'express';

import { FirmaController } from '../controllers/firma.controller';

const firmaRouter = express.Router();

firmaRouter.route('/dodavanje-firme').post(
    (req: express.Request, res: express.Response)=> { return new FirmaController().dodavanjeFirme(req, res); }
);

firmaRouter.route('/dohvatanje-firme').post(
    (req: express.Request, res: express.Response)=> { return new FirmaController().dohvatanjeFirme(req, res); }
);

firmaRouter.route('/dohvatanje-firmi').get(
    (req: express.Request, res: express.Response)=> { return new FirmaController().dohvatanjeFirmi(req, res); }
);

firmaRouter.route('/dohvatanje-firmi').get(
    (req: express.Request, res: express.Response)=> { return new FirmaController().dohvatanjeFirmi(req, res); }
);

firmaRouter.route('/dohvatanje-slobodnih-dekoratera').get(
    (req: express.Request, res: express.Response)=> { return new FirmaController().dohvatanjeSlobodnihDekoratera(req, res); }
);

export default firmaRouter;