import { Injectable } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';
import { Subject } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  messages: Subject<any>;

  constructor(private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .pipe(map((response: any): any => {
        return response;
      }))
  }

  sendMessage(msg) {
    this.messages.next(msg);
  }

  disconnect() {
    this.wsService.disconnect();
  }
}
