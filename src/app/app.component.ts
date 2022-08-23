import {Component, OnInit} from '@angular/core';
import {ApisService} from "./shared/services/apis.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'website';
  headerLinks = [];
  footerLinks = [];
  constructor(private api: ApisService) {
  }
  ngOnInit() {
    this.api.GET('api/v1/list/pages').subscribe((res: any) => {
      if (res.body.success === true) {
        this.headerLinks = res.body.data.filter(res => res.position === "header" || res.position === "both");
        this.headerLinks.push({name: 'CONTACT US', url: 'contact-us'})
        this.footerLinks = res.body.data.filter(res => res.position === "footer" || res.position === "both");
        this.footerLinks.push({name: 'CONTACT US', url: 'contact-us'})
      };
    });
  }
}

