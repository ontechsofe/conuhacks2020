import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  messages: Subject<any>;
  search: Subject<any>;

  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .pipe(map((response: any): any => {
        return response;
      }));
    this.search = <Subject<any>>wsService
      .search()
      .pipe(map((response: any): any => {
        return response;
      }));
  }

  sendMessage(msg) {
    this.messages.next(msg);
  }

  addSong(partyCode: string, song: Song) {
    this.wsService.addSong({partyCode: partyCode, song: song});
  }

  searchAllSongs() {
    this.search.next();
  }

  joinParty(partyCode: string) {
    this.wsService.join({ partyCode: partyCode });
  }

  getAllSongs() {
    this.wsService.search();
  }

  disconnect() {
    this.wsService.disconnect();
  }
}
