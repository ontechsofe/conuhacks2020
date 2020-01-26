import { Component, OnInit } from '@angular/core';
import { MessagingService } from 'src/app/services/messaging/messaging.service';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-to-queue',
  templateUrl: './add-to-queue.component.html',
  styleUrls: ['./add-to-queue.component.scss']
})
export class AddToQueueComponent implements OnInit {
  private songs: Song[];
  private socket;

  constructor(private messaging: MessagingService) {
    
   }

  ngOnInit() {
    this.songs = [];

    this.messaging.search.subscribe(data => {
      this.songs = data;
    })
    this.searchAllSongs();
  }

  searchAllSongs() {
    this.messaging.searchAllSongs();
  }

  getSongs(): Song[] {
    return this.songs;
  }

}
