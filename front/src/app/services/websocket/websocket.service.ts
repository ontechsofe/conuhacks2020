import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import * as Rx from 'rxjs/Rx';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Party } from 'src/app/types/Party';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket; // connects to server
  observableS: Observable<Party>;

  constructor() { }

  connect(): Subject<MessageEvent> {
    this.socket = io(environment.ws_url);

    // this.socket.on('update', data => {
    //   console.log(data);
    // })

    let observable = new Observable(observer => {
      this.socket.on('message', data => {
        console.log('Received a message from websocket server.');
        observer.next(data);
      })
      // return () => {
      //   this.disconnect();
      // }
    });

    let observer = {
      next: (data: Object) => {
        this.socket.emit('message', data);
      }
    };

    return Subject.create(observer, observable);
  }

  // MAYBE MOVE THERE IN OBSERVER IF DOESNT WORK
  getData(): Observable<Party> {
    return this.observableS = new Observable<Party>((observer) =>
      this.socket.on('update', data => observer.next(data))
    );
  }

  join(data: { partyCode: string }) {
    this.socket.emit('join-room', data);
  }

  addSong(data: { partyCode: string, song: Song }) {
    this.socket.emit('add-song', data);
  }

  playSong(data: { partyId: string }) {
    this.socket.emit('play', data);
  }

  pauseSong(data: { partyId: string }) {
    this.socket.emit('pause', data);
  }

  nextSong(data: { partyId: string }) {
    this.socket.emit('next', data);
  }

  search(): Subject<MessageEvent> {
    let observable = new Observable(obs => {
      this.socket.on('search-result', data => {
        console.log('Received search results.');
        obs.next(data);
      })
      // return () => {
      //   this.disconnect();
      // }
    });

    let obs = {
      next: (data) => {
        this.socket.emit('search', data);
      }
    };
    return Subject.create(obs, observable);
  }
  // MAYBE MOVE THERE IN OBSERVER IF DOESNT WORK


  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
