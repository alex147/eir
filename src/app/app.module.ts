import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
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
import { VisitDataService } from './trials/visit-data.service';
import { UserService } from './administration/user.service';
import { VisitDefinitionsService } from './trials/visit-definitions.service';
import { VisitDefinitionsComponent } from './administration/visit-definitions/visit-definitions.component';
import { EnrolledCentersComponent } from './administration/enrolled-centers/enrolled-centers.component';
import { TrialVisitsComponent } from './trials/trial-visits/trial-visits.component';
import { SectionFormComponent } from './trials/section-form/section-form.component';
import { DynamicFormQuestionComponent } from './trials/dynamic-form-question/dynamic-form-question.component';

import 'mutationobserver-shim';
import '@webcomponents/custom-elements';
import 'web-animations-js';
require('clarity-icons/clarity-icons.min.css');
import "clarity-icons";
import "clarity-icons/shapes/all-shapes";
require('clarity-ui/clarity-ui.min.css');


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
        VisitDefinitionsComponent,
        EnrolledCentersComponent,
        TrialVisitsComponent,
        SectionFormComponent,
        DynamicFormQuestionComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ClarityModule.forRoot(),
        ROUTING
    ],
    providers: [
        CenterService,
        SubjectService,
        TrialService,
        UserService,
        VisitDefinitionsService,
        VisitDataService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
