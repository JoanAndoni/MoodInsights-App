import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  user = {
    firstName: 'Juan',
    lastName: 'Perez',
    lastTimeChecked: '21/04/2020'
  };

  charts = [{
    date: '10/05/2020',
    data: [
      {
        name: 'Spotify',
        value: 7
      }, {
        name: 'Twitter',
        value: 10
      }, {
        name: 'Facebook',
        value: 9
      }, {
        name: 'Spotify',
        value: 7
      }, {
        name: 'Twitter',
        value: 4
      }, {
        name: 'Facebook',
        value: 6
      }, {
        name: 'Spotify',
        value: 9
      }, {
        name: 'Twitter',
        value: 8
      }, {
        name: 'Facebook',
        value: 3
      }, {
        name: 'Spotify',
        value: 8
      }, {
        name: 'Twitter',
        value: 2
      }, {
        name: 'Facebook',
        value: 10
      }
    ]
  }, {
    date: '11/05/2020',
    data: [
      {
        name: 'Spotify',
        value: 7
      }, {
        name: 'Twitter',
        value: 10
      }, {
        name: 'Facebook',
        value: 9
      }, {
        name: 'Spotify',
        value: 7
      }, {
        name: 'Twitter',
        value: 4
      }, {
        name: 'Facebook',
        value: 6
      }, {
        name: 'Spotify',
        value: 9
      }, {
        name: 'Twitter',
        value: 8
      }, {
        name: 'Facebook',
        value: 3
      }, {
        name: 'Spotify',
        value: 8
      }, {
        name: 'Twitter',
        value: 2
      }, {
        name: 'Facebook',
        value: 10
      }
    ]
  }, {
    date: '12/05/2020',
    data: [
      {
        name: 'Spotify',
        value: 7
      }, {
        name: 'Twitter',
        value: 10
      }, {
        name: 'Facebook',
        value: 9
      }, {
        name: 'Spotify',
        value: 7
      }, {
        name: 'Twitter',
        value: 4
      }, {
        name: 'Facebook',
        value: 6
      }, {
        name: 'Spotify',
        value: 9
      }, {
        name: 'Twitter',
        value: 8
      }, {
        name: 'Facebook',
        value: 3
      }, {
        name: 'Spotify',
        value: 8
      }, {
        name: 'Twitter',
        value: 2
      }, {
        name: 'Facebook',
        value: 10
      }
    ]
  }];




  constructor() { }

  getCharts() {
    return this.charts;
  }

  getUser() {
    return this.user;
  }

}
