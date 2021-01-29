import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../services/jarwis.service';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
//import { CustomValidators } from '@angular/ng2-validation';

//const password = new FormControl('', Validators.required);
//const confirmPassword = new FormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    email: null,
    first_name: null,
    last_name: null,
    password: null,
    password_confirmation: null,
    country: 0,
    country_list:null
  };

  public country_list = null;
  public error = [];

  constructor(
    private Jarwis: JarwisService,
    private Token: TokenService,
    private router: Router,
    private Auth: AuthService
  ) {
    this.Jarwis.getcountryList().subscribe(
      data => this.handleCountryResponse(data),
      error => this.handleCountryError(error)
    );
   }

  onSubmit() {

  var a = this.form;
  delete a['country_list'];
    this.Jarwis.signup(a).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/users');
  }

  handleError(error) {
    this.error = error.error.errors;
  }

  handleCountryResponse(data) {
  this.form.country_list = data;
    //this.Token.handle(data.access_token);
    //this.router.navigateByUrl('/profile');
  }

  handleCountryError(error) {
  console.dir(error);
    //this.error = error.error.errors;
  }




  ngOnInit() {
  }

}
