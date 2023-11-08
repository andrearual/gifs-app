import { Component, Input, OnInit } from '@angular/core';

import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html'
})
export class CardComponent implements OnInit { // Oninit: se ejecuta cuendo el componente se esta iniciacializando.

  @Input()
  public gif!: Gif; // opccional ? o que siempre venga !

  ngOnInit(): void {
    if ( !this.gif ) throw new Error('Gif property is requered');
  }
}
