import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from './../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5>Buscar:</h5>
  <input type="text" class="form-control" placeholder="Buscar Gifs..."
  (keyup.enter)="searchTag()"
  #txtTagInput>
  `
})
export class SearchBoxComponent {
  /* Podemos obtener lo que se ingrese en el Input del template con el uso del (key) y viewChild */
  @ViewChild( 'txtTagInput' )
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService) {

  }

  /**
   * searchTag
   * Metodo para obtener el valor del Input
   */
  searchTag():void {
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
  }
}
