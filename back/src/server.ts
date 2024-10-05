import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';

import korisnikRouter from './routers/korisnik.router';
import { TipPoruke } from './constants/Tipovi';
import firmaRouter from './routers/firma.router';
import zahtevRouter from './routers/zahtev.router';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../front/app/src/assets/pic');
    },
    filename: function (req, file, cb) {
        cb(null, `${req.body.korisnickoIme}.jpg`);
    }
});

const upload = multer({ storage: storage });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/vmvb');
const conn = mongoose.connection;
conn.once('open', ()=>{
    console.info(`${TipPoruke.INFO} -> uspesno povezani na bazu`);
});

const router = express.Router();

router.use('/korisnik', upload.single('file'), korisnikRouter);
router.use('/firma', upload.single('file'), firmaRouter);
router.use('/zahtev', upload.single('file'), zahtevRouter);

app.use("/" ,router);
app.listen(4000, () => console.log(`Express server running on port 4000`));