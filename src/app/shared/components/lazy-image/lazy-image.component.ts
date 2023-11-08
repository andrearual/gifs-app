import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {

  @Input ()
  public url!:string;

  @Input ()
  public alt!:string;

  public hasLoader = false;

  ngOnInit(): void {
    if( !this.url ) throw new Error('URL property is required.');
  }

  onload () {
    // esto es para poder ver somo esta funcionando la carga de imagenes,
    // y lo qe se hizo fue que todoas las imagenes carguen despues de 1 segundo
    setTimeout(() => {
      this.hasLoader = true;
    },1000);

    //this.hasLoader = true;
    //console.log('Image loader');
  }

}
