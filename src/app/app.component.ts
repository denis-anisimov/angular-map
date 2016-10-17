import { Component , ElementRef } from '@angular/core';
import {MapComponent} from './map.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

    query : string ="";
    place: any;

	search(query: string): void{
		this.query=query;
		this.place = null;
	} 
	
	onResultSelect(result:any):void{
		this.place=result;
	}
}
