import { WebRequestService } from './web-request.service';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailService {
  constructor(private webRequestService: WebRequestService) {}
  getSelectionById(id: string) {
    return this.webRequestService.get(`selection/${id}`);
  }
  getDetailById(id: string) {
    return this.webRequestService.get(`detail/${id}`);
  }
  getDashboards() {
    return this.webRequestService.get('dashboards');
  }
  createDashboard(title: string) {
    return this.webRequestService.post('dashboards', { title });
  }

  getVehicles() {
    return this.webRequestService.get('vehicles');
  }
  postVehicles(data: Array<any>) {
    return this.webRequestService.post('vehicles', { data });
  }
  updateDashboard(id: string, title: string) {
    return this.webRequestService.patch(`dashboards/${id}`, { title });
  }
  deleteDashboard(id: string) {
    return this.webRequestService.delete(`dashboards/${id}`);
  }

  getDetails(dashboardId: string) {
    // return this.webRequestService.get(`dashboards/$(dashboardId)/details`);
    return this.webRequestService.get(`dashboards/${dashboardId}/details`);
  }

  getSubDetails(dashboardId: string) {
    // return this.webRequestService.get(`dashboards/$(dashboardId)/details`);
    return this.webRequestService.get(`dashboards/${dashboardId}/subdetails`,
    );
  }

  createDetail(title: string, dashboardId: string) {
    return this.webRequestService.post(`dashboards/${dashboardId}/details`, {
      title,
    });
  }
  updateDetail(title: string, dashboardId: string, detailId: string) {
    return this.webRequestService.patch(
      `dashboards/${dashboardId}/details/${detailId}`,
      { title },
    );
  }

  deleteDetail(detailId: string, dashboardId: string) {
    return this.webRequestService.delete(
      `dashboards/${dashboardId}/details/${detailId}`,
    );
  }

  getDropmenus(dashboardId: string, detailId: string) {
    // return this.webRequestService.get(`dashboards/$(dashboardId)/details`);
    return this.webRequestService.get(
      `dashboards/${dashboardId}/details/${detailId}/dropmenus`,
    );
  }

  createDropmenu(title: string, dashboardId: string, detailId: string) {
    return this.webRequestService.post(
      `dashboards/${dashboardId}/details/${detailId}/dropmenus`,
      { title },
    );
  }
  updateDropmenu(
    title: string,
    dashboardId: string,
    detailId: string,
    dropmenuId: string,
  ) {
    return this.webRequestService.patch(
      `dashboards/${dashboardId}/details/${detailId}/dropmenus/${dropmenuId}`,
      { title },
    );
  }

  deleteDropmenu(detailId: string, dashboardId: string, dropmenuId: string) {
    return this.webRequestService.delete(
      `dashboards/${dashboardId}/details/${dropmenuId}/dropmenus/${detailId}`,
    );
  }
}
