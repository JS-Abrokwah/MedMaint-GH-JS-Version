import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css'],
})
export class BarchartComponent implements OnInit, OnChanges {
  @Input() title!: string;
  @Input() labels!: string[];
  @Input() data!: number[];
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartConfiguration['options'];
  public barChartData!: ChartData<'bar'>;
  public barChartPlugins = [DataLabelsPlugin];

  ngOnChanges(changes: SimpleChanges): void {
    this.barChartOptions = {
      responsive: true,
      scales: {
        x: {},
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: true,
        },
        datalabels: {
          anchor: 'end',
          align: 'end',
        },
      },
    };
    this.barChartData = {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
          label: this.title,
          backgroundColor: [
            '#db5656',
            'green',
            '#ec9e3f',
            '#00ffff',
            '#3e7ae2',
            '#99ca36',
            'red',
            'black',
          ],
        },
      ],
    };
  }
  constructor() {}
  ngOnInit(): void {}
}
