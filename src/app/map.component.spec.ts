/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import {  DebugElement , CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import {MapComponent} from './map.component';



describe('MapComponent Karma Tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapComponent
      ],
       schemas: [CUSTOM_ELEMENTS_SCHEMA ]
    });
  });
  
   it('should create the map component', async(() => {
    let fixture = TestBed.createComponent(MapComponent);
    let map = fixture.debugElement.componentInstance;
    expect(map).toBeTruthy();
  }));
  
  it('should be the same map object in map-search web component when map is ready', async(() => {
    let fixture = TestBed.createComponent(MapComponent);
    let map = fixture.debugElement.componentInstance;
    
    let mapObject = { "some_prop":"foo"};
    fixture.debugElement.query(By.css('google-map')).nativeElement.map = mapObject;
    
    map.mapReady();
    fixture.detectChanges();
     
    let searchMapObject = fixture.debugElement.query(By.css('google-map-search')).nativeElement.map;
    expect(searchMapObject).toBe(mapObject);
  }));
  
  it('should set "results" property when map-search provides the search result', async(() => {
    let fixture = TestBed.createComponent(MapComponent);
    let map = fixture.debugElement.componentInstance;
    
    let detail = [ {"prop":"test value"} ];
    let result = { "detail":  detail };
    fixture.debugElement.query(By.css('google-map-search')).triggerEventHandler('google-map-search-results',result);
    
    fixture.detectChanges();
     
    expect(map.results).toBe(detail);
  }));
  
  it('should set "latitude" and "longitude" properties on click map element', async(() => {
    let fixture = TestBed.createComponent(MapComponent);
    let map = fixture.debugElement.componentInstance;
    
    let lat =37;
	let lng = 73;
    let event={ "detail":{ "latLng": { "lat":function(){return lat;}, "lng": function(){return lng;} }} }; 
    let googleMapElement = fixture.debugElement.query(By.css('google-map'));
    googleMapElement.triggerEventHandler('google-map-click',event);
    
    fixture.detectChanges();
     
    expect(map.latitude).toBe(lat);
    expect(map.longitude).toBe(lng);
    
    expect(googleMapElement.nativeElement.latitude).toBe(lat);
    expect(googleMapElement.nativeElement.longitude).toBe(lng);
  }));
  
  it('should show markers on the map based on results', async(() => {
    let fixture = TestBed.createComponent(MapComponent);
    let map = fixture.debugElement.componentInstance;
    
    let results = [ { "latitude": 3, "longitude":11, "name": "bar" },
    						{ "latitude": 53, "longitude":29, "name": "foo" }  ];
    map.results = results;
    
    fixture.detectChanges();
    
    let markers = fixture.debugElement.queryAll(By.css('google-map-marker'));
    
    expect(markers[0].nativeElement.latitude).toBe(results[0].latitude);
    expect(markers[0].nativeElement.longitude).toBe(results[0].longitude);
    expect(markers[0].nativeElement.title).toBe(results[0].name);
    
    expect(markers[1].nativeElement.latitude).toBe(results[1].latitude);
    expect(markers[1].nativeElement.longitude).toBe(results[1].longitude);
    expect(markers[1].nativeElement.title).toBe(results[1].name);
  }));
  
  it('should show markers on the map based on results',  done => {
    let fixture = TestBed.createComponent(MapComponent);
    let map = fixture.debugElement.componentInstance;
    
    let results = [ { "latitude": 3, "longitude":11, "name": "bar" },
    						{ "latitude": 53, "longitude":29, "name": "foo" }  ];
    map.results = results;
    
    map.markerSelected.subscribe( result => {
    	expect(result).toBe(results[1]);
    	done();
    });
    
    fixture.detectChanges();
    
    let markers = fixture.debugElement.queryAll(By.css('google-map-marker'));
    markers[1].triggerEventHandler('google-map-marker-click',null);
   });

});

describe('MapComponent', ()=> {
	let component = new MapComponent();
	
	it('should set coordinate properties on map click', ()=> {
	    let lat =37;
	    let lng = 73;
		let event={ "detail":{ "latLng": { "lat":function(){return lat;}, "lng": function(){return lng;} }} }; 
		component.onMapClick(event);
		expect(component.latitude).toBe(lat);
		expect(component.longitude).toBe(lng);
	});
	
	it('should set search result', ()=> {
	    let detail  = {"lat":3, "lng":83};
		let event={"detail": [detail] }; 
		component.setSearchResult(event);
		expect(component.results).toEqual( [detail] );
	});
});
