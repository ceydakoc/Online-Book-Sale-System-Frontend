import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-admin-log',
  templateUrl: './admin-log.component.html',
  styleUrls: ['./admin-log.component.scss']
})
export class AdminLogComponent implements OnInit {

  constructor(private logService: LogService) { }
  p: number = 1;
  searchText: string;
  keysToInclude: any[] = ["id", "date", "description", "type"];
  selectedOption: string = "all"
  logs: any[] = []

  ngOnInit(): void {
    this.getMessages()
  }

  getMessages() {
    this.logService.getAllLogs().subscribe((retVal => {
      this.logs = retVal.logs;
      for (let index = 0; index < this.logs.length; index++) {
        this.logs[index].date = this.logs[index].date.replace('T', ' ');
        this.logs[index].date = this.logs[index].date.substring(0, 16);
      }
    }))
  }

  filterBy() {

    this.keysToInclude.length = 0;
    if (this.selectedOption !== "all") {
      this.keysToInclude.push(this.selectedOption)
    }
    else {
      this.keysToInclude.push("id", "date", "description", "type");
    }
  }

}
