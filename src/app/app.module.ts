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
import { TrialSummaryViewComponent } from './trials/trial-summary-view/trial-summary-view.component';
import { FilterTrialsPipe } from './common/pipes/filter-trials.pipe';
import { FilterCentersPipe } from './common/pipes/filter-centers.pipe';
import { TrialComponent } from './trials/trial/trial.component';
import { TrialSubjectsViewComponent } from './trials/trial-subjects-view/trial-subjects-view.component';
import { TrialCentersComponent } from './trials/trial-centers/trial-centers.component';
import { TrialSubjectsGridComponent } from './trials/trial-subjects-grid/trial-subjects-grid.component';
import { SelectionRequiredComponent } from './common/components/selection-required/selection-required.component';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        TrialCardComponent,
        TrialSummaryViewComponent,
        FilterTrialsPipe,
        FilterCentersPipe,
        TrialComponent,
        TrialSubjectsViewComponent,
        TrialCentersComponent,
        TrialSubjectsGridComponent,
        SelectionRequiredComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ClarityModule.forRoot(),
        ROUTING
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
