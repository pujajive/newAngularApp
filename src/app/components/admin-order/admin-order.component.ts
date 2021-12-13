import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent implements OnInit {
  history: Observable<History[]>;
  constructor(private getDataservice: GetDataService ,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.history = this.getDataservice.getAdminHistory();
    
  }

  acceptOrder(index:number){
    
    this.getDataservice.approveOrder(index).subscribe(
      data =>{
      if(data.status==="Success"){
        alert("Pending Order Executed");
         this.reloadData();  }        
        else if(data.status=="insufficient balance")
          this.toastr.error("",'Insufficient balance in your account',{positionClass:"toast-bottom-center"});
      },
    )
  }

  rejectOrder(index:number){
    console.log(index);
    this.getDataservice.rejectOrder(index).subscribe(
      data =>{
        if(data.status === "Rejected"){
          alert("Pending Order Rejected");
         this.reloadData();  
        }
      }
    )
  }
}
