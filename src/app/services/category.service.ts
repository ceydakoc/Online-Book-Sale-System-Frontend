import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatabaseCategoryModel } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  getAllCategories() : Observable<any> {
    return this.http.get<any>(this.SERVER_URL + 'category/')
  }

  deleteCategory(id: Number):  Observable<any> {
    return this.http.delete<any>(this.SERVER_URL + 'category/delete/' + id);
  }

  updateCategory(toEditCategory: DatabaseCategoryModel) {
    return this.http.put(`${this.SERVER_URL}category/update/`, {
      id: toEditCategory.id,
      title: toEditCategory.title
    });
  }

  addCategory(toAddCategory: DatabaseCategoryModel) {
    return this.http.post(`${this.SERVER_URL}category/new/`, {
      title: toAddCategory.title
    });
  }

  getSingleCategory(id: Number): Observable<DatabaseCategoryModel> {
    return this.http.get<DatabaseCategoryModel>(this.SERVER_URL + 'category/getSingle/' + id);
  }

}
