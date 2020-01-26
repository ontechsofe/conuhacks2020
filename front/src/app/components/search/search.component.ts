import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MessagingService } from 'src/app/services/messaging/messaging.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() songs: Song[];

  constructor(private mService: MessagingService) { }

  ngOnInit() {
  }

  search(input: any) {
    console.log(input.value);
    // Based on search field do search
    let chosenSong = null;
    let filteredSongs = this.songs.filter((song) => {
      return song.name.includes(input.value);
    })
    console.log({filteredSongs});
    if (filteredSongs.length > 0) {
      chosenSong = filteredSongs[0];
      console.log(chosenSong);
      this.mService.addSong(this.getPartyCode(), chosenSong);
    }
    // Then reset search field
    input.value = '';
  }

  getPartyCode(): string {
    let partyCode = localStorage.getItem('partyCode');
    if (partyCode) {
      return partyCode;
    }
    return null;
  }
}
