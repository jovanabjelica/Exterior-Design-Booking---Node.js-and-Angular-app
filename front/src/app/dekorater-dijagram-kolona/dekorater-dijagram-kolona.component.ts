import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Zahtev } from '../models/zahtev';
import { ZahtevService } from '../services/zahtev.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dekorater-dijagram-kolona',
  templateUrl: './dekorater-dijagram-kolona.component.html',
  styleUrls: ['./dekorater-dijagram-kolona.component.css']
})
export class DekoraterDijagramKolonaComponent {
  constructor(private route: ActivatedRoute, private servis: ZahtevService) {  }
  
  mojiZahtevi: Zahtev[] = [];
  korisnik: string = "";
  kolonaChart: Chart|null = null;
  meseci: string[] = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 
                      'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];
  brProjekataPoMesecu: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  dohvZahteve() {
    this.servis.dohvatanjeSvihZahteva()
    .subscribe(data => {
      let zahtevi = (data as any).zahtevi as Zahtev[];
      this.mojiZahtevi = zahtevi.filter((a) => a.dekorater == this.korisnik + "@gmail.com");
      for (let z of this.mojiZahtevi) {
        if (z.datum) {
          let index = +z.datum.toString().split('-')[1];
          this.brProjekataPoMesecu[index - 1] += 1;
        }
      }
      
      this.prikaziGrafikon();
    });
  }

  prikaziGrafikon() {
    this.kolonaChart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Broj zahteva po mesecima'
      },
      xAxis: {
        categories: this.meseci
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Broj zahteva'
        }
      },
      series: [{
        name: 'Zahtevi',
        type: 'column',
        data: this.brProjekataPoMesecu
      }]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(data=>{
      this.korisnik = (data as any).korisnik;
      this.dohvZahteve();
    });
  }
}
