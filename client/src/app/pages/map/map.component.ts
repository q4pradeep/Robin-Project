import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import mergeImages from 'merge-images';
import {DomSanitizer} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';
import {DetailService} from '../../detail.service';

declare function require(path: string);

@Component({
  selector: 'ngx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer, private detailService: DetailService) {
  }

  map: any;
  imagePath: any;
  ngOnInit() {
    this.mapInit();
    this.getMapData();
  }
  getMapData() {
    const vehicles = [];
    this.detailService.getVehicles().subscribe(value => {
      let index;
      for (index = 0; true; index++) {
        if (!value[index]) break;
        vehicles.push(value[index].data);
      }
      this.getActualLabels(vehicles);
    });
  }

  async getActualLabels(vehicles) {
    const vehiclesData = [];
    for await (const vehicle of vehicles) {
      const vehicleData = [];
      for await (const detail of vehicle) {
        let detailName, selectioname;
        await this.detailService.getDetailById(detail.detail_id).subscribe(value => {
          detailName = (value[0]['title']);
        });
        await this.detailService.getSelectionById(detail.detail_selection).subscribe(value2 => {
          selectioname = (value2[0]['title']);
          // console.log(detailName, selectioname);
          vehicleData.push({detailName, selectioname});
        });
      }
      await vehiclesData.push(vehicleData);
    }
    console.log(vehiclesData);
    return vehiclesData;
  }
  mapInit() {
    this.map = L.map('map', {
      center: [52.4372593, 10.7637403],
      zoom: 3,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; open street map',
    }).addTo(this.map);
    this.markerInsert();
  }
  markerInsert() {
    const imageArray = [];
    const path = environment.resourcePath;
    const vechicleType = environment.vehicles.type[0].toUpperCase();
    const vechicleColor = environment.vehicles.color[0];
    environment.vehicles.parts.forEach(value => {
      imageArray.push(path + vechicleType + '/' + vechicleColor + '/' + value.link);
    });
    const images = imageArray;
    mergeImages(images).then(base64Image => {
      this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
      const myIcon = L.icon({
        iconUrl: base64Image,
        iconSize: [120, 80],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
      });
      L.marker([52.4372593, 10.7637403], {icon: myIcon}).addTo(this.map);
    });
  }

}
