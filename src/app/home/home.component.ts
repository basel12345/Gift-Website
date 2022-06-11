import { Component, OnInit } from '@angular/core';
import {ApisService} from "../shared/services/apis.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
data: any;
  constructor(private api: ApisService) {
  }

  ngOnInit(): void {
    this.getGiftList();
    console.log(this.data, 'init')
  }
  getGiftList() {
    this.api.GET('api/v1/home').subscribe((res: any) => {
      console.log("response", res.body);
      if (res.body.success === true){
      this.data = res.body.data
      console.log('a')
      }
    });
  }
}
