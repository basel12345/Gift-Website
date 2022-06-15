import { Component, OnInit } from '@angular/core';
import { ApisService } from "../shared/services/apis.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: any;
  number: number = 0;
  publicEvents = [];
  privateEvents = [];
  viewedEvents = [];
  publicCartegories = [];
  content: boolean = false;
  constructor(private api: ApisService) {
  }

  ngOnInit(): void {
    this.getGiftList();
    this.getEventsTypes();
  }
  getGiftList() {
    this.api.GET('api/v1/home').subscribe((res: any) => {
      console.log("response", res.body);
      if (res.body.success === true) {
        this.data = res.body.data
        console.log(this.data)
        this.viewedEvents = this.data.events;
        this.getEventsTypes();
        this.publicCartegories = [...new Set(this.data.categories?.map(res => { return res.name.toLowerCase() }))];
      };
    });
  }

  slider(type: string) {
    this.content = true;
    if (type === 'next') {
      this.number += 1;
      if (this.data.slider.length === this.number) this.number = 0;
    } else {
      this.number -= 1;
      if (this.number === -1) this.number = this.data.slider.length - 1;
    };
    setTimeout(() => this.content = false, 700);
  }
  getEventsTypes(): any {
    this.publicEvents = this.data?.events?.filter(res => res.type === 'public');
    this.privateEvents = this.data?.events?.filter(res => res.type === 'private')
  }

  getEventsViewed(name: string) {
    name === 'all' ? this.viewedEvents = this.publicEvents : this.viewedEvents = this.publicEvents.filter(res => res.category.name === name)
    return false
  }
}
