import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MessagingService } from '../../services/messaging/messaging.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { Party } from 'src/app/types/Party';


@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {
  private party: Party;
  private admin: boolean;
  private playing: boolean;

  constructor(
    private router: Router,
    private messaging: MessagingService,
    private wsService: WebsocketService
  ) {
    this.admin = true;
    this.playing = false;

    let code = this.getPartyCode();
    if (code == null) {
      // GOTO LOGIN
      this.messaging.disconnect();
      // this.router.navigate(['/app/join']);
    } else {
      console.log('HI');
      this.joinParty();
      this.wsService.getData().subscribe(data => this.party = data);
    }
  }

  ngOnInit() {
  }

  getPartyCode(): string {
    let partyCode = localStorage.getItem('partyCode');
    if (partyCode) {
      return partyCode;
    }
    return null;
  }

  joinParty() {
    this.messaging.joinParty(this.getPartyCode());
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
    if (this.party && this.party.state == 0) {
      return true;
    }
    return false;
  }

  getSongName(): string {
    if (this.party) {
      return this.party.currentlyPlaying ? this.party.currentlyPlaying.name : 'Nothing Playing';
    }
  }

  pauseReal(): void {
    let data = {
      partyId: this.party.id
    }
    this.wsService.pauseSong(data);
    this.playing = false;
  }

  pause(): void {
    let data = {
      partyId: this.party.id
    }
    this.wsService.pauseSong(data);
    this.playing = false;
    this.wsService.playSong(data);
    this.playing = true;
  }

  play(): void {
    let data = {
      partyId: this.party.id
    }
    this.wsService.playSong(data);
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
    let data = {
      partyId: this.party.id
    }
    this.wsService.nextSong(data);
  }

}
