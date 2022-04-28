import { IUser } from './../domain/types';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = `${environment.backendServer}/usuarios`;  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private auth: AuthService) { }


  /** GET users from the server */
  getUsers(): Observable<IUser[]> {

    return this.http.get<IUser[]>(this.usersUrl)
    .pipe(
      tap( console.log ),
      catchError(this.handleError<IUser[]>('getUsers', [] ))
    );
  }

  /** GET hero by id. Will 404 if id not found */
  getUserById(id: number): Observable<IUser> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<IUser>(url).pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<IUser>(`getUsersById id=${id}`))
    );
  }
  getUsersByPage(pageNumber: number): Observable<IUser[]> {
    const url = `${this.usersUrl}/page/${pageNumber}`;
    return this.http.get<IUser[]>(url).pipe(
      tap(_ => console.log(`fetched page number=${pageNumber}`)),
      catchError(this.handleError<IUser[]>(`getUserByPage page=${pageNumber}`))
    );
  }

  getUserByEmail(email: String, password: String): Observable<IUser>{
    const url = `${this.usersUrl}/prueba/${email}/${password}`;
    return this.http.get<IUser>(url).pipe(
      tap(_ => console.log(`fetched user email=${email},${password}`)),
      catchError(this.handleError<IUser>(`getUsersByEmail email=${email}`))
    );
  }


  addUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.usersUrl, user, this.httpOptions).pipe(
      tap((newUser: IUser) => console.log(`added user w/ id=${newUser.id}`)),
      catchError(this.handleError<IUser>('addUser'))
    );
  } 

  deleteUser(id: number): Observable<IUser> {
    const url = `${this.usersUrl}/${id}`;
  
    return this.http.delete<IUser>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted hero id=${id}`)),
      catchError(this.handleError<IUser>('deleteUser'))
    );
  }
  updateUser(user: IUser): Observable<any> {
    return this.http.put(`${ this.usersUrl }/${ user.id }`, user, this.httpOptions).pipe(
      tap(_ => console.log(`updated hero id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
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
