import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: String [] = [];
  private apiKey:       string = 'V6rsAsxXCOJLu6KQxCuCEPOa8UGMJTl4';
  private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready')
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory( tag: string ) {

    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag)
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0 , 10)

    this.saveLocalStorage();
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  }

  private loadLocalStorage():void {

    if ( !localStorage.getItem('history') ) { return }

    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );

    if ( this._tagsHistory.length === 0) {
      return
    }

    this.searchTag(this._tagsHistory[0].toString())
  }

  searchTag( tag: string ):void {

    if ( tag.length === 0 ) return;

    this.organizeHistory(tag);

    /*  Forma de poder realizar el consumo de la API por medio de HTTP, en caso de usar FETCH no se puede detener la consulta
    fetch('https://api.giphy.com/v1/gifs/search?api_key=V6rsAsxXCOJLu6KQxCuCEPOa8UGMJTl4&q=Valorant&limit=1')
    .then( resp => resp.json() )
    .then( data => console.log(data)); */
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', tag);

    this.http.get<SearchResponse>(` ${ this.serviceUrl }/search?`, { params })
    .subscribe( resp => {
      this.gifList = resp.data;
    } );

  }

}
