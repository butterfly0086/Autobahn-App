import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutobahnService } from '../../services/autobahn.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})

export class MapViewComponent implements AfterViewInit {
  private map: L.Map | null = null;
  private iconDefault: L.Icon = L.icon({
    iconRetinaUrl: 'leaflet/marker-icon-2x.png',
    iconUrl: 'leaflet/marker-icon.png',
    shadowUrl: 'leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  });

  roadworkDetail: any | null = null;
  roadworkId: string | null = null;

  constructor (
    private route: ActivatedRoute,
    private autobahnService: AutobahnService,
  ) {}

  ngAfterViewInit(): void {
    this.map = L.map('map').setView([51.1657, 10.4515], 6);

    L.Marker.prototype.options.icon = this.iconDefault;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    this.route.paramMap.subscribe((params) => {
      this.roadworkId = params.get('roadworkId');

      if (this.roadworkId) {
        this.autobahnService.getRoadworkDetail(this.roadworkId).subscribe((data) => {
          this.roadworkDetail = data;

          if (this.roadworkDetail) this.addRoadworkMarkers();
        })
      }
    })
  }

  private addRoadworkMarkers () {
    const map = this.map;

    if (!map) return;

    if (this.roadworkDetail && this.roadworkDetail.coordinate) {
      L.marker([this.roadworkDetail.coordinate.lat, this.roadworkDetail.coordinate.long])
        .bindPopup(this.roadworkDetail.description.join(' '))
        .addTo(map);
    }
  }
}
