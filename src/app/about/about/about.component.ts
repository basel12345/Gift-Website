import { ApisService } from './../../shared/services/apis.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor(private api: ApisService) {}
  title: string;
  content: any;
  image: string;
  ngOnInit(): void {
    this.getAboutUsList();
  }

  getAboutUsList() {
    this.api.GET('api/v1/about-us').subscribe((res: any) => {
      console.log("response", res.body);
      this.title = res.body.data[0].title;
      this.content = res.body.data[0].content;
      this.image = res.body.data[0].image
    });
  }
}
