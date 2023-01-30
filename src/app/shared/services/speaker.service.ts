import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {
  private speakersSubject = new ReplaySubject <any[]>(1);
  speakers$: Observable<any[]> = this.speakersSubject.asObservable();

  constructor(private apiService: ApiService) { }

  loadSpeakerList(): void {
      this.apiService.getResource(
    		'https://randomuser.me/api/?results=20&page=1'
    	).subscribe(res => {
        this.speakersSubject.next(res);
      });
  }

  searchSpeaker(term: string): Observable<any[]> {
    return this.speakers$.pipe(
      map(response => {
        if (!term.trim()) {
          return response;
        }

        return response.filter(item => {
          return item.name.first.toUpperCase().includes(term.toUpperCase()) ||
          item.name.last.toUpperCase().includes(term.toUpperCase());
        });
      })
    );
  }
}
