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
      minZoom: 17,
      maxZoom: 20,
      pitch: 45,
      bearing: -20,
      attributionControl: false,
      maxBounds: [
        [15.55, 58.39],
        [15.60, 58.42]
      ]
    });

    this.map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

    // Hämta alla bolag och ladda kartan parallellt
    Promise.all([
      this.fetchAllExhibitors(),
      new Promise<void>(resolve => this.map.on('load', () => resolve()))
    ]).then(() => {
      this.loadRooms();
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
  // Ingen färgändring behövs
  // Bilderna hanteras av reloadExhibitorImages + booths-logos lagret
  // Uppdatera bara source så lagret ritas om
  const source = this.map.getSource('booths') as any;
  if (!source || !this.boothsGeoJson) return;
  source.setData(this.boothsGeoJson); // ← ingen modifiering av features
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
          minzoom: 18.2,
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
          fetch('/assets/lounges.geojson').then(res => res.json()),
          fetch('/assets/Lounger2-improved.geojson').then(res => res.json()),
        ]).then(([lounges1, lounges2]) => {
          const loungeData = {
            type: 'FeatureCollection',
            features: [...lounges1.features, ...lounges2.features]
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
            minzoom: 18.2,
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

  private loadBooths(): void {
  fetch('/assets/booths-circles.geojson')
    .then(res => res.json())
    .then(data => {
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
}