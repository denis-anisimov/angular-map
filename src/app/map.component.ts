import { Component , ElementRef, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Result } from './result.ts';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

   @ViewChild('mymap') map:ElementRef;
   @ViewChild('mysearch') search:ElementRef;
   
   latitude : number =37.77493;
   longitude: number = -122.41942;
   
   @Input()
   query: string;
   
   @Output()
   private markerSelected:EventEmitter<any> = new EventEmitter();
   
   results: Result[];
   
   ngOnInit(): void {
   }
   
   mapReady():void {
   	this.search.nativeElement.map = this.map.nativeElement.map;
   }
   
  onMapClick(event: any): void {
  	this.latitude = event.detail.latLng.lat();
  	this.longitude = event.detail.latLng.lng();
  }
  
  onMapDblClick(event: any) :void {
   // is not used at the moment
  }
  
  setSearchResult(event:any):void {
  	this.results = event.detail; 
  }
  
  onMarkerClick(result: any):void {
  	this.markerSelected.emit(result);
  }
}
