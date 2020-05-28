import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ProductModelServer, ServerResponse, DatabaseProductModel } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  getAllProducts() : Observable<any> {
    return this.http.get<any>(this.SERVER_URL + 'products')
  }

  getAllProductsAdmin() : Observable<any> {
    return this.http.get<any>(this.SERVER_URL + 'products/admin/')
  }

  getSingleProduct(id: Number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(this.SERVER_URL + 'products/' + id);
  }

  getProductsFromCategory(catName: String): Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.SERVER_URL + 'products/category/' + catName);
  }

  deleteProductAdmin(id: Number):  Observable<any> {
    return this.http.delete<any>(this.SERVER_URL + 'products/adminDelete/' + id);
  }

  addProductAdmin(toAddProduct: DatabaseProductModel) {
    return this.http.post(`${this.SERVER_URL}products/adminNew/`, {
      title: toAddProduct.title,
      image: toAddProduct.image,
      images: toAddProduct.images,
      description: toAddProduct.description,
      price: toAddProduct.price,
      quantity: toAddProduct.quantity,
      short_desc: toAddProduct.short_desc,
      cat_id: toAddProduct.cat_id
    });
  }

  getSingleProductAdmin(id: Number): Observable<DatabaseProductModel> {
    return this.http.get<DatabaseProductModel>(this.SERVER_URL + 'products/adminGetSingle/' + id);
  }

  updateProductAdmin(toEditProduct: DatabaseProductModel) {
    return this.http.put(`${this.SERVER_URL}products/adminUpdate/` + toEditProduct.id, {
      title: toEditProduct.title,
      image: toEditProduct.image,
      images: toEditProduct.images,
      description: toEditProduct.description,
      price: toEditProduct.price,
      quantity: toEditProduct.quantity,
      short_desc: toEditProduct.short_desc,
      cat_id: toEditProduct.cat_id
    });
  }

  getTopSelling() :Observable <any> {
    return this.http.get<any>(this.SERVER_URL + 'products/topSelling');
  }
}


