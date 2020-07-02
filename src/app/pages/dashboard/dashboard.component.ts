import {Component, OnInit} from '@angular/core';
import Chart from 'chart.js';
import {ToastrService} from "ngx-toastr";
import {LogsService} from "../../services/logs.service";
import {ProcessModel} from "../../models/ProcessModel";


@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  public canvas: any;
  public ctx;
  public chartColor;
  public chartHours;
  se = 0;
  in = 0;
  up = 0;
  de = 0;
  dataSe: number[] = [];
  dataIn: number[] = [];
  dataUp: number[] = [];
  dataDe: number[] = [];
  months = {
    '1': 'Jan', '2': 'Feb', '3': 'Mar', '4': 'Apr', '5': 'May', '6': 'Jun', '7': 'Jul', '8': 'Aug',
    '9': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
  };
  labels: string[] = [];

  constructor(private toastr: ToastrService,
              private logsService: LogsService) {
  }

  ngOnInit() {

    this.loadLogs();
    this.loadLabels();
    this.chartColor = "#FFFFFF";

  }

  loadLogs() {
    this.logsService.GetCountByType(1).subscribe(value => {
      this.se = value; // Refresh the data
    }, error => {
      this.showNotification(4, 'top', 'center', error.message);
    });
    this.logsService.GetCountByType(2).subscribe(value => {
      this.in = value; // Refresh the data
    }, error => {
      this.showNotification(4, 'top', 'center', error.message);
    });
    this.logsService.GetCountByType(3).subscribe(value => {
      this.up = value; // Refresh the data
    }, error => {
      this.showNotification(4, 'top', 'center', error.message);
    });
    this.logsService.GetCountByType(4).subscribe(value => {
      this.de = value; // Refresh the data
    }, error => {
      this.showNotification(4, 'top', 'center', error.message);
    });
  }

  loadLabels() {
    this.logsService.GetMonths().subscribe(value => {
      value.forEach(element => {
        this.labels.push(this.months[element.toString()]);
      });
      this.loadDataLineOpSe();
    }, error => {
      this.showNotification(4, 'top', 'center', error.message);
    });
  }

  loadDataLineOpSe() {
    this.logsService.GetAllProcess(1).subscribe(value => {

      value.sort(function (a, b) {
        if (a.nmonth > b.nmonth) {
          return 1;
        }
        if (a.nmonth < b.nmonth) {
          return -1;
        }
        return 0;
      });

      value.forEach(element => {
        this.dataSe.push(element.process);
      });
      this.loadDataLineOpIn();
    }, error => {
      this.showNotification(4, 'top', 'center', error.message);
    });
  }

  loadDataLineOpIn() {
    this.logsService.GetAllProcess(2).subscribe(value => {

      value.sort(function (a, b) {
        if (a.nmonth > b.nmonth) {
          return 1;
        }
        if (a.nmonth < b.nmonth) {
          return -1;
        }
        return 0;
      });

      value.forEach(element => {
        this.dataIn.push(element.process);
      });
      this.loadDataLineOpUp();
    }, error => {
      this.showNotification(4, 'top', 'center', error.message);
    });
  }

  loadDataLineOpUp() {
    this.logsService.GetAllProcess(3).subscribe(value => {

      value.sort(function (a, b) {
        if (a.nmonth > b.nmonth) {
          return 1;
        }
        if (a.nmonth < b.nmonth) {
          return -1;
        }
        return 0;
      });

      value.forEach(element => {
        this.dataUp.push(element.process);
      });
      this.loadDataLineOpDe()
    }, error => {
      this.showNotification(4, 'top', 'center', error.message);
    });
  }

  loadDataLineOpDe() {
    this.logsService.GetAllProcess(3).subscribe(value => {

      value.sort(function (a, b) {
        if (a.nmonth > b.nmonth) {
          return 1;
        }
        if (a.nmonth < b.nmonth) {
          return -1;
        }
        return 0;
      });

      value.forEach(element => {
        this.dataDe.push(element.process);
      });
      this.loadGraph1();
      this.loadGraph2();
    }, error => {
      this.showNotification(4, 'top', 'center', error.message);
    });
  }

  loadGraph1() {

    this.canvas = document.getElementById("chartHours");
    this.ctx = this.canvas.getContext("2d");

    this.chartHours = new Chart(this.ctx, {
      type: 'line',

      data: {
        labels: this.labels,
        datasets: [{
          borderColor: "#f17e5d",
          backgroundColor: "#f17e5d",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: this.dataIn
        }, {
          borderColor: "#fcc468",
          backgroundColor: "#fcc468",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: this.dataUp
        }, {
          borderColor: "#3f51b5",
          backgroundColor: "#3f51b5",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: this.dataDe
        }, {
          borderColor: "#6bd098",
          backgroundColor: "#6bd098",
          pointRadius: 0,
          pointHoverRadius: 0,
          borderWidth: 3,
          data: this.dataSe
        }
        ]
      },
      options: {
        legend: {
          display: false
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [{

            ticks: {
              fontColor: "#9f9f9f",
              beginAtZero: false,
              maxTicksLimit: 5,
              //padding: 20
            },
            gridLines: {
              drawBorder: false,
              zeroLineColor: "#ccc",
              color: 'rgba(255,255,255,0.05)'
            }

          }],

          xAxes: [{
            barPercentage: 1.6,
            gridLines: {
              drawBorder: false,
              color: 'rgba(255,255,255,0.1)',
              zeroLineColor: "transparent",
              display: false,
            },
            ticks: {
              padding: 20,
              fontColor: "#9f9f9f"
            }
          }]
        },
      }
    });
  }

  loadGraph2() {
    var speedCanvas = document.getElementById("speedChart");

    var dataFirst = {
      data: this.dataIn,
      fill: false,
      borderColor: '#fbc658',
      backgroundColor: 'transparent',
      pointBorderColor: '#fbc658',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    var dataSecond = {
      data: this.dataSe,
      fill: false,
      borderColor: '#51CACF',
      backgroundColor: 'transparent',
      pointBorderColor: '#51CACF',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };

    var speedData = {
      labels: this.labels,
      datasets: [dataFirst, dataSecond]
    };

    var chartOptions = {
      legend: {
        display: false,
        position: 'top'
      }
    };

    var lineChart = new Chart(speedCanvas, {
      type: 'line',
      hover: false,
      data: speedData,
      options: chartOptions
    });
  }

  showNotification(opc, from, align, text) {
    switch (opc) {
      case 1:
        this.toastr.info(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>' + text + '</b></span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-info alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 2:
        this.toastr.success(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>' + text + '</b></span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 3:
        this.toastr.warning(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>' + text + '</b></span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 4:
        this.toastr.error(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>' + text + '</b></span>',
          "",
          {
            timeOut: 4000,
            enableHtml: true,
            closeButton: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      case 5:
        this.toastr.show(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>' + text + '</b></span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-primary alert-with-icon",
            positionClass: "toast-" + from + "-" + align
          }
        );
        break;
      default:
        break;
    }
  }

}
