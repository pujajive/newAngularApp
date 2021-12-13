import { Component, OnInit } from '@angular/core';
import { NewserviceService } from 'src/app/services/newservice.service';
@Component({
  selector: 'app-topheading',
  templateUrl: './topheading.component.html',
  styleUrls: ['./topheading.component.css']
})
export class TopheadingComponent implements OnInit {

  constructor(private _service:NewserviceService) { }


  topheaingDisplay:any=[];



  ngOnInit(): void {
    this._service.topHeading().subscribe((result)=>{
      console.log(result);
      this.topheaingDisplay = result.articles;
    } )
    }
  }

