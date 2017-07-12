import { Component } from "@angular/core";
import { Trial } from "../common/model/trial";

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
})
export class HomeComponent {

    public filterString: string;

    public trials: Trial[] = [
        new Trial("1", "Novo Nordisk", "Novo Nordisk Trial"),
        new Trial("2", "Berlin-Chemie", "Berlin-Chemie Trial"),
        new Trial("3", "GlaxoSmithKline", "GlaxoSmithKline Trial"),
        new Trial("4", "Astra Zeneka", "Astra Zeneka Trial"),
        new Trial("5", "Actavis", "Actavis Trial")
    ];

}
