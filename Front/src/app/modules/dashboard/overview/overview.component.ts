import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexFill,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  colors: string[];
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
};

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartSpotifyOptions: Partial<ChartOptions>;
  public chartFacebookOptions: Partial<ChartOptions>;
  charts: any;
  user: User;

  constructor(
    public chartService: ChartService,
    public userService: UserService,
  ) {}

  async ngOnInit() {
    this.charts = this.chartService.getCharts();
    this.user = this.userService.getUser();
    try {
      await this.getGraphsData();
    } catch (err) {
      console.log(err);
      alert('No se pudo traer la data de analysis');
    }
  }

  async getGraphsData() {
    const response = await this.userService.getAnalysis();
    const analysis = response['data'];

    const categories = analysis.map(a => a.day);

    const spPositive = analysis.map(a => (a.spotifyGrade ? Math.floor(a.spotifyGrade.positive * 100) : 0));
    const spNeutral = analysis.map(a => (a.spotifyGrade ? Math.floor(a.spotifyGrade.neutral * 100) : 0));
    const spNegative = analysis.map(a => (a.spotifyGrade ? Math.floor(a.spotifyGrade.negative * 100) : 0));

    const averagePositive = analysis.map(a => (a.averageGrade ? Math.floor(a.averageGrade.positive * 100) : 0));
    const averageNeutral = analysis.map(a => (a.averageGrade ? Math.floor(a.averageGrade.neutral * 100) : 0));
    const averageNegative = analysis.map(a => (a.averageGrade ? Math.floor(a.averageGrade.negative * 100) : 0));

    const spotifySeries = [
      {
        name: 'Positive',
        type: 'column',
        data: spPositive,
      },
      {
        name: 'Neutral',
        type: 'column',
        data: spNeutral
      },
      {
        name: 'Negative',
        type: 'column',
        data: spNegative
      },
      {
        name: 'Average Positive',
        type: 'line',
        data: averagePositive,
      },
      {
        name: 'Average Neutral',
        type: 'line',
        data: averageNeutral,
      },
      {
        name: 'Average Negative',
        type: 'line',
        data: averageNegative,
      }
    ];

    this.chartSpotifyOptions = this.generateChartOptions(spotifySeries, categories);

    const fbPositive = analysis.map(a => (a.facebookGrade ? Math.floor(a.facebookGrade.positive * 100) : 0));
    const fbNeutral = analysis.map(a => (a.facebookGrade ? Math.floor(a.facebookGrade.neutral * 100) : 0));
    const fbNegative = analysis.map(a => (a.facebookGrade ? Math.floor(a.facebookGrade.negative * 100) : 0));

    const facebookSeries = [
      {
        name: 'Positive',
        type: 'column',
        data: fbPositive,
      },
      {
        name: 'Neutral',
        type: 'column',
        data: fbNeutral
      },
      {
        name: 'Negative',
        type: 'column',
        data: fbNegative
      },
      {
        name: 'Average Positive',
        type: 'line',
        data: averagePositive,
      },
      {
        name: 'Average Neutral',
        type: 'line',
        data: averageNeutral,
      },
      {
        name: 'Average Negative',
        type: 'line',
        data: averageNegative,
      }
    ];

    this.chartFacebookOptions = this.generateChartOptions(facebookSeries, categories);
  }

  generateChartOptions(series, categories) : Partial<ChartOptions> {
    return {
      series: series,
      chart: {
        height: 350,
        type: 'area'
      },
      colors: ['#64dd17', '#fff176', '#f44336', '#64dd17', '#fff176', '#f44336'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        colors: ['#64dd17', '#fff176', '#f44336'],
      },
      fill: {
        colors: ['#64dd17', '#fff176', '#f44336'],
        opacity: 1,
        gradient: {
          opacityFrom: 1,
          opacityTo: 1,
        },
      },
      xaxis: {
        categories,
      },
    }
  }

  createClassValues(value: number) {
    return `bar-${value.toString()}`;
  }

  createClassIndex(index: number) {
    return `value-${index.toString()}`;
  }

  createClassSocial(social: number) {
    social += 1;
    return `Social-${social.toString()}`;
  }

}
