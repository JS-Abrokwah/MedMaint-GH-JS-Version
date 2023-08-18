import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css'],
})
export class PiechartComponent implements OnInit,OnChanges {
  @Input() chartTitile!: string;
  @Input() chartLabels!:string[];
  @Input() data!: number[];
  @Input() colors!:string[]
  // Doughnut
  public doughnutChartLabels!: string[] 
  public doughnutChartData!: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.doughnutChartLabels= this.chartLabels
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: this.data,
          backgroundColor: this.colors,
        },
      ],
    };
  }
  ngOnInit() {
  }
}
