import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  
  categories : any[] = [];

  constructor(private categoryService : CategoryService,
              private router : Router) { 
    this.getCategories();
  }

  ngOnInit(): void {

  }

  getCategories() {
    this.categories.length = 0;
    this.categoryService.getAllCategories().subscribe(returnVal => {
      if (returnVal.success) {
        this.categories = returnVal.categories;
      }
    });
  }
}
