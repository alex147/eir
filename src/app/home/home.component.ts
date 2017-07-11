import { Component } from "@angular/core";
import { Trial } from "../trials/trial";

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent {

    trials: Trial[] = [
        new Trial(1, "Novo Nordisk", "Novo Nordisk Trial"),
        new Trial(2, "Berlinchemie", "Berlin Chemie Trial")
    ];

}
