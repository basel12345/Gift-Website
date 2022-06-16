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
  publicGifts = [];
  privateEvents = [];
  viewedEvents: any;
  publicCartegories = [];
  content: boolean = false;
  arrows:boolean;
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
        this.getEventsTypes();
        this.viewedEvents = this.publicGifts;
        console.log(this.viewedEvents, 'kkk')
        this.publicCartegories = [...new Set(this.data.categories?.map(res => { return res.name.toLowerCase() }))];
        console.log(this.publicEvents)
      };
    });
  }

  scroll(type: string) {
      const completed = document.getElementById('completed');
      completed.scroll({
        top: type === 'bottom' ? completed.scrollHeight : 0,
        left: 0,
        behavior: 'smooth'
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
    this.publicEvents = this.data?.events?.filter(res => res.type === 'public' && res.gifts.length !== 0);
    this.privateEvents = this.data?.events?.filter(res => res.type === 'private');
     this.publicEvents?.map(res => this.publicGifts = [...res.gifts]);
  }

  getEventsViewed(name: string) {
    let filteredEvents ;
    let filteredGifts;
    if (name === 'all') { this.viewedEvents = this.publicGifts }   else {
      filteredEvents = this.publicEvents.filter(res => res.category.name === name)
      filteredEvents.map(res => {
        filteredGifts = [...res.gifts]
      })
      this.viewedEvents = filteredGifts
    }
    return false
  }

  showArrows(event: string) {
    event === 'show' ? this.arrows = true :  setTimeout(() => this.arrows = false, 200);
  }
}
