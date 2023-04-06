import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { take } from 'rxjs';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-weight-graph',
  templateUrl: './weight-graph.component.html',
  styleUrls: ['./weight-graph.component.scss'],
})
export class WeightGraphComponent implements OnInit {
  chartOptions: EChartsOption = {};
  @Input() graphMain: boolean = false;
  @Input() graphUser: boolean = false;
  constructor(private usersService: UsersService) {}
  ngOnInit(): void {
    this.usersService.getUserInfo().subscribe((userData: any) => {
      this.chartOptions = {
        xAxis: {
          type: 'category',
          data: [
            'Січ',
            'Лют',
            'Бер',
            'Кві',
            'Тра',
            'Чер',
            'Лип',
            'Cер',
            'Вер',
            'Жов',
            'Лис',
            'Гру',
          ],
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
            data: userData.weight,
            type: 'line',
            smooth: true,
          },
        ],
        backgroundColor: 'transparent',
      };
    });
  }
}
