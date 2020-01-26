import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-to-queue',
  templateUrl: './add-to-queue.component.html',
  styleUrls: ['./add-to-queue.component.scss']
})
export class AddToQueueComponent implements OnInit {
  private songs: Song[];

  constructor() { }

  ngOnInit() {
    this.songs = [{
      name: "One song"
    }, {
      name: "Two song"
    }, {
      name: "Three song"
    }];
  }

  getSongs(): Song[] {
    return this.songs;
  }

}
