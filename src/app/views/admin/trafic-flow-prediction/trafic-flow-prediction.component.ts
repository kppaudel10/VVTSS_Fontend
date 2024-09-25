import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trafic-flow-prediction',
  templateUrl: './trafic-flow-prediction.component.html',
  styleUrls: ['./trafic-flow-prediction.component.scss'],
})
export class TraficFlowPredictionComponent implements OnInit {
  navLinks!: any[];
  activeLinkIndex = 0;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.navLinks = [
      {
        label: 'Training',
        link: 'training',  
        index: 0
      },
      {
        label: 'Forecast',
        link: 'forecast',  
        index: 1
      },
      {
        label: 'Log',
        link: 'log',  
        index: 2
      },
      {
        label: 'Performance',
        link: 'performance',  
        index: 3
      }
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      const currentUrl = this.router.url[0];
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find(tab => tab.link === currentUrl.split('/').pop())
      );
    });
  }
}
