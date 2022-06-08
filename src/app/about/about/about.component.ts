import { ApisService } from './../../shared/services/apis.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor(private api: ApisService) {}

  ngOnInit(): void {
    this.getAboutUsList();
  }

  getAboutUsList() {
    this.api.GET('api/v1/about-us').subscribe((res) => {
      console.log("response", res);
    });
  }
}
