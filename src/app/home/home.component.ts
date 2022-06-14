import { Component, OnInit } from '@angular/core';
import {ApisService} from "../shared/services/apis.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
data: any;
publicEvents = [];
privateEvents = [];
viewedEvents = [];
publicCartegories = [];
  constructor(private api: ApisService) {
  }

  ngOnInit(): void {
    this.getGiftList();
    this.getEventsTypes();
  }
  getGiftList() {
    this.api.GET('api/v1/home').subscribe((res: any) => {
      if (res.body.success === true){
      this.data = res.body.data;
     this.viewedEvents = this.data.events;
     this.getEventsTypes();
     this.publicCartegories = [...new Set( this.publicEvents?.map(res => {return res.category.name}))];
      }
    });
  }
  getEventsTypes(): any{
    this.publicEvents = this.data?.events?.filter(res => res.type === 'public');
    this.privateEvents = this.data?.events?.filter(res => res.type === 'private')
  }

  getEventsViewed(name: string) {
   this.viewedEvents = this.publicEvents.filter( res => res.category.name === name)
    console.log(this.viewedEvents, 'view')
    return false
  }
}
