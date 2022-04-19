import { IUser } from './../domain/types';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = 'api/users';  // URL to web api

  constructor(private http: HttpClient) { }


  /** GET users from the server */
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl)
    .pipe(
      tap( console.log ),
      catchError(this.handleError<IUser[]>('getUsers', []))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getUserById(id: number): Observable<IUser> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<IUser>(url).pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<IUser>(`getUserById id=${id}`))
    );
  }


/**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
