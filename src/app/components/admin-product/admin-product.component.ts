import { Component, OnInit } from '@angular/core';
import { ProductModelServer, ServerResponse } from 'src/app/model/product.model';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  willDeleteIndex : Number;
  products: ProductModelServer[] = [];
  p: number = 1;
  searchText: string;
  keysToInclude : any[] = ["id","title","description","quantity","price","short_desc","cat_id"];
  selectedOption : string = "all"
  constructor(private productService : ProductService){
    console.log(this.keysToInclude)
  }
  ngOnInit(): void {
    this.productService.getAllProductsAdmin().subscribe((prods: ServerResponse) => {
      this.products = prods.products;
      console.log(this.products)
    });
  }

  deleteProduct(){
    alert("deleted")
  }

  deleteHref(prodId : Number){
    alert(prodId)
  }
  filterBy(){

    this.keysToInclude.length = 0;
    if(this.selectedOption !== "all"){
      this.keysToInclude.push(this.selectedOption)
    }
    else{
      this.keysToInclude.push("id","title","description","quantity","price","short_desc","cat_id");
    }
  }


}
