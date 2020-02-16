import {Component, OnInit} from '@angular/core';
import {Dashboard} from '../../models/dashboard.model';
import {DetailService} from '../../detail.service';
import {Detail} from '../../models/detail.model';
import {Dropmenu} from '../../models/dropmenu.model';
import {NbDialogService} from '@nebular/theme';
import {DropdownPromptComponent} from './modals/dropdown-prompt/dropdown-prompt.component';
import {DashboardPromptComponent} from './modals/dashboard-prompt/dashboard-prompt.component';
import {FeaturePromptComponent} from './modals/feature-prompt/feature-prompt.component';
import {RemoveCarPromptComponent} from './modals/remove-car-prompt/remove-car-prompt.component';
import {RemoveFeaturePromptComponent} from './modals/remove-feature-prompt/remove-feature-prompt.component';

@Component({
    selector: 'ngx-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
  },
)


export class DashboardComponent implements OnInit {
  dashboard_id: string;
  dashboards: Dashboard[];
  details: Detail[];
  dropmenus: Dropmenu[] = [];
  dashboardSpinner: boolean = false;
  selected = new Array<string>(50);
  accStatus = new Array<boolean>(50);
  constructor(
    private dialogService: NbDialogService,
    private detailService: DetailService,
  ) {
  }

  ngOnInit() {
    this.detailService.getDashboards().subscribe((result: Dashboard[]) => {
      this.dashboards = result;
    });
  }

  openDetails(dashboard_id: string) {
    this.dashboard_id = dashboard_id;
    this.dashboardSpinner = true;
    this.details = [];
    this.detailService.getDetails(dashboard_id).subscribe((result: Detail[]) => {
      this.details = result;
    });
    this.detailService.getSubDetails(dashboard_id).subscribe((result: Dropmenu[]) => {
      this.dropmenus = result;
    });
    this.dashboardSpinner = false;
  }

  dropMenusForDetail: Dropmenu[];
  getDropMenuItems(detail_id: string) {
    this.dropMenusForDetail = [];
    while (this.dropmenus === []) ; // This is hack and needs to be replaced by a async promise
    for (const dropmenu of this.dropmenus) {
      if (dropmenu._detailId === detail_id) {
        this.dropMenusForDetail.push(dropmenu);
      }
    }
    return this.dropMenusForDetail;
  }

  dropdownPromptOpen(detail_id: string, detail_i: number) {
    this.dialogService.open(DropdownPromptComponent)
      .onClose.subscribe(name => {
      this.detailService.createDropmenu(name, this.dashboard_id, detail_id).subscribe(response => {
        this.openDetails(this.dashboard_id);
        this.accStatus = new Array<boolean>(50);
        this.accStatus[detail_i] = true;
      });
    });
  }

  dashboardPromptOpen() {
    this.dialogService.open(DashboardPromptComponent)
      .onClose.subscribe(cars => {
      this.detailService.createDashboard(cars).subscribe(response => {
        this.ngOnInit();
      });
    });
  }

  featurePromptOpen() {
    this.dialogService.open(FeaturePromptComponent)
      .onClose.subscribe(feature => {
      this.detailService.createDetail(feature, this.dashboard_id).subscribe(response => {
        this.openDetails(this.dashboard_id);
      });
    });
  }

  updateFeature(detail_title: string, detail_id: string, detail_i: number) {
    this.detailService.updateDetail(detail_title, this.dashboard_id, detail_id).subscribe(response => {
      this.openDetails(this.dashboard_id);
      this.accStatus = new Array<boolean>(50);
      this.accStatus[detail_i] = true;
    });
  }

  carDeletePrompt() {
    this.dialogService.open(RemoveCarPromptComponent)
      .onClose.subscribe(ans => {
      if (ans === 'delete') {
        this.detailService.deleteDashboard(this.dashboard_id).subscribe(response => {
          this.ngOnInit();
          this.dashboard_id = null;
        });
      }
    });
  }

  featureDeletePrompt(detail_id: string) {
    this.dialogService.open(RemoveFeaturePromptComponent)
      .onClose.subscribe(ans => {
      if (ans === 'delete') {
        this.detailService.deleteDetail(detail_id, this.dashboard_id).subscribe(response => {
          this.openDetails(this.dashboard_id);
        });
      }
    });
  }

  dropmenuDeletePrompt(dropmenu_id: string, detail_id: string, detail_i: number) {
    this.dialogService.open(RemoveFeaturePromptComponent)
      .onClose.subscribe(ans => {
      if (ans === 'delete') {
        this.detailService.deleteDropmenu(detail_id, this.dashboard_id,
          dropmenu_id).subscribe(response => {
          this.openDetails(this.dashboard_id);
          this.selected[detail_i] = null;
          this.accStatus = new Array<boolean>(50);
          this.accStatus[detail_i] = true;
        });
      }
    });
  }
}
