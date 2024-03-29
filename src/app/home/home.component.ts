import { Component, OnInit } from "@angular/core";
import { TrialService } from "../trials/trial.service";
import { Trial } from "../trials/trial";

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    public filterString: string;
    public myTrials: Trial[] = [];

    constructor(private trialService: TrialService) { }

    ngOnInit() {
        this.trialService.getMyTrials()
            .subscribe(data => this.myTrials = data);
    }

}
