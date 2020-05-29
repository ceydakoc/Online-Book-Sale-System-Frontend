import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.scss']
})
export class AdminContactComponent implements OnInit {

  constructor(private contactService: ContactService) { }
  p: number = 1;
  searchText: string;
  keysToInclude: any[] = ["isRead","id", "date", "name", "email", "subject", "message"];
  selectedOption: string = "all"
  messages: any[] = []

  id : string;
  date : string;
  name : string;
  email : string;
  subject : string;
  message : string;

  ngOnInit(): void {
    this.getMessages()
  }

  getMessages() {
    this.contactService.getAllMessages().subscribe((retVal => {
      this.messages = retVal.messages;
      for (let index = 0; index < this.messages.length; index++) {
        this.messages[index].date = this.messages[index].date.replace('T', ' ');
        this.messages[index].date = this.messages[index].date.substring(0, 16);
      }
    }))
  }

  updateIsRead(messageId:number,isRead:boolean){
    this.contactService.updateMessage(messageId,isRead).subscribe(retVal => {
      this.getMessages();
    })
  }

  showMessageDetail(message:any) {
    console.log(message)
    this.updateIsRead(message.id,true)
    this.id = message.id;
    this.name = message.name;
    this.email = message.email;
    this.subject = message.subject;
    this.message = message.message;
    this.date = message.date
    console.log(this.messages)
  }

  getSingleMessage(messageId:number){
    this.contactService.getSingleMessage(messageId).subscribe((returnVal : any) => {
      if(returnVal.success){
        this.id = returnVal.id;
        this.name = returnVal.name;
        this.email = returnVal.email;
        this.subject = returnVal.subject;
        this.messages = returnVal.message;
        this.date = returnVal.date
      }
    });
  }

  filterBy() {

    this.keysToInclude.length = 0;
    if (this.selectedOption !== "all") {
      this.keysToInclude.push(this.selectedOption)
    }
    else {
      this.keysToInclude.push("isRead" ,"id", "date", "name", "email", "subject", "message");
    }
  }
}
