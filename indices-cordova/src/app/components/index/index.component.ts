import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, NavigationExtras} from '@angular/router';
import { IndicesService } from '../../services/indices.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
  
})
export class IndexComponent {
  index_type: any = {};
  day_parts: any = [];
  //day_parts_values: any = []; 
  
  optional_values: any = [];
  _current_date: Date;
  test: Date;
  index: any = {};
  

  constructor(private route: ActivatedRoute ,private indicesService : IndicesService, private router: Router, private location: Location) { 
    this.route.queryParams.subscribe((params: any) => {
      this.index_type = params;
    });
    this.current_date = new Date();
    
    
    if (this.index_type.type === 'number') {
      let x = parseFloat(this.index_type.from); 
      while (x <= parseFloat(this.index_type.to)) {
        this.optional_values.push({'name' : x, 'value': x});
        x += parseFloat(this.index_type.step);

      }
    }  
  } 
  
  public set current_date(v : Date) {
    this._current_date = v;
    this.get_index();
  }
  
  public get current_date() : Date {
    return this._current_date;
  }

  swipe(e: TouchEvent, days) {
    let tmp = new Date(this.current_date);
    tmp.setDate( this.current_date.getDate() + days );
    let today = new Date();
    if (tmp <= today) {
      this.current_date = tmp;
      this.get_index();
    }
  }
  
  open_chart() {
    let navigationExtras: NavigationExtras = { 
            queryParams: { 
              index_id: this.index_type._id, 
              index_caption: this.index_type.caption,
              index_emoji: this.index_type.emoji
            } 
          };
    this.router.navigate(["chartindex"], navigationExtras);
  }

  save_index() {
    
    this.indicesService.saveIndex(this.index).subscribe(data => {
  
      this.day_parts.forEach(day_part => {
        console.log(day_part.part + " = " + day_part.value);
      });
      
      this.get_index();
    });
  }

  goBack(): void {
    this.location.back();
  }

  get_index() {
    this.indicesService.getIndex(this.index_type._id, this.current_date).subscribe((data: any []) => {
      console.log(data);
      if (data.length == 1) {
        this.index = data[0];

      } else if (data.length == 0) { 
        console.log("created new: "+this.index);
        this.index = {
          date: this.current_date,
          index_type_id: this.index_type._id,
          tracking: this.index_type.tracking
        };
        if (this.index_type.tracking === 'day-parts') {
          this.index.day_parts = [];
          this.index_type.day_parts.forEach(dp => {
            this.index.day_parts.push({part: dp, value: null});
          });
        } 
      } else {
        console.log("Error: should not get more than one index for {type=t, date:d}");
      }
    });

  }
}
