import { Component, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { DatabaseCategoryModel } from 'src/app/model/category.model';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})

export class AdminCategoryComponent implements OnInit {
  willDeleteId: Number;
  willEditId: Number;
  categories: DatabaseCategoryModel[] = [];
  p: number = 1;
  searchText: string;
  keysToInclude: any[] = ["id", "title"];
  selectedOption: string = "all"
  catId: Number = null;
  catTitle: string = "";
  newCategory: DatabaseCategoryModel;

  constructor(private toast: ToastrService,
    private categoryService: CategoryService) {


  }
  ngOnInit(): void {
    this.getCategories();
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.willDeleteId).subscribe(returnVal => {
      if (returnVal.success) {
        this.toast.success(`Successfully deleted from categories.`, "", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
        this.getCategories();
      }
      else {
        this.toast.error(`Something went wrong :( Could not deleted from categories`, "", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    })
  }

  addCategory() {

    if (this.catTitle != "") {

      this.newCategory = {
        id: null, title: this.catTitle
      };
      this.categoryService.addCategory(this.newCategory).subscribe(returnVal => {
        //@ts-ignore
        if (returnVal.success) {
          //@ts-ignore
          this.toast.success(`Category successfully added as id: ` + returnVal.newId, "", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          this.getCategories();
        }
        else {
          this.toast.error(`Could not added.`, "", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      });
    }
    else {
      this.toast.error(`Please fill the required fields.`, "", {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }

  }

  editCategory() {
    if (this.catTitle != "" ) {

      this.newCategory = {
        id: this.willEditId, title: this.catTitle
      };
      this.categoryService.updateCategory(this.newCategory).subscribe(returnVal => {
        //@ts-ignore
        if (returnVal.success) {
          //@ts-ignore
          this.toast.success(`Category successfully updated.`, "", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          this.getCategories();
        }
        else {
          this.toast.error(`Could not updated.`, "", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      });
    }
    else {
      this.toast.error(`Please fill the required fields.`, "", {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }

  getDeleteCategoryId(catId: Number) {
    this.willDeleteId = catId;
  }

  getEditCategoryId(catId: Number) {
    this.willEditId = catId;

    this.categoryService.getSingleCategory(this.willEditId).subscribe(returnVal => {
      //@ts-ignore
      if (returnVal.success) {
        //@ts-ignore
        this.newCategory = returnVal.cat;
        this.catId = this.newCategory.id;
        this.catTitle = this.newCategory.title;
      }
    });
  }

  getCategories() {
    this.categories.length = 0;
    this.categoryService.getAllCategories().subscribe(returnVal => {
      if (returnVal.success) {
        this.categories = returnVal.categories;
      }
    });
  }

  filterBy() {

    this.keysToInclude.length = 0;
    if (this.selectedOption !== "all") {
      this.keysToInclude.push(this.selectedOption)
    }
    else {
      this.keysToInclude.push("id", "title");
    }
  }

}
