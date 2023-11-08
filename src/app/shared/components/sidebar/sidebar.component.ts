import { Component, ViewChild, ElementRef } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public tabList: string[] = [''];

  constructor(private gifsService: GifsService) {

    const firtElement = "Valorant";
    this.searchTab(firtElement);
  }

  // ATRIBUTO: este es un get que se utiliza como atributo desdes el lado de HTML en el ng-for
  get tags() : string[] {
    return this.gifsService.tagsHistory;
  }
  searchTab(tag: string):void {
    this.gifsService.searchTag(tag);
    console.log( {tag} );
  }

}
