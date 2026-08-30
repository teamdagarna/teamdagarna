import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare const maplibregl: any;

@Component({
  selector: 'app-fairmap-new',
  templateUrl: './fairmap-new.component.html',
  styleUrls: ['./fairmap-new.component.scss']
})
export class FairMapNewComponent implements OnInit, AfterViewInit {
  preselected: string;
  selectedRoom: any = null;
  private map: any;
  private exhibitorMap: Map<string, any> = new Map();

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.preselected = params['preselected'];
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      window.scrollTo(0,0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });

    this.map = new maplibregl.Map({
      container: 'map',
      style: 'https://tiles.openfreemap.org/styles/positron',
      center: [15.5782, 58.4025],
      zoom: 19,
      minZoom: 16,
      maxZoom: 20,
      pitch: 45,
      bearing: -20,
      attributionControl: false,
      maxBounds: [
        [15.55, 58.39],
        [15.60, 58.42]
      ]
    });

    // this.map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

    // Hämta alla bolag och ladda kartan parallellt
    Promise.all([
      this.fetchAllExhibitors(),
      new Promise<void>(resolve => this.map.on('load', () => resolve()))
    ]).then(() => {
      this.loadRooms();
      this.loadAHouse();
      this.loadInfoDesks();
      this.loadOuterFoyer();
    });
  }

  selectedDay: string = '2026-09-22';
  private allExhibitors: any[] = [];
  private boothsGeoJson: any = null;

  private fetchAllExhibitors(): Promise<void> {
    return fetch('https://v3.jexpo.se/team/entities/exhibitors?expand&filter=status:attending')
      .then(res => res.json())
      .then(result => {
        // Spara alla med logoUrl beräknad en gång
        this.allExhibitors = (result.results || []).map((ex: any) => {
          const exhibitorKey = ex.$key?.split('/').pop();
          const logoFile = ex.profile?.logotype?.$file;
          const logoUrl = exhibitorKey && logoFile
            ? `https://v3cdn.jexpo.se/team/storage/exhibitors/${exhibitorKey}/${logoFile}/300`
            : null;
          return { ...ex, logoUrl };
        });

        console.log(`Hämtade ${this.allExhibitors.length} bolag totalt`);
        this.filterByDay(this.selectedDay);
      });
  }

  setDay(day: string): void {
    this.selectedDay = day;
    this.filterByDay(day);
  }

private filterByDay(day: string): void {
  this.exhibitorMap.forEach((ex, boothId) => {
    if (this.map.hasImage(boothId)) {
      this.map.removeImage(boothId);
    }
  });
  this.exhibitorMap.clear();
  this.allExhibitors.forEach((ex: any) => {
    const boothId = String(ex.booth?.name);
    if (!boothId || boothId === 'undefined') return;
    const days = ex.days || [];
    if (days.length === 0 || days.includes(day)) {
      this.exhibitorMap.set(boothId, ex);
    }
  });
  console.log(`Filtrerade till ${this.exhibitorMap.size} bolag för ${day}`);
  this.loadExhibitorImages().then(() => {
    this.updateBoothAppearance();
  });
}

private async loadExhibitorImages(): Promise<void> {
  const promises: Promise<void>[] = [];
  this.exhibitorMap.forEach((ex, boothId) => {
    if (ex.logoUrl) {
      const promise = new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = ex.logoUrl;
        img.onload = () => {
          if (this.map.hasImage(boothId)) {
            this.map.removeImage(boothId); // ← lägg till denna rad
          }
          this.map.addImage(boothId, img);
          resolve();
        };
        img.onerror = () => {
          console.warn(`Kunde inte ladda logga för ${boothId}`);
          resolve();
        };
      });
      promises.push(promise);
    }
  });
  return Promise.all(promises).then(() => {});
}

private updateBoothAppearance(): void {
  const source = this.map.getSource('booths') as any;
  if (!source || !this.boothsGeoJson) return;

  const updated = {
    ...this.boothsGeoJson,
    features: this.boothsGeoJson.features.map((f: any) => {
      const boothId = String(f.properties.id);
      const ex = this.exhibitorMap.get(boothId);
      const isFairFuture = ex?.exposure?.fair_future === true;

      // Byt ut geometrin till stjärna för framtidschansen-bås
      const geometry = isFairFuture ? {
        type: 'MultiPolygon',
        coordinates: [[
          this.generateStarPolygon(
            f.properties['felt:position'] as [number, number],
            f.properties['felt:radius'] * 1.4 // lite större än cirkeln
          )
        ]]
      } : f.geometry;

      return {
        ...f,
        geometry,
        properties: {
          ...f.properties,
          fair_future: isFairFuture
        }
      };
    })
  };
  source.setData(updated);

  // Färgsätt stjärnbåsen guldigt
  this.map.setPaintProperty('booths-fill', 'fill-color', [
    'case',
    ['==', ['get', 'fair_future'], true], 'rgba(255, 215, 0, 0.4)',
    'rgba(255, 255, 255, 0.7)'
  ]);

  this.map.setPaintProperty('booths-outline', 'line-color', [
    'case',
    ['==', ['get', 'fair_future'], true], 'rgba(255, 215, 0, 0.9)',
    '#ffffff'
  ]);
}

  private loadRooms(): void {
    fetch('/assets/all-rooms-no-extras.geojson')
      .then(res => res.json())
      .then(data => {
        this.map.addSource('rooms', { type: 'geojson', data });

        this.map.addLayer({
          id: 'rooms-fill',
          type: 'fill',
          source: 'rooms',
          paint: { 'fill-color': '#E64174', 'fill-opacity': 0.6 }
        });

        this.map.addLayer({
          id: 'rooms-outline',
          type: 'line',
          source: 'rooms',
          paint: { 'line-color': '#C0789E', 'line-width': 1.5 }
        });

        this.map.addLayer({
          id: 'rooms-labels',
          type: 'symbol',
          source: 'rooms',
          minzoom: 18.5,
          filter: ['!=', ['get', 'name'], null],
          layout: {
            'text-field': ['get', 'name'],
            'text-size': 11,
            'text-font': ['Noto Sans Regular'],
            'text-anchor': 'center',
            'text-max-width': 8
          },
          paint: {
            'text-color': '#A0335E',
            'text-halo-color': '#FDF5F8',
            'text-halo-width': 1.5
          }
        });

        const bounds = new maplibregl.LngLatBounds();
        data.features.forEach((feature: any) => {
          this.getCoordinates(feature.geometry).forEach((coord: number[]) => {
            bounds.extend(coord as [number, number]);
          });
        });
        this.map.fitBounds(bounds, { padding: 60, pitch: 45 });

        Promise.all([
          fetch('/assets/All-lounges.geojson').then(res => res.json()),
        ]).then(([lounges1]) => {
          const loungeData = {
            type: 'FeatureCollection',
            features: [...lounges1.features]
          };

          this.map.addSource('lounges', { type: 'geojson', data: loungeData });

          this.map.addLayer({
            id: 'lounges-fill',
            type: 'fill',
            source: 'lounges',
            paint: { 'fill-color': '#E64174', 'fill-opacity': 0.6 }
          });

          this.map.addLayer({
            id: 'lounges-outline',
            type: 'line',
            source: 'lounges',
            paint: { 'line-color': '#C0789E', 'line-width': 1.5 }
          });

          this.map.addLayer({
            id: 'lounges-labels',
            type: 'symbol',
            source: 'lounges',
            minzoom: 17,
            filter: ['!=', ['get', 'name'], null],
            layout: {
              'text-field': ['get', 'name'],
              'text-size': 11,
              'text-font': ['Noto Sans Regular'],
              'text-anchor': 'center',
              'text-max-width': 8
            },
            paint: {
              'text-color': '#A0335E',
              'text-halo-color': '#FDF5F8',
              'text-halo-width': 1.5
            }
          });

          this.loadBooths();
        });
      });
  }

  private generateStarPolygon(center: [number, number], radiusMeters: number): number[][] {
    const spikes = 5;
    const outerR = radiusMeters;
    const innerR = radiusMeters / 2.5;
    const coords: number[][] = [];
    
    // Konvertera meter till grader (approximation)
    const metersPerDegLat = 111320;
    const metersPerDegLng = 111320 * Math.cos(center[1] * Math.PI / 180);
    
    for (let i = 0; i < spikes * 2; i++) {
      const angle = (i * Math.PI / spikes) - Math.PI / 2 + Math.PI;
      const r = i % 2 === 0 ? outerR : innerR;
      const lng = center[0] + (Math.cos(angle) * r) / metersPerDegLng;
      const lat = center[1] + (Math.sin(angle) * r) / metersPerDegLat;
      coords.push([lng, lat]);
    }
    coords.push(coords[0]); // stäng polygonen
    return coords;
  }

  private async loadBooths(): Promise<void> {
    const res = await fetch('/assets/booths-circles.geojson');
    const data = await res.json();
    this.boothsGeoJson = data;
    this.map.addSource('booths', { type: 'geojson', data });

      // Bakgrundscirkeln
      this.map.addLayer({
        id: 'booths-fill',
        type: 'fill',
        source: 'booths',
        paint: { 'fill-color': '#fff', 'fill-opacity': 0.7 }
      });

      this.map.addLayer({
        id: 'booths-outline',
        type: 'line',
        source: 'booths',
        paint: { 'line-color': '#fff', 'line-width': 2, 'line-opacity': 1 }
      });

      // Riktigt lager för loggorna
      this.loadExhibitorImages().then(() => {
        this.map.addLayer({
          id: 'booths-logos',
          type: 'symbol',
          source: 'booths',
          layout: {
            'icon-image': ['to-string', ['get', 'id']],
            'icon-size': [
              'interpolate', ['linear'], ['zoom'],
              16, 0.03,
              17, 0.05,
              18, 0.07,
              19, 0.15,
              20, 0.27
            ],
            'icon-padding': 2,
            'icon-allow-overlap': true,
            'icon-ignore-placement': true,
            'icon-pitch-alignment': 'viewport',
            'icon-rotation-alignment': 'viewport',
            'icon-anchor': 'center'
          }
        });
        this.updateBoothAppearance(); // ← lägg till denna rad
      });

      // Klick-event (Nu på kart-lagret istället)
      this.map.on('click', 'booths-fill', (e: any) => {
        const boothId = String(e.features[0].properties?.id);
        const ex = this.exhibitorMap.get(boothId);
        if (ex) {
          this.selectedRoom = ex;
          //this.cdr.detectChanges();
        }
      });
    }
  

  private getCoordinates(geometry: any): number[][] {
    if (geometry.type === 'Polygon') return geometry.coordinates[0];
    if (geometry.type === 'MultiPolygon') return geometry.coordinates.flat(2);
    return [];
  }

  closePanel(): void {
    this.selectedRoom = null;
    this.cdr.detectChanges();
    window.scrollTo(0,0);
  }

  currentFloor: number = 2;

  private loadAHouse(): void {
    Promise.all([
      fetch('/assets/Group-Rooms-A-Floor2.geojson').then(res => res.json()), // byt till dina filnamn
      fetch('/assets/Group-Rooms-A-Floor3.geojson').then(res => res.json())
    ]).then(([floor2Data, floor3Data]) => {
      this.map.addSource('Group-Rooms-A-Floor2', { type: 'geojson', data: floor2Data });
      this.map.addSource('Group-Rooms-A-Floor3', { type: 'geojson', data: floor3Data });

      // Våning 2 (synlig från start)
      this.map.addLayer({
        id: 'Group-Rooms-A-Floor2-fill',
        type: 'fill',
        source: 'Group-Rooms-A-Floor2',
        paint: { 'fill-color': '#E64174', 'fill-opacity': 0.6 }
      });
      this.map.addLayer({
        id: 'Group-Rooms-A-Floor2-outline',
        type: 'line',
        source: 'Group-Rooms-A-Floor2',
        paint: { 'line-color': '#C0789E', 'line-width': 1.5 }
      });
      this.map.addLayer({
        id: 'Group-Rooms-A-Floor2-labels',
        type: 'symbol',
        source: 'Group-Rooms-A-Floor2',
        minzoom: 18,
        filter: ['!=', ['get', 'name'], null],
        layout: {
          'text-field': ['get', 'name'],
          'text-size': 11,
          'text-font': ['Noto Sans Regular'],
          'text-anchor': 'center',
          'text-max-width': 8
        },
        paint: {
          'text-color': '#A0335E',
          'text-halo-color': '#FDF5F8',
          'text-halo-width': 1.5
        }
      });

      // Våning 3 (dold från start)
      this.map.addLayer({
        id: 'Group-Rooms-A-Floor3-fill',
        type: 'fill',
        source: 'Group-Rooms-A-Floor3',
        layout: { visibility: 'none' },
        paint: { 'fill-color': '#E64174', 'fill-opacity': 0.6 }
      });
      this.map.addLayer({
        id: 'Group-Rooms-A-Floor3-outline',
        type: 'line',
        source: 'Group-Rooms-A-Floor3',
        layout: { visibility: 'none' },
        paint: { 'line-color': '#C0789E', 'line-width': 1.5 }
      });
      this.map.addLayer({
        id: 'Group-Rooms-A-Floor3-labels',
        type: 'symbol',
        source: 'Group-Rooms-A-Floor3',
        minzoom: 18.5,
        filter: ['!=', ['get', 'name'], null],
        layout: {
          visibility: 'none',
          'text-field': ['get', 'name'],
          'text-size': 11,
          'text-font': ['Noto Sans Regular'],
          'text-anchor': 'center',
          'text-max-width': 8
        },
        paint: {
          'text-color': '#A0335E',
          'text-halo-color': '#FDF5F8',
          'text-halo-width': 1.5
        }
      });
    });
  }

  setFloor(floor: number): void {
    this.currentFloor = floor;
    const showFloor2 = floor === 2;

    ['Group-Rooms-A-Floor2-fill', 'Group-Rooms-A-Floor2-outline', 'Group-Rooms-A-Floor2-labels'].forEach(id => {
      this.map.setLayoutProperty(id, 'visibility', showFloor2 ? 'visible' : 'none');
    });
    ['Group-Rooms-A-Floor3-fill', 'Group-Rooms-A-Floor3-outline', 'Group-Rooms-A-Floor3-labels'].forEach(id => {
      this.map.setLayoutProperty(id, 'visibility', showFloor2 ? 'none' : 'visible');
    });
  }

  private loadInfoDesks(): void {
    fetch('/assets/Infodiskar.geojson')
      .then(res => res.json())
      .then(data => {
        this.map.addSource('infodesks', { type: 'geojson', data });

        this.map.addLayer({
          id: 'infodesks-fill',
          type: 'fill',
          source: 'infodesks',
          paint: { 'fill-color': '#1E88E5', 'fill-opacity': 0.7 }
        });

        this.map.addLayer({
          id: 'infodesks-outline',
          type: 'line',
          source: 'infodesks',
          paint: { 'line-color': '#1565C0', 'line-width': 1.5 }
        });

        this.map.addLayer({
          id: 'infodesks-labels',
          type: 'symbol',
          source: 'infodesks',
          minzoom: 17,
          filter: ['!=', ['get', 'name'], null],
          layout: {
            'text-field': ['get', 'name'],
            'text-size': 11,
            'text-font': ['Noto Sans Regular'],
            'text-anchor': 'center',
            'text-max-width': 8
          },
          paint: {
            'text-color': '#0D47A1',
            'text-halo-color': '#F0F8FF',
            'text-halo-width': 1.5
          }
        });
      });
  }

  private loadOuterFoyer(): void {
    fetch('/assets/Utefoajen.geojson')
      .then(res => res.json())
      .then(data => {
        this.map.addSource('outer-foyer', { type: 'geojson', data });

        this.map.addLayer({
          id: 'outer-foyer-fill',
          type: 'fill',
          source: 'outer-foyer',
          paint: { 'fill-color': '#E64174', 'fill-opacity': 0.05 } // knappt synlig
        });

        this.map.addLayer({
          id: 'outer-foyer-labels',
          type: 'symbol',
          source: 'outer-foyer',
          filter: ['!=', ['get', 'name'], null],
          minzoom: 17,
          layout: {
            'text-field': ['get', 'name'],
            'text-size': 13,
            'text-font': ['Noto Sans Regular'],
            'text-anchor': 'center',
            'text-max-width': 8
          },
          paint: {
            'text-color': '#A0335E',
            'text-halo-color': '#FDF5F8',
            'text-halo-width': 1.5
          }
        });
      });
  }
}