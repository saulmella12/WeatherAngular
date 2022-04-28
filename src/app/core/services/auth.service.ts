import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ERoles } from '../domain/enums';
import { ILoginRequest, IUser,  } from '../domain/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = `${environment.backendServer}/auth`;
  private _loggedUser: BehaviorSubject<IUser | null>;
  public loggedUser$: Observable<IUser | null>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { 
    this._loggedUser = new BehaviorSubject(this.getLoggedUser());
    this.loggedUser$ = this._loggedUser.asObservable();
  }

  public authenticate(data: ILoginRequest): Observable<IUser> {
    return this.http.post<IUser>(`${this.authUrl}/login`,data).pipe(
      tap((userData: IUser) =>{
        if(userData && userData.id){
            this.setAuthId(data.username, data.password);
            this.setLoggedUser(userData);
            this._loggedUser.next(userData);
        }else{
            this.disconnect();
        }
      })
    );
  }

  public isAuthenticated(): Boolean{
    const data = this.getLoggedUser();
    return data != null;
  } 

  public isAdmin(): boolean{
    const data = this.getLoggedUser();
    return data != null && data.role === ERoles.ADMIN;
  }

  public isRole(role: string | string[]): boolean{
    const data = this.getLoggedUser();
    if(typeof role ==='string' ){
      return data != null && data.role === role;
    }else if(typeof role === 'object'){
      return data != null && role.includes(data.role);
    }else{
      return false;
    }
    
  }


  public setAuthId(username: string, password: string):void {
      const token = window.btoa(`${username}:${password}`);
      sessionStorage.setItem("auth-id",token);
  }

  public setLoggedUser(data: IUser): void {
    const userSrt = JSON.stringify(data);
    sessionStorage.setItem("user-data",userSrt);
  }

  public getLoggedUser(): IUser | null{
    const userSrt = sessionStorage.getItem("user-data");
    if(userSrt){
        return JSON.parse(userSrt);
    }else{
      return null;
    }
  }

  public getAuthId(): string | null{
    return sessionStorage.getItem("auth-id");
  }

  public disconnect(): void{
    sessionStorage.removeItem("auth-id");
    sessionStorage.removeItem("user-data");
    this._loggedUser.next(null);
    }
}
