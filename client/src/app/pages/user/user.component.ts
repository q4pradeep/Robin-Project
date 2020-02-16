import { Component, OnInit } from '@angular/core';
import {Dashboard} from '../../models/dashboard.model';
import {Detail} from '../../models/detail.model';
import {Dropmenu} from '../../models/dropmenu.model';
import {NbDialogService} from '@nebular/theme';
import {DetailService} from '../../detail.service';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
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
}
