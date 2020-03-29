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
  visualData: any;

  ngOnInit() {
    this.getMapData();
    this.mapInit();
  }

  getMapData() {
    const vehicles = [];
    this.detailService.getVehicles().subscribe(async value => {
      let index;
      for (index = 0; true; index++) {
        if (!value[index]) break;
        vehicles.push(value[index].data);
      }
      this.getActualLabels(vehicles).then(value1 => {
        this.visualData = value1;
        setTimeout(() => {
          this.vehiclesToMap(this.visualData);
        }, 0);
      });
    });
  }

  vehiclesToMap(data) {
    let item_index = 0;
    for (const item of data) {
      const meta = {
        co_ordinates: environment.locations[item[3]['selectionName']].slice(),
        brand: item[0]['selectionName'],
        model: item[1]['selectionName'],
        yom: item[2]['selectionName'],
      };
      const external = [];
      let index = 4;
      for (; true; index++) {
        let name, property;
        if (!item[index]) break;
        name = item[index]['detailName'], property = item[index]['selectionName'];
        external.push({name, property});
      }
      const radius = 0.1;
      meta.co_ordinates[0] += Math.cos((2 * Math.PI / data.length) * item_index) * radius;
      meta.co_ordinates[1] += Math.sin((2 * Math.PI / data.length) * item_index) * radius / 0.65;
      ++ item_index;
      setTimeout(() => {
        this.markerInsert(meta, this.getPartLinks(external));
      }, 0);
    }
  }

  getPartLinks(external) {
    const partLinks = [];
    const path = environment.resourcePath;
    const links = environment.vehicles.parts;
    const vechicleType = environment.vehicles.type[0].toUpperCase();
    external.forEach(part => {
      const color = part.property;
      const name = part.name;
      partLinks.push(path + vechicleType + '/' + color + '/' + links[name]);
    });
    return partLinks;
  }

  async getActualLabels(vehicles) {
    const vehiclesData = [];
    for await (const vehicle of vehicles) {
      const vehicleData = [];
      for await (const detail of vehicle) {
        let detailName, selectionName;
        await this.detailService.getDetailById(detail.detail_id).subscribe(value => {
          detailName = (value[0]['title']);
        });
        await this.detailService.getSelectionById(detail.detail_selection).subscribe(value2 => {
          selectionName = (value2[0]['title']);
          vehicleData.push({detailName, selectionName});
        });
      }
      await vehiclesData.push(vehicleData);
    }
    return Promise.resolve(vehiclesData);
  }

  mapInit() {
    this.map = L.map('map', {
      center: [52.4372593, 10.7637403],
      zoom: 3,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; open street map',
    }).addTo(this.map);
    // this.markerInsert();
  }

  markerInsert(meta, parts) {
    const imageArray = parts;
    const images = imageArray;
    const location = meta['co_ordinates'].slice();
    console.log(location);
    mergeImages(images).then(base64Image => {
      this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
      const myIcon = L.icon({
        iconUrl: base64Image,
        iconSize: [120, 80],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
      });
      const marker = L.marker(location, {icon: myIcon});
      marker.bindTooltip(meta.brand + ' ' + meta.model + ',' + meta.yom).openTooltip();
      marker.addTo(this.map);
    });
  }

}
