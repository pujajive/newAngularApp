import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authenticate.service';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

    username = '';
    password = '';
    mailid = '';
    phone = '';
    invalidLogin = false;
    invalidUser = false;
    switchToLoginPage = true;
    errorMessage = '';
    showImage = true;
    switchToForgetpass = false;

    constructor(private router: Router, private loginservice: AuthenticationService,
        private authService: SocialAuthService, private toastr: ToastrService) { }
    ngOnInit(): void {
       this.loginservice.logOut();
    }

    checkValidLogin(mail, pass) {
        if (mail.errors || pass.errors)
            return true;
        else
            return false;
    }

    checkValidUser(mail, user, ph, pass) {
        if (mail.errors || user.errors || ph.errors || pass.errors)
            return true;
        else
            return false;
    }



    checkLogin(mail, pass) {

        if (mail.errors || pass.errors) {
            console.log(mail);
            return;
        }
        if (this.mailid == "abc@atyeti.com") {
            if (this.password == 'abc@123') {
                localStorage.setItem('username', this.mailid);

                this.router.navigate(['/admin']);



            }
            else {
                console.log("invalid password");
            }
        }
        else {
            this.loginservice.authenticate(this.mailid, this.password)
                .subscribe(
                    data => {
                        if (data.status === 'success') {
                            localStorage.setItem('username', this.mailid);
                            this.invalidLogin = false;

                            this.router.navigate([''])
                        }
                        else {
                            this.errorMessage = "Invalid Credentials";
                            this.invalidLogin = true
                        }
                    },
                    error => {
                        if (error.error.message === "Incorrect credentials" || error.error.message === "User doesn't exist")
                            this.errorMessage = error.error.message;
                        this.invalidLogin = true
                    }
                );
        }

    }

    registerNewUser() {
        this.loginservice.addNewUser(this.mailid, this.username, this.phone, this.password)
            .subscribe(
                data => {
                    this.switchToLoginPage = true;
                    this.password = '';
                    this.invalidUser = false;
                    this.invalidLogin = false;
                    this.switchToLogin();
                },
                error => {
                    console.log(error);
                    if (error.error.message === "User already exists, please check email.")
                        this.errorMessage = "email already exists";
                    else if (error.error.message === "User already exists, please check phone number.")
                        this.errorMessage = "Phone number already exists";

                    this.invalidUser = true;
                }
            );
    }

    switchToRegister() {
        this.switchToLoginPage = false;
        this.showImage = false;
        this.switchToForgetpass = false;
    }

    switchToLogin() {
        this.switchToLoginPage = true;
        this.showImage = true;
        this.switchToForgetpass = false;
    }
    switchToForget() {
        this.switchToForgetpass = true;
        this.switchToLoginPage = false;
        this.showImage = false;

    }

    signInHandler(): void {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
            localStorage.setItem('google_auth', JSON.stringify(data));

            this.loginservice.addNewUser(data.email, data.firstName, this.phone, this.password)
                .subscribe(
                    data => {
                        this.switchToLoginPage = true;
                        this.password = '';
                        this.invalidUser = false;
                        this.invalidLogin = false;
                        // this.switchToLogin();

                    }

                );
            localStorage.setItem('username', data.email);
            this.invalidLogin = false;

            this.router.navigate([''])
            //   this.router.navigateByUrl('/dashboard').then();
        });
    }
    checkValidLoginone(user, mail, pass) {
        if (mail.errors || user.errors || pass.errors)
            return true;
        else
            return false;
    }
    checkLoginone(user, mail, pass) {
        if (mail.errors || user.errors || pass.rrors) {
            return;
        }

        this.loginservice.forgot(this.username, this.mailid, this.password)
            .subscribe(
                data => {
                    console.log(data)
                    if (data.status === 'success') {
                        this.invalidLogin = false;
                        this.toastr.info('Successully updated');
                        this.router.navigate(['home'])

                    }
                    else {
                        this.errorMessage = "Invalid Credentials";
                        this.invalidLogin = true
                    }
                },
                error => {
                    if (error.error.message === "Incorrect credentials" || error.error.message === "User doesn't exist")
                        this.errorMessage = error.error.message;
                    this.invalidLogin = true
                }
            );
    }

}