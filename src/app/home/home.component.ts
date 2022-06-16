import { Component, HostListener, OnInit } from '@angular/core';
import { ApisService } from "../shared/services/apis.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: any;
  seacrh: string;
  number: number = 0;
  publicEvents = [];
  publicGifts = [];
  privateEvents = [];
  viewedEvents: any;
  publicCartegories = [];
  content: boolean = false;
  arrows: boolean;
  index: number = 0;
  dropdown: boolean = false;
  categories: number;
  categoryName: string = "All";
  constructor(private api: ApisService) {
  }

  ngOnInit(): void {
    this.getGiftList();
    this.getEventsTypes();
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: any) {
    if (event?.path[0].type !== 'submit') this.dropdown = false;
  }

  getCategories(id: number, name: string) {
    this.categories = id;
    this.categoryName = name;
  }

  filter() {
    let queryObj = {};
    if (this.categories) queryObj['category_id'] = this.categories;
    if (this.seacrh) queryObj['key'] = this.seacrh;
    this.api.GET('api/v1/home', queryObj).subscribe((res: any) => {
      if (res.body.success === true) {
        this.data = res.body.data
        this.publicEvents = this.data?.events?.filter(res => res.type === 'public');
        this.viewedEvents = this.publicEvents?.map(res => res.gifts)[0];
      };
    });
  }

  getGiftList() {
    this.api.GET('api/v1/home').subscribe((res: any) => {
      if (res.body.success === true) {
        this.data = res.body.data
        this.getEventsTypes();
        this.viewedEvents = this.publicGifts;
        this.publicCartegories = [...new Set(this.data.categories?.map(res => { return res.name.toLowerCase() }))];
      };
    });
  }

  scroll(type: string) {
    this.index = type === 'bottom' ? this.index + 1 : this.index - 1
    const completed = document.getElementById('completed' + this.index);
    if (this.index >= 0 && completed) {
      completed.scrollIntoView({
        behavior: 'smooth'
      });
    }
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
    if (name === 'all') { this.viewedEvents = this.publicGifts } else {
      this.viewedEvents = this.publicEvents.filter(res => res.category.name === name).map(res => res.gifts)[0];
    }
    return false
  }

  showArrows(event: string) {
    event === 'show' ? this.arrows = true : setTimeout(() => this.arrows = false, 200);
  }
}
