import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-top-selling',
  templateUrl: './admin-top-selling.component.html',
  styleUrls: ['./admin-top-selling.component.scss']
})
export class AdminTopSellingComponent implements OnInit {

  selectedOption: number = 0;
  topSelling: any[] = [];


  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public colorsChart :any = [{ backgroundColor: [] }];
    

  constructor(private productService: ProductService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

    this.getTopSelling();
   }

  ngOnInit(): void {
  }



  getTopSelling(){
    this.topSelling.length = 0;
    this.productService.getTopSelling().subscribe(returnVal => {
      var tempLength;
      if(this.selectedOption == 0){
        tempLength = returnVal.length;
      }
      else {
        tempLength = this.selectedOption;
      }
      for (var i = 0; i < tempLength; i++) {
        if(returnVal[i].sum != null ){
          this.topSelling.push(returnVal[i]);
        }
      }    
      this.drawPie();
    });
  }

  drawPie() {
    this.pieChartLabels.length = 0;
    this.pieChartData.length = 0;
    this.colorsChart[0].backgroundColor.length = 0;

    for (var i = 0; i < this.topSelling.length; i++) {
      this.pieChartLabels.push(this.topSelling[i].title);
      this.pieChartData.push(this.topSelling[i].sum);
      this.colorsChart[0].backgroundColor.push(this.getRandomColor());
    }

    console.log(this.pieChartLabels);
    console.log(this.pieChartData);
  }

  numberOfTopSelling(){
    this.getTopSelling();
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
