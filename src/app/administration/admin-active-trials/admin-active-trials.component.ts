import { Component, OnInit, HostBinding } from '@angular/core';
import { Trial } from '../../common/model/trial';

@Component({
    selector: 'app-admin-active-trials',
    templateUrl: './admin-active-trials.component.html',
    styleUrls: ['./admin-active-trials.component.scss']
})
export class AdminActiveTrialsComponent implements OnInit {

    @HostBinding('class') classes = 'content-area';

    public trials: Trial[] = [
        new Trial("1", "Novo Nordisk", "Novo Nordisk Trial", ['BGR001', 'BGR002']),
        new Trial("2", "Berlin-Chemie", "Berlin-Chemie Trial", ['BGR001', 'BGR002']),
        new Trial("3", "GlaxoSmithKline", "GlaxoSmithKline Trial", ['BGR001', 'BGR002']),
        new Trial("4", "Astra Zeneka", "Astra Zeneka Trial", ['BGR001', 'BGR002']),
        new Trial("5", "Actavis", "Actavis Trial", ['BGR001', 'BGR002'])
    ];

    public isModalOpen: boolean;

    constructor() { }

    ngOnInit () {
    }

    onAdd () {

    }

    onEdit (trial: Trial) {
        this.isModalOpen = true;
    }

    onDelete (trial: Trial) {
        this.trials = this.trials.filter((toCompare: Trial) => {
            return trial.id !== toCompare.id;
        });
    }

    onModalSubmitted () {
        this.isModalOpen = false;
    }

}
