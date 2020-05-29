import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { contactModel } from '../model/contact.model';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  getAllMessages(): Observable<any> {
    return this.http.get<any>(this.SERVER_URL + 'contact/');
  }
  addNewMessages(newMessage : contactModel) {
    return this.http.post(`${this.SERVER_URL}contact/new`, {
      name: newMessage.name,
      email: newMessage.email,
      subject : newMessage.subject,
      message : newMessage.message
    });
  }

  updateMessage(id:Number,isRead :boolean){
    return this.http.put(`${this.SERVER_URL}contact/update/`, {
      id:id,
      isRead : isRead
    });
  }

  getSingleMessage(messageId : number) : Observable <any>{
    return this.http.get<any>(this.SERVER_URL + 'contact/getSingle/' + messageId);
  }

}
