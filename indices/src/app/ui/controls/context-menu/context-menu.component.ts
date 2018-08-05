import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contextmenu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextmenuComponent {
  @Input() x=0;
  @Input() y=0;

  constructor() { }

  ngOnInit() {
  }

}
