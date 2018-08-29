import { BackendService } from '../backend-service/backend.service';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private sessionId: string;

  constructor(
    private cookies: CookieService,
    private backend: BackendService
  ) { }

  createSession(){
    return this.backend.newSession();
  }

  getSession(){
    return this.sessionId;
  }

  setSessionId(sId: string){
    this.sessionId = sId;
  }

  //save user session and handle id in DB
  saveSession(){

  }

  recoverSession(){

  }

  verifySession(){
    if(this.cookies.check('markdown-session')){
      this.sessionId = this.cookies.get('markdown-session')
      return Observable.create(obs=>{
        obs.next({id: this.sessionId})
      });
    }else{
     return this.createSession();     
    }
  }


}
