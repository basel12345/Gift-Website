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
  constructor(private api: ApisService) {
  }

  ngOnInit(): void {
    this.getGiftList();
    console.log(this.data, 'init')
  }
  getGiftList() {
    this.api.GET('api/v1/home').subscribe((res: any) => {
      console.log("response", res.body);
      if (res.body.success === true) {
        this.data = res.body.data
        console.log(this.data)
      }
    });
  }

  slider(type: string) {
    if(type === 'next') {
      this.number += 1;
      if(this.data.slider.length === this.number) this.number = 0;
    } else {
      this.number -= 1;
      if(this.number === -1) this.number = this.data.slider.length - 1;
    };
  }
}
