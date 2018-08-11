import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { IndicesService } from '../../../services/indices.service';
import { Location } from '@angular/common';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-chartindex',
  templateUrl: './chartindex.component.html',
  styleUrls: ['./chartindex.component.css']
})
export class ChartIndexComponent implements OnInit {
  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;
  chart = [];
  index_id: String;
  index_caption: String;
  index_emoji: String;

  
  
  constructor(private indicesService : IndicesService, private route: ActivatedRoute, private location: Location) { 
    this.route.queryParams.subscribe((params: any) => {
      console.log("aaaaaaaaaaaaaaa" + params.index_type);
      this.index_id = params.index_id;
      this.index_caption = params.index_caption;
      this.index_emoji = params.index_emoji;
      
      
    });
  }

  ngOnInit() {
    console.log(this.myCanvas);
    var data1 = [];
    var labels = [];
    
    this.indicesService.getIndices(this.index_id).subscribe((data: any []) => {
      
      if (data && data.length > 0) {
        let tmp = [];
        console.log(data);
        data.forEach(index => {
          console.log(index.date);
          if (index.day_parts && index.day_parts.length > 0) {
            index.day_parts.sort(function(a, b){return a.value-b.value}).reverse().forEach(part => {
              var myRegexp = /(\d*):(\d*)/g;
              var match = myRegexp.exec(part.part);
              let date_time = new Date(index.date).setHours(parseInt(match[1]),parseInt(match[2]),0,0);
              tmp.push({label: date_time, data: part.value});
            });
          }
        });
        tmp.sort((a, b) => { return a.label-b.label}).forEach(element => {
          data1.push(element.data);
          labels.push(element.label);
          
        });
      } else {
        console.log("No data found");
      }
       
        this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
        this.chart = new Chart(this.context, {
          type: 'line',
              data: {
                labels: labels,
                datasets: [
                  { 
                    label: "Series-1",
                    data: data1,
                    borderColor: "greenyellow",
                    fill: false
                  }
                ]
              },
              options: {
                legend: {
                  display: true
                },
                spanGaps: true,
                scales: {
                  xAxes: [{
                    type: "time",
                    display: true,
                    time: {
                      displayFormats: {
                        max: 'YYYY',
                        min: 'MMM YY',
                        'millisecond': 'SSS [ms]',
                        'second': 'h:mm:ss a', // 11:20:01 AM
                        'minute': 'h:mm:ss a', // 11:20:01 AM
                        'hour': 'MMM D, hA', // Sept 4, 5PM
                        'day': 'MMM Do', // Sep 4 2015
                        'week': 'll', // Week 46, or maybe "[W]WW - YYYY" ?
                        'month': 'MMM YYYY', // Sept 2015
                        'quarter': '[Q]Q - YYYY', // Q3
                        'year': 'YYYY', // 2015
                    },
                      tooltipFormat: 'll'
                    },
                    scaleLabel: {
                      display:     true,
                      labelString: 'Date'
                    }
                  }],
                  yAxes: [{
                    display: true,
                    labelString: 'value'
                  }],
                }
              }
        });

      });
  }
    
  goBack(): void {
    this.location.back();
  }
}
