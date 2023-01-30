import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root'
})
export class SpeakerService {
  speakers$!: Observable<any[]>;

  constructor(private apiService: ApiService) { }

  getSpeakerList(): Observable<any[]> {
      this.speakers$ = this.apiService.getResource(
    		'https://randomuser.me/api/?results=20&page=1'
    	);

      return this.speakers$;
  }
}
