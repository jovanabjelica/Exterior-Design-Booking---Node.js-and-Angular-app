import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { ChartModule } from 'angular-highcharts'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDeaktiviraniComponent } from './admin-deaktivirani/admin-deaktivirani.component';
import { AdminDekoraterComponent } from './admin-dekorater/admin-dekorater.component';
import { AdminFirmaComponent } from './admin-firma/admin-firma.component';
import { AdminSideMenuComponent } from './admin-side-menu/admin-side-menu.component';
import { AdminZahteviComponent } from './admin-zahtevi/admin-zahtevi.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrijavaAdminComponent } from './prijava-admin/prijava-admin.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { VlasnikFirmaLokacijaComponent } from './vlasnik-firma-lokacija/vlasnik-firma-lokacija.component';
import { VlasnikFirmaComponent } from './vlasnik-firma/vlasnik-firma.component';
import { VlasnikFirmeComponent } from './vlasnik-firme/vlasnik-firme.component';
import { VlasnikOdrzavanjeComponent } from './vlasnik-odrzavanje/vlasnik-odrzavanje.component';
import { VlasnikProfilComponent } from './vlasnik-profil/vlasnik-profil.component';
import { VlasnikSideMenuComponent } from './vlasnik-side-menu/vlasnik-side-menu.component';
import { VlasnikZakazivanjeComponent } from './vlasnik-zakazivanje/vlasnik-zakazivanje.component';
import { DekoraterSideMenuComponent } from './dekorater-side-menu/dekorater-side-menu.component';
import { DekoraterProfilComponent } from './dekorater-profil/dekorater-profil.component';
import { DekoraterZakazivanjaComponent } from './dekorater-zakazivanja/dekorater-zakazivanja.component';
import { DekoraterOdrzavanjaComponent } from './dekorater-odrzavanja/dekorater-odrzavanja.component';
import { DekoraterDijagramKolonaComponent } from './dekorater-dijagram-kolona/dekorater-dijagram-kolona.component';
import { DekoraterDijagramHistogramComponent } from './dekorater-dijagram-histogram/dekorater-dijagram-histogram.component';
import { DekoraterDijagramPitaComponent } from './dekorater-dijagram-pita/dekorater-dijagram-pita.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    RegistracijaComponent,
    PrijavaComponent,
    PrijavaAdminComponent,
    AdminComponent,
    PromenaLozinkeComponent,
    AdminDekoraterComponent,
    AdminFirmaComponent,
    AdminSideMenuComponent,
    AdminZahteviComponent,
    AdminDeaktiviraniComponent,
    VlasnikSideMenuComponent,
    VlasnikProfilComponent,
    VlasnikFirmeComponent,
    VlasnikZakazivanjeComponent,
    VlasnikOdrzavanjeComponent,
    VlasnikFirmaComponent,
    VlasnikFirmaLokacijaComponent,
    DekoraterSideMenuComponent,
    DekoraterProfilComponent,
    DekoraterZakazivanjaComponent,
    DekoraterOdrzavanjaComponent,
    DekoraterDijagramKolonaComponent,
    DekoraterDijagramHistogramComponent,
    DekoraterDijagramPitaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
