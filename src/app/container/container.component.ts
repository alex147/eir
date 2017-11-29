import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/authentication.service';

@Component({
    styleUrls: ['./container.component.scss'],
    templateUrl: './container.component.html',
})
export class ContainerComponent {
    constructor(private router: Router,
        private authenticationService: AuthenticationService) { }

    logout () {
        this.authenticationService.logout();
    }

}
