import { NgModule } from '@angular/core';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule, NbCheckboxModule, NbInputModule,
  NbMenuModule,
  NbSelectModule,
  NbSpinnerModule,
} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import {FormsModule} from '@angular/forms';
import { MapComponent } from './map/map.component';
import {LeafletModule} from "@asymmetrik/ngx-leaflet";

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        NbMenuModule,
        DashboardModule,
        NbCardModule,
        NbButtonModule,
        NbSpinnerModule,
        NbAccordionModule,
        FormsModule,
        NbSelectModule,
        NbInputModule,
        NbCheckboxModule,
        LeafletModule,
    ],
  declarations: [
    PagesComponent,
    HomeComponent,
    UserComponent,
    MapComponent,
  ],
  bootstrap: [
    MapComponent,
  ],
})
export class PagesModule {
}
