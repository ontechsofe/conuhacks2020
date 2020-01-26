import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateDefault() {
    this.router.navigate(['/']);
  }

  navigateParty() {
    this.router.navigate(['/app/party/listen'])
  }

  getPartyCode(): string {
    let partyCode = localStorage.getItem('partyCode');
    if (partyCode) {
      return partyCode;
    }
    return 'XXXX';
  }

}
