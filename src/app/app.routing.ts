import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { TrialContainerComponent } from './trials/trial-container/trial-container.component';
import { TrialSummaryComponent } from './trials/trial-summary/trial-summary.component';
import { TrialSubjectsComponent } from './trials/trial-subjects/trial-subjects.component';
import { TrialVisitsComponent } from './trials/trial-visits/trial-visits.component';
import { SelectionRequiredComponent } from './trials/selection-required/selection-required.component';
import { SectionFormComponent } from './trials/section-form/section-form.component';
import { AdminViewComponent } from './administration/admin-view/admin-view.component';
import { AdminUsersComponent } from './administration/admin-users/admin-users.component';
import { AdminActiveTrialsComponent } from './administration/admin-active-trials/admin-active-trials.component';
import { AdminArchivedTrialsComponent } from './administration/admin-archived-trials/admin-archived-trials.component';
import { VisitDefinitionsComponent } from './administration/visit-definitions/visit-definitions.component';
import { EnrolledCentersComponent } from './administration/enrolled-centers/enrolled-centers.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { ContainerComponent } from './container/container.component';

export const ROUTES: Routes = [
    { path: '', canActivate: [ AuthGuard ], children: [
        { path: '', component: ContainerComponent, children: [
            { path: '', redirectTo: 'home', pathMatch: 'full'},
            { path: 'home', component: HomeComponent },
            { path: 'about', component: AboutComponent },
            { path: 'admin', component: AdminViewComponent,
                children: [
                    { path: '', redirectTo: 'users', pathMatch: 'full' },
                    { path: 'users', component: AdminUsersComponent },
                    { path: 'trials', component: AdminActiveTrialsComponent },
                    { path: 'archive', component: AdminArchivedTrialsComponent },
                    { path: 'visits', component: VisitDefinitionsComponent },
                    { path: 'centers', component: EnrolledCentersComponent }
                ]
            },
            { path: 'trials', component: SelectionRequiredComponent,
                data: { required: 'valid trial' }
            },
            { path: 'trials/:id', component: TrialContainerComponent,
                children: [
                    { path: '', redirectTo: 'subjects', pathMatch: 'full' },
                    { path: 'summary', component: TrialSummaryComponent },
                    { path: 'subjects', component: TrialSubjectsComponent },
                    { path: 'visits', component: TrialVisitsComponent },
                    { path: 'sections', component: SectionFormComponent }
                ]
            }
        ]}
    ]},
    { path: 'login', component: LoginComponent }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
