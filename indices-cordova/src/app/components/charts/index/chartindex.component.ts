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
      if (params.index_id) {
        this.index_id = params.index_id;
        this.index_caption = params.index_caption;
        this.index_emoji = params.index_emoji;
      }  else {
        this.index_id = "all";
      }
    });
  }

  getPartDateTime(date, part) {
    var myRegexp = /(\d*):(\d*)/g;
    var match = myRegexp.exec(part.part);
    return new Date(date).setHours(parseInt(match[1]),parseInt(match[2]),0,0);
  }

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  ngOnInit() {
    var data1 = [];
    var labels = [];
    
    var graph_data = [];

    this.indicesService.getIndices(this.index_id).subscribe((data: any []) => {
      console.log(this.getRandomColor());
      console.log(data);
      if (data && data.length > 0) {
        data.forEach(index_type => {
          console.log("index_type: " + index_type);
          let tmp = [];
          index_type.index_values.forEach(index => {
            console.log("index: " + index);
            if (index.day_parts && index.day_parts.length > 0) {
              index.day_parts.sort(function(a, b){return a.part-b.part}).reverse().forEach(part => {
                console.log("==>" + this.getPartDateTime(index.date, part) + ":"+part.value);
                tmp.push({label: this.getPartDateTime(index.date, part), data: part.value});
              });
            }
          });
          let d = [];
          let l = [];
          tmp.sort((a, b) => { return a.label-b.label}).forEach(element => {
            d.push({ "x" : element.label, "y": element.data});
            
          });
          graph_data.push(
            { 
              label: index_type.caption, 
              data: d, 
              labels: l, 
              borderColor: this.getRandomColor(),
              backgroundColor: '#FFFFFF00',
              cubicInterpolationMode: 'monotone',
              spanGaps: false

            }
          );
          
        });
      } else {
        console.log("No data found");
      }
       
        this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
        this.chart = new Chart(this.context, {
          type: 'line',
              data: {
                datasets: graph_data
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
                        //max: 'YYYY',
                        //min: 'MMM YY',
                        //'millisecond': 'SSS [ms]',
                        //'second': 'h:mm:ss a', // 11:20:01 AM
                        //'minute': 'h:mm:ss a', // 11:20:01 AM
                        //'hour': 'MMM D, hA', // Sept 4, 5PM
                        'day': 'MMM Do', // Sep 4 2015
                        //'week': 'll', // Week 46, or maybe "[W]WW - YYYY" ?
                        //'month': 'MMM YYYY', // Sept 2015
                        //'quarter': '[Q]Q - YYYY', // Q3
                        //'year': 'YYYY', // 2015
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
