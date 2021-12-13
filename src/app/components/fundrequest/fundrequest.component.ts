import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authenticate.service';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-fundrequest',
  templateUrl: './fundrequest.component.html',
  styleUrls: ['./fundrequest.component.css']
})
export class FundrequestComponent implements OnInit {
  admin: any

  constructor(private getDataservice: GetDataService,
    private loginService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.admin = this.getDataservice.getPendingFunds()
  }

  approvefund(sno: number) {

    this.getDataservice.approveFund(sno).subscribe(data =>
      {
        if(data.status ==='success'){
          this.loadData();
        }
      });
  }

  rejectfund(sno:number): void
  {
      this.getDataservice.rejectFund(sno).subscribe(data=>{
       // if(data.status ==='rejected')
      //  {
       //   this.loadData();
      //  }
      });
  }

  isLogedIn() {
    if (this.loginService.isUserLoggedIn()) {
      return true;
    } else {
      alert("Please login");
      this.router.navigate(['home']);
      return false;
    }
  }
}

