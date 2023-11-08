import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
  <h5> Buscar: </h5>
  <input type="text"
  class="form-control"
  placeholder="Buscar gifs..."
  (keyup.enter)="searchTab()"
  #txtTabInput
  > `
})

export class SearchBoxComponent {
  @ViewChild('txtTabInput')
  public tagInput!: ElementRef<HTMLInputElement>; //me marca error que puede no estar inicializado o puede ser null,
  // yo le puedo decir que siempre va tener un valor con el símbolo !



  constructor( private gifsService: GifsService) { }

  // Al definir el 'public tagInput!: ElementRef<HTMLInputElement>;', ya no ocupamos pasar por parametro el valor
  // podemos utilizar nuestra nueva variable y el método cambia y queda como el de abajo
  // searchTab(newTag:string):void {
  //   console.log( {newTag} );
  // }

    searchTab():void {
      const newTag = this.tagInput.nativeElement.value
      // se llama el sevicio que es el encargado de almacenar la información
      // El servicio hay que inyectarlo y se inyecra en el constructor.
      this.gifsService.searchTag(newTag);
      console.log( {newTag} );
      this.tagInput.nativeElement.value =''; // se limpia la caja de texto
    }

}
