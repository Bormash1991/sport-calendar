import { AfterViewInit, Component } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-weight-graph',
  templateUrl: './weight-graph.component.html',
  styleUrls: ['./weight-graph.component.scss'],
})
export class WeightGraphComponent implements AfterViewInit {
  ngAfterViewInit(): void {}

  chartOptions: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: '#bbc6c9a1',
        },
      },
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
        smooth: true,
      },
    ],
    backgroundColor: 'transparent',
  };
}
