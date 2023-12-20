import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-mainheader',
  templateUrl: './mainheader.component.html',
  styleUrls: ['./mainheader.component.scss']
})
export class MainheaderComponent implements OnInit {


  constructor(public translate: TranslateService, public ds: DataService) {
    translate.addLangs(['English', 'Hindi']);
    translate.setDefaultLang('English');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/|English/) ? browserLang : 'English');

  }

  ngOnInit(): void {
    this.useLanguage('English');
  }
  useLanguage(language: string) {
    this.translate.use(language);
    this.langChange(language);
  }

  langChange(la: any) {
    this.ds.changeLanguage(la);
  }

}
