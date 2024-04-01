import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor ( private gifsService: GifsService ){

  }

  get tags(): String[] {
    return this.gifsService.tagsHistory;
  }

  /**
   * useTag
   * Funcion para reutilizar el tag
   */
  useTag( tag: string):void {
    this.gifsService.searchTag( tag );
  }

}
