import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

// npm package to pick random material color
import * as randomMC from 'random-material-color';

// Interface for time column
interface ITime {
  digit_12: number;
  digit_24: number;
  period: string;
}

// Interface for single element of grid
interface IBox {
  digit_24: number;
  date: string;
  isEvent: boolean;
  title?: string;
  color?: string;
  border?: string;

}

@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.css']
})
export class CustomCalendarComponent implements OnInit {

  // Given Events Array
  private events = [
    {
      "start": "2040-02-29T08:00:00Z",
      "end": "2040-02-29T10:00:00Z",
      "title": "Event 1"
    },
    {
      "start": "2040-03-01T12:00:00Z",
      "end": "2040-03-01T13:00:00Z",
      "title": "Event 2"
    },
    {
      "start": "2040-03-01T14:00:00Z",
      "end": "2040-03-01T15:00:00Z",
      "title": "Event 3"
    },
    {
      "start": "2040-03-02T14:00:00Z",
      "end": "2040-03-02T15:00:00Z",
      "title": "Event 4"
    }
  ];

  // Next 3 days date
  public dates = ["2040-02-29", "2040-03-01", "2040-03-02"];

  public grid: IBox[][];

  public times: ITime[] = [];

  constructor() {
  }

  ngOnInit() {
    this.prepareTimeColumn();
    this.prepareGrid();
    this.checkEvent();
  }

  /**
   * Prepare Time Column to show on the first column of grid and then for comparison of events
   */
  private prepareTimeColumn(): void {

    let timeDigit_12: number = 8;
    let timeDigit_24: number = 8;
    let timePeriod: string = 'AM';

    let counter: number = 0;

    while (counter < 10) {

      if (timeDigit_12 === 13) {

        timeDigit_12 = 1;
        timePeriod = 'PM';

      }

      this.times.push({ digit_12: timeDigit_12, digit_24: timeDigit_24, period: timePeriod });

      timeDigit_12++;
      timeDigit_24++;
      counter++;

    }
  }

  /**
   * Prepare Grid For calendar and set the needed property
  */
  private prepareGrid(): void {

    this.grid = [];

    for (let i = 0; i < this.dates.length; i++) {

      this.grid[i] = [];

      for (let j = 0; j < this.times.length; j++) {

        this.grid[i][j] = {
          digit_24: this.times[j].digit_24,
          date: this.dates[i],
          isEvent: false,
          title: '',
          color: 'white',
          border: 'border: 0.5px solid black'
        };

      }

    }
  }

  /**
   * Check Event by Iterating Event
   */
  private checkEvent(): void {

    this.events.forEach(element => {

      const startDate = new Date(element.start);
      const endDate = new Date(element.end);

      const startHour = startDate.getUTCHours();
      const endHour = endDate.getUTCHours();

      this.eventFinder(startHour, endHour, startDate, endDate, element.title);

    });
  }

  /**
   * Finding the event on grid and initialize the box with event properties
   *
   * @param startHour number
   * @param endHour number
   * @param startDate Date
   * @param endDate Date
   * @param title string
   */
  private eventFinder(startHour: number, endHour: number, startDate: Date, endDate: Date, title: string): void {

    // get random color for event
    const color = this.getRandomColor();

    // Fetching event on grid
    for (let i = 0; i < this.grid.length; i++) {

      for (let j = 0; j < this.grid[i].length; j++) {

        const toDate = new Date(this.grid[i][j].date);

        if (this.grid[i][j].digit_24 >= startHour && this.grid[i][j].digit_24 <= endHour && startDate.getDay() === toDate.getDay()) {

          this.grid[i][j].isEvent = true;
          this.grid[i][j].color = color;
          this.grid[i][j].border = '0.5px solid ' + color;

          if (this.grid[i][j].digit_24 === startHour) {

            this.grid[i][j].title = title;

          }

        }

      }

    }
  }

  /**
  * Picking Random Material Color
  */
  private getRandomColor(): string {
    const color = randomMC.getColor();
    return color;
  }
}




