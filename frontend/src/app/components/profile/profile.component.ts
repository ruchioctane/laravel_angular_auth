import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../services/jarwis.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {



	public users = null;
  constructor(
    private Jarwis: JarwisService,
  ) { 

    this.Jarwis.getUsers().subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }


  handleResponse(data) {
      this.users = data.users;
//    this.Token.handle(data.access_token);
//    this.router.navigateByUrl('/profile');
  }

  handleError(error) {
  console.dir(error);
//    this.error = error.error.errors;
  }

  ngOnInit() {
  }

}
