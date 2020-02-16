import { NgModule } from '@angular/core';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule, NbDialogModule,
  NbIconModule,
  NbInputModule, NbSelectModule,
  NbSpinnerModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { DropdownPromptComponent } from './modals/dropdown-prompt/dropdown-prompt.component';
import { DashboardPromptComponent } from './modals/dashboard-prompt/dashboard-prompt.component';
import { FeaturePromptComponent } from './modals/feature-prompt/feature-prompt.component';
import { RemoveCarPromptComponent } from './modals/remove-car-prompt/remove-car-prompt.component';
import {FormsModule} from '@angular/forms';
import { RemoveFeaturePromptComponent } from './modals/remove-feature-prompt/remove-feature-prompt.component';
import { RemoveDropmenuPromptComponent } from './modals/remove-dropmenu-prompt/remove-dropmenu-prompt.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbButtonModule,
    NbAccordionModule,
    NbSpinnerModule,
    NbInputModule,
    NbIconModule,
    NbSelectModule,
    NbDialogModule.forRoot(),
    FormsModule,
  ],
  declarations: [
    DashboardComponent,
    DropdownPromptComponent,
    DashboardPromptComponent,
    FeaturePromptComponent,
    RemoveCarPromptComponent,
    RemoveFeaturePromptComponent,
    RemoveDropmenuPromptComponent,
  ],
  entryComponents: [
    DropdownPromptComponent,
    DashboardPromptComponent,
    FeaturePromptComponent,
    RemoveCarPromptComponent,
    RemoveFeaturePromptComponent,
    RemoveDropmenuPromptComponent,
  ],

})
export class DashboardModule { }
