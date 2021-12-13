import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authenticate.service';


@Component({
  selector: 'app-adminnavbar',
  templateUrl: './adminnavbar.component.html',
  styleUrls: ['./adminnavbar.component.css']
})
export class AdminnavbarComponent implements OnInit {

  constructor(private loginService: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
  }

  isLogedIn() {
    if (this.loginService.isUserLoggedIn()) {
      let user = localStorage.getItem('username');
      if (user === "abc@atyeti.com") {
        return false;
      } else {
        return true;
      }

    }
  }

  logOut() {
    let varr = confirm("Do you want to logout ?");
    if (varr) {
      this.loginService.logOut();
      this.router.navigate(['']);
    }
    else {
      this.router.navigate(['/admin']);
    }

  }

  request() {
    this.router.navigate(['/fundrequest']);
  }

}
