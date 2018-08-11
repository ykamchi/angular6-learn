import { Component, Input, Output, forwardRef,ViewEncapsulation, OnInit, EventEmitter} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-number-selection',
  templateUrl: './number-selection.component.html',
  styleUrls: ['./number-selection.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumberSelectionComponent),
    multi: true
  }]
})

export class NumberSelectionComponent implements ControlValueAccessor, OnInit {
  @Input() label = "selection";
  @Input() optional_values: any;
  @Input() container_size: string;
  @Input() height: string;
  @Input() show_value: boolean = false;
  columns_class: any = {
       "small": "col-12 col-sm-5 col-md-3 col-lg-2",
       "medium": "col-2 col-sm-2 col-md-2 col-lg-2",
       "large": "col-1 col-sm-1 col-md-1 col-lg-1"
  }
  
  @Output() valuechange = new EventEmitter(); // add this
  
  constructor() {
    if (!this.container_size) this.container_size = "small";
    if (!this.height) this.height = "230px";
  }
  
  private local_val: number = -1;

  selectionChanged(newVal) {
    console.log("** selectionChanged");
    this.val = newVal;
    this.onChange(this.val);
    this.valuechange.emit(event);    
  }

  
  public set val(v : number) {
    console.log("** set");
    this.local_val = v;
    //this.valuechange.emit(event);
  }
  
  
  public get val() : number {
    //console.log("** get");
    return this.local_val;
  }
  
  ngOnInit() {

    console.log("xxxx" + this.container_size);

  }
  /**
   * Invoked when the model has been changed
   */
  onChange: (_: any) => void = (_: any) => {
    console.log("** onChange");
  };

  /**
   * Invoked when the model has been touched
   */
  onTouched: () => void = () => {
    console.log("** onTouched");
  };
  
  /**
   * Method that is invoked on an update of a model.
   */
  updateChanges() {
    console.log("** updateChanges");
    this.onChange(this.val);
    this.valuechange.emit(event);    
  }

  ///////////////
  // OVERRIDES //
  ///////////////

  /**
   * Writes a new item to the element.
   * @param value the value
   */
  writeValue(value: number): void {
    console.log("** writeValue"); 
    this.val = value;
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

}
