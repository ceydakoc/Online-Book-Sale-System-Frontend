import { Component, OnInit } from '@angular/core';
import { ProductModelServer, ServerResponse, DatabaseProductModel } from 'src/app/model/product.model';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})


export class AdminProductComponent implements OnInit {
  willDeleteId: Number;
  willEditId: Number;
  products: ProductModelServer[] = [];
  p: number = 1;
  searchText: string;
  keysToInclude: any[] = ["id", "title", "description", "quantity", "price", "short_desc", "cat_id"];
  selectedOption: string = "all"
  categories: any[] = [];
  prodId: Number = null;
  prodTitle: string = "";
  prodImage: string = "";
  prodImages: string = null;
  prodDescription: string = "";
  prodPrice: Number = null;
  prodQuantity: Number = null;
  prodShortDesc: string = "";
  prodCategory: Number = null;
  newProduct: DatabaseProductModel;

  constructor(private productService: ProductService,
    private toast: ToastrService,
    private categoryService: CategoryService) {

    this.categoryService.getAllCategories().subscribe(returnVal => {
      if (returnVal.success) {
        this.categories = returnVal.categories;
        for (let index = 0; index < this.categories.length; index++) {
          this.categories[index].showValue = this.categories[index].id + " - " + this.categories[index].title;

        }
        console.log(this.categories);
      }
    });

  }
  ngOnInit(): void {
    this.getProducts();
  }

  deleteProduct() {
    this.productService.deleteProductAdmin(this.willDeleteId).subscribe(returnVal => {
      if (returnVal.success) {
        this.toast.success(`Successfully deleted from products.`, "", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
        this.getProducts();
      }
      else {
        this.toast.error(`Something went wrong :( Could not deleted from products`, "", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    })
  }

  addProduct() {

    if (this.prodTitle != "" && this.prodImage != "" && this.prodDescription != "" && (this.prodPrice >= 0 && this.prodPrice != null) &&
      (this.prodQuantity >= 0 && this.prodQuantity != null) && this.prodShortDesc != "" && this.prodCategory != null) {
      if (this.prodImages == "") {
        this.prodImages = null;
      }
      this.newProduct = {
        id: null, title: this.prodTitle, image: this.prodImage, images: this.prodImages, description: this.prodDescription, price: this.prodPrice,
        quantity: this.prodQuantity, short_desc: this.prodShortDesc, cat_id: this.prodCategory
      };
      this.productService.addProductAdmin(this.newProduct).subscribe(returnVal => {
        //@ts-ignore
        if (returnVal.success) {
          //@ts-ignore
          this.toast.success(`Product successfully added as id: ` + returnVal.newId, "", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          this.getProducts();
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

  editProduct() {
    if (this.prodTitle != "" && this.prodImage != "" && this.prodDescription != "" && (this.prodPrice >= 0 && this.prodPrice != null) &&
      (this.prodQuantity >= 0 && this.prodQuantity != null) && this.prodShortDesc != "" && this.prodCategory != null) {
      if (this.prodImages == "") {
        this.prodImages = null;
      }
      this.newProduct = {
        id: this.willEditId, title: this.prodTitle, image: this.prodImage, images: this.prodImages, description: this.prodDescription, price: this.prodPrice,
        quantity: this.prodQuantity, short_desc: this.prodShortDesc, cat_id: this.prodCategory
      };
      this.productService.updateProductAdmin(this.newProduct).subscribe(returnVal => {
        //@ts-ignore
        if (returnVal.success) {
          //@ts-ignore
          this.toast.success(`Product successfully updated.`, "", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          this.getProducts();
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

  getDeleteProductId(prodId: Number) {
    this.willDeleteId = prodId;
  }

  getEditProductId(prodId: Number) {
    this.willEditId = prodId;

    this.productService.getSingleProductAdmin(this.willEditId).subscribe(returnVal => {
      //@ts-ignore
      if (returnVal.success) {
        //@ts-ignore
        this.newProduct = returnVal.prod;
        this.prodId = this.newProduct.id;
        this.prodTitle = this.newProduct.title;
        this.prodImage = this.newProduct.image;
        this.prodImages = this.newProduct.images;
        this.prodDescription = this.newProduct.description;
        this.prodPrice = this.newProduct.price;
        this.prodQuantity = this.newProduct.quantity;
        this.prodShortDesc = this.newProduct.short_desc;
        this.prodCategory = this.newProduct.cat_id;
      }
    });
  }

  getProducts() {
    this.products.length = 0;
    this.productService.getAllProductsAdmin().subscribe((prods: ServerResponse) => {
      this.products = prods.products;
      //console.log(this.products)
    });
  }

  filterBy() {

    this.keysToInclude.length = 0;
    if (this.selectedOption !== "all") {
      this.keysToInclude.push(this.selectedOption)
    }
    else {
      this.keysToInclude.push("id", "title", "description", "quantity", "price", "short_desc", "cat_id");
    }
  }

}
