/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import {  DebugElement , CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

import {PlaceComponent} from './place.component';


describe('PlaceComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlaceComponent
      ],
       schemas: [CUSTOM_ELEMENTS_SCHEMA ]
    });
  });

  it('should create the place component', async(() => {
    let fixture = TestBed.createComponent(PlaceComponent);
    let place = fixture.debugElement.componentInstance;
    expect(place).toBeTruthy();
  }));
  
  it('should render common place information', async(() => {
    let fixture = TestBed.createComponent(PlaceComponent);
    let place = fixture.debugElement.componentInstance;
    
    let img ="image_url";
    let name ="test name";
    let address ="test address";
    let placeObject ={ "icon":img, "name": name, "formatted_address": address};
    place.place = placeObject;
    
    fixture.detectChanges();
    
     let imgElement = fixture.debugElement.query(By.css('img'));
     expect(imgElement.nativeElement.src).toMatch(".*"+img+"$");
     
     let nameElement = fixture.debugElement.query(By.css('#name'));
     expect(nameElement.nativeElement.textContent).toEqual("Name: "+name);
     
     let addresElement = fixture.debugElement.query(By.css('#address'));
     expect(addresElement.nativeElement.textContent).toEqual("Address: "+address);
     
     let ratingElement = fixture.debugElement.query(By.css('#rating'));
     let photosElement = fixture.debugElement.query(By.css('#photos'));
     expect(ratingElement).toEqual(null);
     expect(photosElement).toEqual(null);
  }));
  
  it('should render rating', async(() => {
    let fixture = TestBed.createComponent(PlaceComponent);
    let place = fixture.debugElement.componentInstance;
    
    let rating = 17;
    let placeObject ={ "rating":rating};
    place.place = placeObject;
    
    fixture.detectChanges();
    
     let ratingElement = fixture.debugElement.query(By.css('#rating'));
     expect(ratingElement.nativeElement.textContent).toEqual("Rating: "+rating);
  }));
  
  it('should render photos', async(() => {
    let fixture = TestBed.createComponent(PlaceComponent);
    let place = fixture.debugElement.componentInstance;
    
    let link1 ="test link";
    let link2 ="<a href=\"ref\">link</a>";
    let photos = [ {"html_attributions": link1}, {"html_attributions": link2} ];
    let placeObject ={ "photos":photos};
    place.place = placeObject;
    
    fixture.detectChanges();
    
     let ratingElement = fixture.debugElement.query(By.css('#photos'));
     let photoElements= ratingElement.queryAll(By.css('div'));
     expect(photoElements[0].nativeElement.textContent).toEqual(link1);
     expect(photoElements[0].nativeElement.innerHTML).toEqual(link1);
     expect(photoElements[1].nativeElement.innerHTML).toEqual(link2);
  }));

});

