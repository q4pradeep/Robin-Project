import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import mergeImages from 'merge-images';
import {DomSanitizer} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';
import {DetailService} from '../../detail.service';

@Component({
  selector: 'ngx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer, private detailService: DetailService) {
  }

  map: L.bubbleMap;
  imagePath: any;
  visualData: any;
  mapMarkers: [];
  isInit: boolean = true;

  ngOnInit() {
    this.mapMarkers = [];
    this.mapInit();
  }

  mapInit() {
    this.map = L.map('map', {
      center: [52.4372593, 10.7637403],
      zoom: 2.5,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; open street map', maxZoom: 7,
    }).addTo(this.map);
    this.map.options.minZoom = 2.5;
    this.map.options.maxZoom = 7;
    this.getMapData('external');
  }


  getMapData(view?) {
    !view ? view = 'external' : null;
    const vehicles = [];
    if (this.mapMarkers) {
      this.mapMarkers.forEach(marker => {
        this.map.removeLayer(marker);
      });
    }
    this.detailService.getVehicles().subscribe(async value => {
      let index;
      for (index = 0; true; index++) {
        if (!value[index]) break;
        vehicles.push(value[index].data);
      }
      this.getActualLabels(vehicles).then(value1 => {
        this.visualData = value1;
        setTimeout(() => {
          this.vehiclesToMap(this.visualData, view);
        }, 1000);
      });
    });
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

  vehiclesToMap(data, view) {
    let item_index = 0;
    const locations = environment.available_locations;
    const locationData = [];
    for (const location of locations) {
      locationData.push({
        location: location, count: 0, center: environment.locations[location][0],
        radius: environment.locations[location][1], labelLoc: environment.locations[location][2],
      });
    }
    for (const item of data) {
      const meta = {
        co_ordinates: environment.locations[item[3]['selectionName']][0].slice(),
        brand: item[0]['selectionName'],
        model: item[1]['selectionName'],
        yom: item[2]['selectionName'],
      };
      locationData.forEach(value => {
        if (value['location'] === item[3]['selectionName']) {
          value['count']++;
        }
      });
      const external = [];
      const internal = [];
      const external_parts = environment.vehicles.external;
      const internal_parts = environment.vehicles.internal;
      let index = 4;
      for (; true; index++) {
        let name, property;
        if (!item[index]) break;
        name = item[index]['detailName'];
        property = item[index]['selectionName'];
        if (external_parts.includes(name))
          external.push({name, property});
        if (internal_parts.includes(name))
          internal.push({name, property});
      }
      const radius = 0.1;
      meta.co_ordinates[0] += Math.cos((2 * Math.PI / data.length) * item_index) * radius;
      meta.co_ordinates[1] += Math.sin((2 * Math.PI / data.length) * item_index) * radius / 0.65;
      ++item_index;
      setTimeout(() => {
        if (view === 'external') {
          this.markerInsert(meta, this.getPartLinks(external, view), view, this.mapMarkers);
        } else {
          this.markerInsert(meta, this.getPartLinks(internal, view), view, this.mapMarkers);
        }
      }, 1000);
    }
    this.drawCircles(locationData);
  }

  drawCircles(locationData) {
    if (!this.isInit) return;
    locationData.forEach(value => {
      const circle = L.circle(value['center'], {
        color: 'grey',
        fillColor: '#888',
        fillOpacity: 0.4,
        radius: value['radius'],
      });
      circle.addTo(this.map);
      const LabeledMarker = require('leaflet-labeled-circle');
      const feature = {
        'type': 'Feature',
        'properties': {
          'text': value['count'],
          'labelPosition': value['labelLoc'],
        },
        'geometry': {
          'type': 'Point',
          'coordinates': value['center'],
        },
      };
      const marker = new LabeledMarker(
        feature.geometry.coordinates.slice(),
        feature, {
          markerOptions: {color: '#050'},
        });
      marker.addTo(this.map);
    });
    this.isInit = false;
    return;
  }

  getPartLinks(parts, loc) {
    let subpath: string;
    (loc === 'internal') ? subpath = 'interior' : subpath = 'exterior';
    const partLinks = [];
    const path = environment.resourcePath;
    const links = environment.vehicles.parts;
    const vechicleType = environment.vehicles.type[0].toUpperCase();
    parts.forEach(part => {
      const color = part.property;
      const name = part.name;
      partLinks.push(path + vechicleType + '/' + subpath + '/' + color + '/' + links[name]);
    });
    return partLinks;
  }

  markerInsert(meta, parts, view, mapMarkers) {
    const images = parts;
    const location = meta['co_ordinates'].slice();
    let myIcon;
    mergeImages(images).then(base64Image => {
      this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
      if (view === 'external') {
        myIcon = L.icon({
          iconUrl: base64Image,
          iconSize: [120, 80],
          iconAnchor: [60, 40],
          popupAnchor: [-38, -76],
        });
      } else {
        myIcon = L.icon({
          iconUrl: base64Image,
          iconSize: [90, 60],
          iconAnchor: [45, 30],
          popupAnchor: [-38, -76],
        });
      }
      const marker = L.marker(location, {icon: myIcon});
      mapMarkers.push(marker);
      marker.bindTooltip(meta.brand + ' ' + meta.model + ',' + meta.yom).openTooltip();
      marker.addTo(this.map);
    });
  }
}
