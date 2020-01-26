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
      data => {
        // data = {token: string, party: Party}
        console.log("LETS GET THIS PARTY STARTED!");
        console.log(data);
        if (data.token) {
          localStorage.clear();
          localStorage.setItem('token', data['token']);
          localStorage.setItem('partyCode', data['party']['code']);
          this.router.navigate(['/app/party/listen'])
        }
      }
    );
  }
}
