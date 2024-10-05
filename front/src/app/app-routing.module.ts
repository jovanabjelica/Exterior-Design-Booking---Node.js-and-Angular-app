import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDeaktiviraniComponent } from './admin-deaktivirani/admin-deaktivirani.component';
import { AdminDekoraterComponent } from './admin-dekorater/admin-dekorater.component';
import { AdminFirmaComponent } from './admin-firma/admin-firma.component';
import { AdminZahteviComponent } from './admin-zahtevi/admin-zahtevi.component';
import { AdminComponent } from './admin/admin.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { VlasnikFirmaLokacijaComponent } from './vlasnik-firma-lokacija/vlasnik-firma-lokacija.component';
import { VlasnikFirmaComponent } from './vlasnik-firma/vlasnik-firma.component';
import { VlasnikFirmeComponent } from './vlasnik-firme/vlasnik-firme.component';
import { VlasnikOdrzavanjeComponent } from './vlasnik-odrzavanje/vlasnik-odrzavanje.component';
import { VlasnikProfilComponent } from './vlasnik-profil/vlasnik-profil.component';
import { VlasnikZakazivanjeComponent } from './vlasnik-zakazivanje/vlasnik-zakazivanje.component';
import { PrijavaAdminComponent } from './prijava-admin/prijava-admin.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { DekoraterProfilComponent } from './dekorater-profil/dekorater-profil.component';
import { DekoraterDijagramHistogramComponent } from './dekorater-dijagram-histogram/dekorater-dijagram-histogram.component';
import { DekoraterDijagramPitaComponent } from './dekorater-dijagram-pita/dekorater-dijagram-pita.component';
import { DekoraterOdrzavanjaComponent } from './dekorater-odrzavanja/dekorater-odrzavanja.component';
import { DekoraterZakazivanjaComponent } from './dekorater-zakazivanja/dekorater-zakazivanja.component';
import { DekoraterDijagramKolonaComponent } from './dekorater-dijagram-kolona/dekorater-dijagram-kolona.component';

const routes: Routes = [
  { path: '', component: PocetnaComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'prijava', component: PrijavaComponent },
  { path: 'prijava/vingardium-leviosa', component: PrijavaAdminComponent },
  { path: 'promena-lozinke', component: PromenaLozinkeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin-vlasnik-zahtevi', component: AdminZahteviComponent },
  { path: 'admin-dekorater', component: AdminDekoraterComponent },
  { path: 'admin-firma', component: AdminFirmaComponent },
  { path: 'admin-deaktivirani', component: AdminDeaktiviraniComponent },
  { path: 'vlasnik-profil', component: VlasnikProfilComponent },
  { path: 'vlasnik-profil/:korisnik', component: VlasnikProfilComponent },
  { path: 'vlasnik-firme/:korisnik', component: VlasnikFirmeComponent },
  { path: 'vlasnik-zakazivanje/:korisnik', component: VlasnikZakazivanjeComponent },
  { path: 'vlasnik-odrzavanje/:korisnik', component: VlasnikOdrzavanjeComponent },
  { path: 'vlasnik-firma/:korisnik/:firma', component: VlasnikFirmaComponent },
  { path: 'vlasnik-firma-lokacija/:korisnik/:firma', component: VlasnikFirmaLokacijaComponent },
  { path: 'dekorater-profil', component: DekoraterProfilComponent },
  { path: 'dekorater-profil/:korisnik', component: DekoraterProfilComponent },
  { path: 'dekorater-zakazivanja/:korisnik', component: DekoraterZakazivanjaComponent },
  { path: 'dekorater-odrzavanja/:korisnik', component: DekoraterOdrzavanjaComponent },
  { path: 'dekorater-dijagram-kolona/:korisnik', component: DekoraterDijagramKolonaComponent },
  { path: 'dekorater-dijagram-pita/:korisnik', component: DekoraterDijagramPitaComponent },
  { path: 'dekorater-dijagram-histogram/:korisnik', component: DekoraterDijagramHistogramComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
