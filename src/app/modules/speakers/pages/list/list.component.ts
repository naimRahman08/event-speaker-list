import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { SpeakerService } from '../../../../shared/services/speaker.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  private searchTerms = new Subject<string>();
  speakerList$!: Observable<any[]>;
  lowValue: number = 0;
  highValue: number = 5;
  pageSize: number = 5;

  constructor(private speakerService: SpeakerService) { }

  ngOnInit() {
    this.speakerService.loadSpeakerList();

    this.speakerList$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.speakerService.searchSpeaker(term))
    );

    setTimeout(() => {this.searchTerms.next('')}, 1);
  }

  getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;

    return event;
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

}
