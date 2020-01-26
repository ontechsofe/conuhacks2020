import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Party } from 'src/app/types/Party';

@Injectable({
  providedIn: 'root'
})
export class PartyService {

  constructor(private http: HttpClient) { }

  // Start: Name of party, name of nickname
  public start(partyName: string, userName: string): Observable<{token: string, party: Party}> {
    let url = environment.s_url + '/api/main/party/start';
    let body = {
      partyName: partyName,
      userName: userName
    };
    return this.http.post<{token: string, party: Party}>(url, body);
  }

  // Join: Party Code, Name of Nickname
  public join(partyCode: string, userName: string): Observable<string> {
    let url = environment.s_url + '/api/main/party/join';
    let body = {
      partyCode: partyCode,
      userName: userName
    };
    return this.http.post<string>(url, body);
  }
}
