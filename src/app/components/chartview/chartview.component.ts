import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { chartData } from 'src/app/datasource'; 
@Component({
  selector: 'app-chartview',
  template:
`<ejs-stockchart id="chart-container"
[title]='title'>
    <e-stockchart-series-collection>
        <e-stockchart-series [dataSource]='stockchartData' type='Candle' xName='date' High='high' Low='low' Open='open' Close ='close' Name='Apple'></e-stockchart-series>
    </e-stockchart-series-collection>

</ejs-stockchart>`
})
export class ChartviewComponent implements OnInit {
  public stockchartData: Object[];
  constructor() { }
  public title: string;
ngOnInit(): void {
    // Title for chart
    this.title = 'Stock Price';
    this.stockchartData = chartData;
}

}