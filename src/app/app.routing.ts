import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { TrialComponent } from './trials/trial/trial.component';
import { TrialSummaryViewComponent } from './trials/trial-summary-view/trial-summary-view.component';
import { TrialSubjectsViewComponent } from './trials/trial-subjects-view/trial-subjects-view.component';
import { TrialSubjectsGridComponent } from './trials/trial-subjects-grid/trial-subjects-grid.component';
import { SelectionRequiredComponent } from './common/components/selection-required/selection-required.component';
import { AdminViewComponent } from './administration/admin-view/admin-view.component';
import { AdminUsersComponent } from './administration/admin-users/admin-users.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'admin', component: AdminViewComponent,
        children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' },
            { path: 'users', component: AdminUsersComponent }
        ]
    },
    { path: 'trials/:id', component: TrialComponent,
        children: [
            { path: '', redirectTo: 'summary', pathMatch: 'full' },
            { path: 'summary', component: TrialSummaryViewComponent },
            { path: 'subjects', component: TrialSubjectsViewComponent,
                children: [
                    { path: ':center', component: TrialSubjectsGridComponent },
                    { path: '', component: SelectionRequiredComponent,
                        data: { required: 'center' }
                    }
                ]
            }
        ]
    }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
