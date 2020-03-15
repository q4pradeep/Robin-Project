import {Component, OnInit} from '@angular/core';
import {Dashboard} from '../../models/dashboard.model';
import {Detail} from '../../models/detail.model';
import {Dropmenu} from '../../models/dropmenu.model';
import {DetailService} from '../../detail.service';
import {PersistDetail} from '../../models/persistDetails.model';
import {NbComponentStatus, NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  dashboard_id_prev: string = '';
  dashboard_id: string;
  dashboard_id_p: string;
  dashboard_id_n: string;

  dashboards: Dashboard[];
  persistDetails: PersistDetail[] = new Array<PersistDetail>(100);
  saveDetailArray = [];
  details: Detail[];
  dropmenus: Dropmenu[] = [];
  dashboardSpinner: boolean = false;

  constructor(
    private detailService: DetailService,
    private toastrService: NbToastrService,
  ) {
  }

  ngOnInit() {
    this.detailService.getDashboards().subscribe((result: Dashboard[]) => {
      this.dashboards = result;
      if (this.dashboards.length) {
        this.openDetails(this.dashboards[0]._id);
      }
    });
  }

  populateNav(dashboard_id) {
    let index = 0;
    this.dashboards.forEach(value => {
      if (value._id === dashboard_id) {
        if (index === 0) {
          this.dashboard_id_p = '';
          this.dashboard_id_n = this.dashboards[index + 1]._id;
        } else if (index === this.dashboards.length - 1) {
          this.dashboard_id_p = this.dashboards[index - 1]._id;
          this.dashboard_id_n = '';
        } else {
          this.dashboard_id_p = this.dashboards[index - 1]._id;
          this.dashboard_id_n = this.dashboards[index + 1]._id;
        }
      }
      index++;
    });
  }

  openDetails(dashboard_id: string) {
    this.populateNav(dashboard_id);
    if (this.dashboard_id_prev) {
      let index = 0;
      let isSet = false;
      const pdid = this.dashboard_id_prev;
      const pdetails = this.persistDetails;
      const saveDetail = {};
      this.saveDetailArray.forEach(detail => {
        if (detail['id'] === this.dashboard_id_prev) {
          this.saveDetailArray[index]['data'] = pdetails;
          isSet = true;
        }
        index++;
      });
      if (!isSet) {
        saveDetail['id'] = pdid;
        saveDetail['data'] = pdetails;
        this.saveDetailArray.push(saveDetail);
      }
    }
    this.dashboard_id_prev = dashboard_id; // overwrite prev id
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
    let isSet: boolean = false;
    this.persistDetails = new Array<PersistDetail>(50);
    this.saveDetailArray.forEach(dashboard => {
      if (dashboard.id === this.dashboard_id) {
        this.persistDetails = dashboard.data;
        isSet = true;
      }
    });
    if (!isSet) {
      let detail_index = 0;
      for (const detail of details) {
        this.persistDetails[detail_index] = ({
          detail_id: detail._id,
          detail_isCustom: false,
          detail_selection: '',
          detail_customVal: '',
        });
        ++detail_index;
      }
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
    } else {
      this.persistDetails[detail_i].detail_isCustom = false;
    }
  }

  saveDataValiadte(saveData) {
    const errors = [];
    if (!saveData.length) {
      return false;
    } else {
      saveData.forEach(value => {
        if (value['detail_selection'] === '') {
          errors.push(value['detail_id']);
        }
      });
    }
    return errors.length > 0 ? false : true;
  }

  saveToDatabase() {
    this.openDetails(this.dashboard_id);
    const saveToDB = [];
    this.saveDetailArray.forEach(value => {
      value.data.forEach(item => {
        if (item) {
          saveToDB.push(item);
        }
      });
    });
    if (this.saveDataValiadte(saveToDB)) {
      this.detailService.postVehicles(saveToDB).subscribe(value1 => {
        this.showToast('success', 'Inserted Successfully');
      });
    } else {
      this.showToast('warning', 'Fill-in all fields');
    }
  }
  showToast(status: NbComponentStatus, message: string) {
    this.toastrService.show(status, message, { status });
  }
}
