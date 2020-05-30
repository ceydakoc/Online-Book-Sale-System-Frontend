import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  getAllLogs(): Observable<any> {
    return this.http.get<any>(this.SERVER_URL + 'log/');
  }
  addNewLog(newLog: any) {
    return this.http.post(`${this.SERVER_URL}log/new/`, {
      description: newLog.description,
      type: newLog.type
    });
  }

}
