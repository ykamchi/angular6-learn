import { Component, Input, Output, forwardRef,ViewEncapsulation, OnInit, EventEmitter, HostListener } from '@angular/core';
import {NG_VALUE_ACCESSOR} from "@angular/forms";


@Component({
  selector: 'app-time-selection',
  templateUrl: './time-selection.component.html',
  styleUrls: ['./time-selection.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimeSelectionComponent),
    multi: true
  }]
})
export class TimeSelectionComponent implements OnInit {
  @Input() label = "selection";
  @Output() valuechange = new EventEmitter(); // add this
  private minute: string;
  private hour: string;
  private initial_value: string;
  private mouse_click_position: {x: 0, y: 0};
  @HostListener('document:keydown', ['$event']) private handleKeydown(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.close(false);
    }
  }

  //private hours = ["00" ,"01", "02", "03", "04", "05" ,"06", "07", "08", "09", "10" ,"11", "12", "13", "14", "15" ,"16", "17", "18", "19", "20", "21", "22", "23"]
  private hours = [
              {name: "00",value:"00"},
              {name: "01",value:"01"},
              {name: "02",value:"02"},
              {name: "03",value:"03"},
              {name: "04",value:"04"},
              {name: "05",value:"05"},
              {name: "06",value:"06"},
              {name: "07",value:"07"},
              {name: "08",value:"08"},
              {name: "09",value:"09"},
              {name: "10",value:"10"},
              {name: "11",value:"11"},
              {name: "12",value:"12"},
              {name: "13",value:"13"},
              {name: "14",value:"14"},
              {name: "15",value:"15"},
              {name: "16",value:"16"},
              {name: "17",value:"17"},
              {name: "18",value:"18"},
              {name: "19",value:"19"},
              {name: "20",value:"20"},
              {name: "21",value:"21"},
              {name: "22",value:"22"},
              {name: "23",value:"23"},
            ]
  private minutes = [
              {name: "00", value: "00"}, 
              {name: "05", value: "05"}, 
              {name: "10", value: "10"}, 
              {name: "15", value: "15"}, 
              {name: "20", value: "20"}, 
              {name: "25", value: "25"}, 
              {name: "30", value: "30"},
              {name: "35", value: "35"},
              {name: "40", value: "40"},
              {name: "45", value: "45"},
              {name: "50", value: "50"},
              {name: "55", value: "55"}]
  private show: boolean=false;

  constructor() {
    
  }

  selectionChanged(newVal) {
    console.log("[time-selection] selectionChanged");
    this.val = newVal;
    //this.onChange(this.val);
    //this.valuechange.emit(event);    
  }
  /*
  private set show(v : boolean) {
    this.internal_show = v;
    console.log("SHOW SET: " + this.internal_show);
  }
  
  
  private get show() : boolean {
    console.log("SHOW GET: " + this.internal_show);
    return this.internal_show;
  }
  */
  close(ok) {
    console.log("[time-selection] close: " + ok);
    if (ok) {
      this.initial_value = this.val;
      this.onChange(this.val);
      this.valuechange.emit(event);
    } else {
      this.val = this.initial_value;
    }
    this.show = false;
  }

  toggle(e) {
    console.log("[time-selection] toggle: " + e.x + "," + e.y);
    this.mouse_click_position = {x: e.x, y: e.y};
    this.show = !this.show;
    
  }
     
  public get val() : string {
    console.log("[time-selection] get val: "+ this.hour + ":" + this.minute);
    return this.hour + ":" + this.minute
  
  }
   
  public set val(v : string) {
      console.log("[time-selection] set val: "+ v);
      if (v) {
        var myRegexp = /(\d*):(\d*)/g;
        var match = myRegexp.exec(v);
        if (match) {
          this.hour = match[1];
          this.minute = match[2];
        }
      }
  }
  ngOnInit() {

  }
  /**
   * Invoked when the model has been changed
   */
  onChange: (_: any) => void = (_: any) => {
    console.log("[time-selection] onChange");
  };

  /**
   * Invoked when the model has been touched
   */
  onTouched: () => void = () => {
    console.log("[time-selection] onTouched");
  };
  
  /**
   * Method that is invoked on an update of a model.
   */
  updateChanges() {
    console.log("[time-selection] updateChanges");
    //this.onChange(this.val);
    //this.valuechange.emit(event);    
  }

  ///////////////
  // OVERRIDES //
  ///////////////

  /**
   * Writes a new item to the element.
   * @param value the value
   */
  writeValue(value: string): void {
    console.log("[time-selection] writeValue"+value);
    this.val = value;
    this.initial_value = value;
    //this.onChange(this.val);
  }

  /**
   * Registers a callback function that should be called when the control's value changes in the UI.
   * @param fn
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function that should be called when the control receives a blur event.
   * @param fn
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  change_hour() {
    console.log("[time-selection] change_hour: " + this.val);
    //this.onChange(this.val);
    //this.valuechange.emit(event);
  }
  
  change_minute() {
    console.log("[time-selection] change_minute: " + this.val);
    //this.onChange(this.val);
    //this.valuechange.emit(event);
    //this.show = false;
  }
}
