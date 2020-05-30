import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { contactModel } from 'src/app/model/contact.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private contactService : ContactService,
              private toast : ToastrService) { }
  name: string = "";
  email: string = "";
  subject: string = "";
  message: string = "";
  contactModel : contactModel = {
    name : "",
    email : "",
    subject : "",
    message : ""
  };
  ngOnInit(): void {

  }

  addNewMessage(){

    if(this.name != "" && this.email != "" && this.message != ""){

      this.contactModel.name = this.name;
      this.contactModel.email = this.email
      this.contactModel.subject = this.subject
      this.contactModel.message = this.message
      this.contactService.addNewMessages(this.contactModel).subscribe((retVal : any) => {

        if (retVal.success) {
          this.toast.success(`We have received your message. We will return to you as soon as possible..`, "", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
        else {
          this.toast.error(`Something went wrong :(`, "", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        }
      })
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

}
