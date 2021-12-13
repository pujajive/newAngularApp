import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authenticate.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService:AuthenticationService,
    private router:Router) { }

  ngOnInit() {
  }

  isLogedIn(){
    if(this.loginService.isUserLoggedIn()){
     let user =  localStorage.getItem('username');
     if(user === "abc@atyeti.com"){
       return false;
     }else{
      return true;
     }
     
    }
  }
}
