import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginCredentials } from './login-credentials';
import { AuthenticationService } from './authentication.service';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    returnUrl: string;
    model: LoginCredentials;
    hasLoginError: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService) {
            this.model = new LoginCredentials();
            this.hasLoginError = false;
    }

    ngOnInit () {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login () {
        this.authenticationService.login(this.model)
            .subscribe(
            data => {
                this.hasLoginError = false;
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.hasLoginError = true;
            });
    }
}
