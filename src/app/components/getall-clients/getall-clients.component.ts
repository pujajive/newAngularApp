import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from 'src/app/client';
import { AuthenticationService } from 'src/app/services/authenticate.service';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-getall-clients',
  templateUrl: './getall-clients.component.html',
  styleUrls: ['./getall-clients.component.css']
})
export class GetallClientsComponent implements OnInit {

  client:Observable<Client[]>;
  constructor(private getDataservice: GetDataService,
    private loginService:AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.loadData()
  }

  loadData()
  {
    this.client=this.getDataservice.getAllclient();
  }

  gethistory(email)
  {
    this.router.navigate(['gethistory',email]);
  }

  goToAdmin()
  {
    this.router.navigate(['admin']);
  }

  isLogedIn(){
    if(this.loginService.isUserLoggedIn()){
     return true;
    }else{

      alert("Please login");
      this.router.navigate(['home']);
      return false;
    }
  }
  
}
