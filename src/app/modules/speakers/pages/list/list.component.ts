import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { SpeakerService } from '../../../../shared/services/speaker.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  speakerList$!: Observable<any[]>;
  lowValue: number = 0;
  highValue: number = 5;
  pageSize: number = 5;

  constructor(private speakerService: SpeakerService) { }

  ngOnInit() {
    this.loadSpeakerList();
  }

  loadSpeakerList() {
    this.speakerList$ = this.speakerService.getSpeakerList();
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;

    return event;
  }

}
