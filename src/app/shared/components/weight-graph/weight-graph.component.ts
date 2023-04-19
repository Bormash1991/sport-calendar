import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Subscription, take } from 'rxjs';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-weight-graph',
  templateUrl: './weight-graph.component.html',
  styleUrls: ['./weight-graph.component.scss'],
})
export class WeightGraphComponent implements OnInit, OnDestroy {
  chartOptions: EChartsOption = {};
  @Input() graphMain: boolean = false;
  @Input() graphUser: boolean = false;
  subj!: Subscription;
  constructor(private usersService: UsersService) {}
  ngOnDestroy(): void {
    this.subj.unsubscribe();
  }
  ngOnInit(): void {
    this.subj = this.usersService.getUserInfo().subscribe({
      next: (userData) => {
        if (userData) {
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
        }
      },
      error: () => {},
    });
  }
}
