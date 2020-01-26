import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessagingService } from '../../services/messaging/messaging.service';


@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

  private song: Song;
  private admin: boolean;
  private playing: boolean;

  constructor(
    private router: Router,
    private messaging: MessagingService
    ) {
    this.song = {
      name: "Random Song Name"
    };
    this.admin = true;
    this.playing = true;
  }

  ngOnInit() {
    this.messaging.messages.subscribe(msg => {
      console.log(msg);
    })
  }

  sendMessage() {
    this.messaging.sendMessage('Test Message.');
  }

  viewQueue(): void {
    this.router.navigate(['/app/party/vote']);
  }

  isAdmin(): boolean {
    return this.admin;
  }

  isPlaying(): boolean {
    return this.playing;
  }

  getSongName(): String {
    return this.song.name;
  }

  pause(): void {
    this.playing = false;
  }

  play(): void {
    this.playing = true;
  }

  togglePlayPause(): void {
    if (this.isPlaying()) {
      this.pause();
    } else {
      this.play();
    }
  }

  nextSong(): void {
    this.sendMessage();
  }

}
