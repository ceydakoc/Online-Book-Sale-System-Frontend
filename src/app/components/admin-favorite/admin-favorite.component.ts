import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-admin-favorite',
  templateUrl: './admin-favorite.component.html',
  styleUrls: ['./admin-favorite.component.scss']
})
export class AdminFavoriteComponent implements OnInit {
  p: number = 1;
  searchText: string;
  favorites : any[] = []
  sortOptions: string[] = ["Count: Low to High", "Count: High to Low"];
  keysToInclude: any[] = ["product_id", "short_desc"];
  sortText : string[] = ["count", "count"]
  selectedOption: number = -1;
  isReverse: boolean = false;

  constructor(private favoriteService : FavoriteService,
    private orderPipe: OrderPipe) {
    this.favoriteService.getFavoriteStatistic().subscribe(returnVal => {
      this.favorites = returnVal
      console.log(this.favorites)
    })
   }

  ngOnInit(): void {

  }

  sortBy(){
    if (this.selectedOption == 1 || this.selectedOption == 3){
      this.isReverse = true;
    }
    else{
      this.isReverse = false;
    }

    this.favorites = this.orderPipe.transform(this.favorites, this.sortText[this.selectedOption], this.isReverse);
  }

}
