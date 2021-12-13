import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  history: Observable<History[]>;
  constructor(private getDataservice: GetDataService) { }

  ngOnInit() {
    this.history = this.getDataservice.getPendingOrder(localStorage.getItem('username'));
 
  }

}
