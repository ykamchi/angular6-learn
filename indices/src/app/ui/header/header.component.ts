import { Component, OnInit } from '@angular/core';
import { RouterLink,RouterOutlet, RouterLinkWithHref } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
  
})
export class HeaderComponent implements OnInit {
  
  constructor() { 
  
  }
  
  public get username() : string {

    return "Indices Tracking" + (localStorage.getItem("currentuser") ? " (" + localStorage.getItem("currentuser") + ")" : "");
    
  }
  
  ngOnInit() {
  }

}
