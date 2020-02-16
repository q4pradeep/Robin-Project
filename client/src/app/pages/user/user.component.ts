import { Component, OnInit } from '@angular/core';
import {Dashboard} from '../../models/dashboard.model';
import {Detail} from '../../models/detail.model';
import {Dropmenu} from '../../models/dropmenu.model';
import {NbDialogService} from '@nebular/theme';
import {DetailService} from '../../detail.service';
import {PersistDetail} from '../../models/persistDetails.model';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit  {
  dashboard_id: string;
  dashboards: Dashboard[];
  persistDetails: PersistDetail[] = new Array<PersistDetail>(100);
  details: Detail[];
  dropmenus: Dropmenu[] = [];
  dashboardSpinner: boolean = false;
  selected = new Array<string>(100);
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
      this.prepareInput(this.details);
    });

    this.detailService.getSubDetails(dashboard_id).subscribe((result: Dropmenu[]) => {
      this.dropmenus = result;
    });

    this.dashboardSpinner = false;
  }

  prepareInput(details: Detail[]) {
    let detail_index = 0;
    this.persistDetails = new Array<PersistDetail>(50);
    for (const detail of details){
      this.persistDetails[detail_index] = ({ detail_id: detail._id, detail_isCustom: false, detail_selection: '', detail_customVal: ''});
      ++detail_index;
    }
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

  customValueToggle(checked: boolean, detail_i: number) {
    if (checked) {
        this.persistDetails[detail_i].detail_isCustom = true;
    }else {
      this.persistDetails[detail_i].detail_isCustom = false;
    }
  }
}
