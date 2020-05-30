import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  EXCHANGE_URL = environment.EXCHANGE_URL;

  constructor(private http: HttpClient) { }

  getAllExchangeRate() : Observable<any> {
    return this.http.get<any>(this.EXCHANGE_URL);
  }
}
