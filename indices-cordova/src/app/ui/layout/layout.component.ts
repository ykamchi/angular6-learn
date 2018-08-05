import { Component, OnInit   } from '@angular/core';
import { WindowRefService } from '../../services/Window-ref.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  innerHeight: number;
  innerWidth: number;
  constructor(private winRef: WindowRefService) { 
    this.innerWidth = winRef.nativeWindow.innerWidth;
    this.innerHeight = winRef.nativeWindow.innerHeight-110;
  }

  ngOnInit() {
  }

  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    this.innerHeight = event.target.innerHeight-110;
  } 
}
