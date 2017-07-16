import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from 'clarity-angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { TrialCardComponent } from './trials/trial-card/trial-card.component';
import { TrialSummaryComponent } from './trials/trial-summary/trial-summary.component';
import { FilterTrialsPipe } from './trials/filter-trials.pipe';
import { FilterCentersPipe } from './trials/filter-centers.pipe';
import { FilterOptionsPipe } from './administration/filter-options.pipe';
import { TrialContainerComponent } from './trials/trial-container/trial-container.component';
import { TrialSubjectsComponent } from './trials/trial-subjects/trial-subjects.component';
import { SelectionRequiredComponent } from './trials/selection-required/selection-required.component';
import { AdminViewComponent } from './administration/admin-view/admin-view.component';
import { AdminUsersComponent } from './administration/admin-users/admin-users.component';
import { AdminOptionsComponent } from './administration/admin-options/admin-options.component';
import { AdminActiveTrialsComponent } from './administration/admin-active-trials/admin-active-trials.component';
import { AdminArchivedTrialsComponent } from './administration/admin-archived-trials/admin-archived-trials.component';
import { CenterService } from './trials/center.service';
import { SubjectService } from './trials/subject.service';
import { TrialService } from './trials/trial.service';
import { UserService } from './administration/user.service';
import { VisitDefinitionsService } from './trials/visit-definitions.service';
import { VisitDefinitionsComponent } from './administration/visit-definitions/visit-definitions.component';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        TrialCardComponent,
        TrialSummaryComponent,
        FilterTrialsPipe,
        FilterCentersPipe,
        FilterOptionsPipe,
        TrialContainerComponent,
        TrialSubjectsComponent,
        SelectionRequiredComponent,
        AdminViewComponent,
        AdminUsersComponent,
        AdminOptionsComponent,
        AdminActiveTrialsComponent,
        AdminArchivedTrialsComponent,
        VisitDefinitionsComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        ROUTING
    ],
    providers: [
        CenterService,
        SubjectService,
        TrialService,
        UserService,
        VisitDefinitionsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
