import { Component, OnInit } from '@angular/core';
import { RatingService } from 'src/app/services/rating.service';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-admin-rating',
  templateUrl: './admin-rating.component.html',
  styleUrls: ['./admin-rating.component.scss']
})
export class AdminRatingComponent implements OnInit {
  p: number = 1;
  searchText: string;
  ratings : any[] = []
  sortOptions: string[] = ["Review: Low to High","Review: High to Low","Average: Low to High", "Average: High to Low"];
  keysToInclude: any[] = ["product_id", "short_desc"];
  sortText : string[] = ["count", "count", "average", "average"]
  selectedOption: number = -1;
  isReverse: boolean = false;

  constructor(private ratingService : RatingService,
    private orderPipe : OrderPipe) { }

  ngOnInit(): void {
    this.ratingService.getRatingStatistic().subscribe(returnVal => {
      this.ratings = returnVal
      for (let index = 0; index < this.ratings.length; index++) {
        if(this.ratings[index].average == null){
          this.ratings[index].average = 0
        }
        
      }
    })
  }
  sortBy(){
    if (this.selectedOption == 1 || this.selectedOption == 3){
      this.isReverse = true;
    }
    else{
      this.isReverse = false;
    }

    this.ratings = this.orderPipe.transform(this.ratings, this.sortText[this.selectedOption], this.isReverse);
  }
}
