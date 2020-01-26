import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartyService } from 'src/app/services/party/party.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
    private router: Router,
    private pService: PartyService
  ) { }

  ngOnInit() {
  }

  create(partyName: string, userName: string) {
    console.log({ partyName, userName });
    this.pService.start(partyName, userName).subscribe(
      token => {
        localStorage.setItem('token', token);
      }
    );
  }
}
