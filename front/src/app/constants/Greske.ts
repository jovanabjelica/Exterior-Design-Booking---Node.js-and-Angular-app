export enum Greska {
    // Prazna polja
    PRAZNO_KORISNICKO_IME = "Morate uneti korisnicko ime.",
    PRAZNA_LOZINKA = "Morate uneti lozinku.",
    PRAZNO_IME = "Morate uneti ime.",
    PRAZNO_PREZIME = "Morate uneti prezime.",
    PRAZAN_EMAIL = "Morate uneti email adresu.",
    PRAZNA_ADRESA = "Morate uneti adresu.",
    PRAZAN_BROJ_KREDITNE_KARTICE = "Morate uneti broj kreditne kartice.",
    PRAZAN_KONTAKT_TELEFON = "Morate uneti broj kontakt telefona.",
    PRAZAN_POL = "Morate uneti pol.",
    PRAZNA_STARA_LOZINKA = "Morate uneti staru lozinku.",
    PRAZNA_NOVA_LOZINKA = "Morate uneti novu lozinku.",
    PRAZAN_EMAIL_ZAPOSLENOG = "Morate uneti korisnicku adresu zaposlenog.",
    PRAZAN_NAZIV_USLUGE = "Morate uneti naziv usluge.",
    PRAZNA_CENA_USLUGE = "Morate uneti cenu usluge.",
    PRAZAN_NAZIV = "Morate uneti naziv.",
    PRAZNE_USLUGE = "Morate uneti barem 1 uslugu.",
    PRAZAN_PERIOD_GODISNJEG_ODMORA = "Morate uneti period godisnjeg odmora",
    PRAZNA_KONTAKT_OSOBA = "Morate dodati kontakt osobu.",
    PRAZAN_DATUM = "Morate uneti datum.",
    PRAZNO_VREME = "Morate uneti vreme.",
    PRAZNA_KVADRATURA = "Morate uneti kvadraturu.",
    PRAZAN_TIP = "Morate uneti tip.",
    PRAZNA_POVRSINA_ZELENILA = "Morate uneti povrsinu zelenila.",
    PRAZNA_POVRSINA_BAZENA = "Morate uneti povrsinu bazena.",
    PRAZNA_POVRSINA_LEZALJKI = "Morate uneti povrsinu lezaljki.",
    PRAZNA_POVRSINA_STOLOVA = "Morate uneti povrsinu stolova.",
    PRAZNA_POVRSINA_FONTANE = "Morate uneti povrsinu fontane.",
    PRAZAN_BROJ_STOLOVA = "Morate uneti broj stolova.",
    PRAZAN_BROJ_STOLICA = "Morate uneti broj stolica.",
    PRAZNA_OPCIJA = "Odaberite jednu od opcija.",
    PRAZAN_JSON_FILE = "Morate odabrati JSON file.",
    NEDOVOLJNO_ZAPOSLENIH = "Morate uneti minimum 2 zaposlena.",
    PRAZAN_KOMENTAR = "Morate dodati komentar.",
    PRAZNA_OCENA = "Morate uneti ocenu.",
    
    // Nepravilan format
    NEVALIDNA_LOZINKA = "Lozinka mora imati minimalno 6 i maksimalno 10 karaktera, mora poceti slovom, " + 
                        "mora imati bar jedno veliko slovo, bar 3 mala slova, bar 1 broj i mora sadrzati bar 1 specijalni karakter!",

    // Nepodudaranje lozinka
    NEPODUDARANJE_LOZINKI = "Lozinka i potvrda lozinke se ne podudaraju",

    // Zauzeti kredencijali
    KORISNICKO_IME_ZAUZETO = "Korisnicko ime je vec u upotrebi.",
    EMAIL_ZAUZET = "Email adresa je vec u upotrebi.",

    // Nepostojeci korisnik
    NEPOSTOJECI_KORISNIK = "Neispravni kredencijali.",

    // Nevalidna kreditna kartica
    NEVALIDNA_KREDITNA_KARTICA = "Nevalidna kreditna kartica.",

    // Neodgovarajuca velicina slike
    NEVALIDNE_DIMENZIJE_SLIKE = "Uneta slika ima neodgovarajuce dimenzije. Velicina slike mora biti izmedju 100x100px i 300x300px.",

    // Nevalidan dekorater
    DEKORATER_VEC_ZAPOSLEN_ILI_NE_POSTOJI = "Uneti dekorater je vec zauzet ili ne postoji.", 

    // Nevalidan datum
    SVI_DEKORATERI_ZAUZETI = "Za odabrani datum nemamo slobodnih dekoratera. Odaberite drugi datum.",
    FIRMA_NA_GODISNJEM = "Firma je na godisnjem odmoru za odabrani period. Odaberite drugi datum.",
}

