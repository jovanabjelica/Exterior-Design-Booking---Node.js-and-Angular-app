import { Component, OnInit } from '@angular/core';
import { Zahtev } from '../models/zahtev';
import { ActivatedRoute } from '@angular/router';
import { ZahtevService } from '../services/zahtev.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dekorater-dijagram-histogram',
  templateUrl: './dekorater-dijagram-histogram.component.html',
  styleUrls: ['./dekorater-dijagram-histogram.component.css']
})
export class DekoraterDijagramHistogramComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private servis: ZahtevService) {  }
  
  korisnik: string = "";
  histogramChart: Chart|null = null;

  dani: string[] = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'];
  brojPoslovaPoDanu: number[] = [0, 0, 0, 0, 0, 0, 0];

  dohvZahteve() {
    this.servis.dohvatanjeSvihZahteva()
    .subscribe(data => {
      let zahtevi = (data as any).zahtevi as Zahtev[];

      for (let z of zahtevi) {
        if (z.datum) {
          this.brojPoslovaPoDanu[new Date(z.datum).getDay()] += 1;
        }
      }

      this.prikaziGrafik();
    });
  }

  prikaziGrafik() {
    this.histogramChart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Broj poslova po danu u nedelji'
      },
      xAxis: {
        categories: this.dani,
        title: {
          text: 'Dan u nedelji'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Broj poslova'
        }
      },
      series: [{
        name: 'Poslovi',
        type: 'line',
        data: this.brojPoslovaPoDanu
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
