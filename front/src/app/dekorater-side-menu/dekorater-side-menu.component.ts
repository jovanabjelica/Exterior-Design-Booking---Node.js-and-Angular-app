import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dekorater-side-menu',
  templateUrl: './dekorater-side-menu.component.html',
  styleUrls: ['./dekorater-side-menu.component.css']
})
export class DekoraterSideMenuComponent implements OnInit {

  constructor(private route: ActivatedRoute) {  }

  korisnik: string = "";

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.korisnik = (data as any).korisnik;
    });
  }
}
