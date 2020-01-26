import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartyService } from 'src/app/services/party/party.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  constructor(
    private pService: PartyService
    ) { }

  ngOnInit() {
  }

  join(partyCode: string, userName: string){
    partyCode = partyCode.toUpperCase();
    console.log({ partyCode, userName });
    this.pService.join(partyCode, userName).subscribe(
      token => {
        localStorage.setItem('token', token);
      }
    );
  }
}
