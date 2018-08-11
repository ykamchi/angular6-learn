import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
  
})
export class HeaderComponent implements OnInit {
  
  constructor(private router: Router, private authenticationService: AuthService) { 
  
  }
  
  public get username() : string {

    return "Indices Tracking" + (localStorage.getItem("currentuser") ? " (" + localStorage.getItem("currentuser") + ")" : "");
    
  }
  
  ngOnInit() {
  }

  logout() {
    console.log("logout");
    this.authenticationService.logout();
    this.router.navigate(["login"]);
  }
}
