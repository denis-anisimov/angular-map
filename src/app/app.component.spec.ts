/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import {  DebugElement , CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import { AppComponent } from './app.component';
import {MapComponent} from './map.component';
import {PlaceComponent} from './place.component';


describe('App: AngJs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, 
        MapComponent, 
        PlaceComponent
      ],
       schemas: [CUSTOM_ELEMENTS_SCHEMA ]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have empty query`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.query).toEqual('');
  }));

 
  it('should set query on change in search box', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let compiled = fixture.debugElement.query(By.css('#search-box'));
    
    let map = fixture.debugElement.query(By.directive(MapComponent));
    
    let query='pizza';
    compiled.nativeElement.value = query;
    
    compiled.triggerEventHandler('change', null);
    
    fixture.detectChanges();
    
    expect(fixture.componentInstance.query).toBe(query);
 	expect(fixture.componentInstance.place).toBe(null);
 	
 	expect(map.componentInstance.query).toBe(query);
  }));
  
   it('should not be a place component when there is no place set', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    
    let place = fixture.debugElement.query(By.directive(PlaceComponent));
    fixture.detectChanges();
    
    expect(place).toBe(null);
   }));
   
   it('should set place property to marker result object when marker is selected', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    
    let compiled = fixture.debugElement.query(By.css('app-map'));
    let result ={ "lat": 2, "lng": 7};
    compiled.triggerEventHandler('markerSelected', result);
    
    fixture.detectChanges();
    
    let place = fixture.debugElement.query(By.directive(PlaceComponent));
    
    expect(place.componentInstance.place).toBe(result);
   }));
  
});

describe('AppComponent', ()=> {
	let component = new AppComponent();
	
	it('search request reset place and set query property', ()=> {
		let query='pizza'; 
		component.place = {};
		component.search(query);
		expect(component.query).toBe(query);
		expect(component.place).toBe(null);
	});
	
    it('onResultSelect set place property to result', ()=> {
		let result={ "lat": 1, "lng": 2}; 
		component.onResultSelect(result);
		expect(component.place).toBe(result);
	});
});
