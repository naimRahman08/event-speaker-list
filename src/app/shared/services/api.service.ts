import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API } from '../interfaces/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // Show error
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by throwing an error to show custom message on component.
      return throwError(() => new Error(error));
    };
  }

  getResource(url: string): Observable<any[]> {
    let completeUrl = `${url}`;

    return this.http.get<API>(completeUrl).pipe(
      tap(_ => console.log(`fetched all ${url}`)),
      map(response => response.results),
      catchError(this.handleError<any>(`get objects ${url}`))
    );
  }
}
