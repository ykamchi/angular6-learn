import { Component, OnInit   } from '@angular/core';
import { WindowRefService } from '../../services/Window-ref.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  
  constructor(private winRef: WindowRefService) { 
    
  }

  ngOnInit() {
  }
}
