import { map } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  
  speaker!: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
      .subscribe(response => {
        this.speaker = response.speaker;
      });
  }

}
