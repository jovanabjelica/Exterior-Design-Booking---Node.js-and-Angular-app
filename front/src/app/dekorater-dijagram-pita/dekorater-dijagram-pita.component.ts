import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Zahtev } from '../models/zahtev';
import { ZahtevService } from '../services/zahtev.service';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-dekorater-dijagram-pita',
  templateUrl: './dekorater-dijagram-pita.component.html',
  styleUrls: ['./dekorater-dijagram-pita.component.css']
})
export class DekoraterDijagramPitaComponent {
  
  constructor(private route: ActivatedRoute, private servis: ZahtevService) {  }
  
  firmaZahtevi: Zahtev[] = [];
  dekorateri: string[] = [];
  brProjekataPoDekorateru: number[] = [];

  korisnik: string = "";

  pitaChart: Chart|null = null;

  dohvZahteve() {
    this.servis.dohvatanjeSvihZahteva()
    .subscribe(data => {
      let zahtevi = (data as any).zahtevi as Zahtev[];
      let mojiZahtevi = zahtevi.filter((a) => a.dekorater == this.korisnik + "@gmail.com");
      
      if (mojiZahtevi.length == 0) return;
      
      let firma = mojiZahtevi[0].firma;
      this.firmaZahtevi = zahtevi.filter((a)=> a.firma == firma);

      for (let z of this.firmaZahtevi) {
        if (!this.dekorateri.includes(z.dekorater)) {
          this.dekorateri.push(z.dekorater);
          this.brProjekataPoDekorateru.push(1);
        }
        else {
          let i = 0;
          for (let d of this.dekorateri) {
            if (d == z.dekorater) {
              this.brProjekataPoDekorateru[i] += 1;
            }
            i += 1;
          }
        }
      }

      this.prikaziGrafik();
    });
  }

  prikaziGrafik() {
    this.pitaChart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Broj zahteva po dekorateru'
      },
      series: [{
        name: 'Projekti',
        type: 'pie', // Dodajte type ovde
        data: this.dekorateri.map((dekorater, i) => ({
          name: dekorater,
          y: this.brProjekataPoDekorateru[i]
        }))
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
