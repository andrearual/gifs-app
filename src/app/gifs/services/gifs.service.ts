import { Gif, SearchResponse } from './../interfaces/gifs.interfaces';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from "@angular/common/http";

// Otra forma de accederlo
//const GIPHY_API_KEY = 'jihIgDGo3OedoTJRrsHVQGRjbB4uFdj3';

@Injectable({providedIn: 'root'}) // cuando usamos el root -> hacemos que el servicio (GifsService), este
// disponible a lo largo de toda la apliacion y todos los modulos que inyecten este servicio, si no se pone
// hay que proveer el servicio en el module (gifs.module.ts) y hacerlo manual.
export class GifsService {

  private _tagsHistory: string [] = [];
  // se crea privado para evitar que en algún componente modifiquen directa la propiedad
  // no se recomienda que se hagan cambios de manera directa por que puede dar error a nivel de angular
  // y agular no lo dectecte como algo correcto.

  public gifList : Gif[] = [];  // * es volatil y cambia, cada vez que descargue o haga solicitud nueva la lista se va volver a crear (sibre escrita)
  private apiKey:     string = 'jihIgDGo3OedoTJRrsHVQGRjbB4uFdj3';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient){
    this.loadLocalStorage();
    console.log("Gifs server ready");
  }

  get tagsHistory() {
    return [...this._tagsHistory]; // * _tagsHistory esto no cambia, a menos que yo lo quiera cambiar
    // los arreglos pasan por referencias [...] da mayor control y seguridad de los elementos.
    // buena practica, se utiliza el operador splet para crear una copia el _tagsHistory y pasarlo por referencia.
  }

  private organizeHistory (tag :string) : void {
    // se pasa  javascript es case sensity
    // entoces se pasa en minuscula para que sea mas facil de buscar y remover
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag != tag);
    }
    this._tagsHistory.unshift( tag );
    this._tagsHistory = this._tagsHistory.slice(0,10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  // lo llamamos en el contructo para que se haga al inicio y una vez.
  private loadLocalStorage(): void {
    if ( !localStorage.getItem('history') ) return; // se valida que si no existe el Key, se salga

    // el dice que puede retornar null, cuando el key no se encuentra retorna nulll.
    // le indicamos que va taer siemore datos con el simbolo de ! al final.
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if (this._tagsHistory.length === 0) return;

    this.searchTag(this._tagsHistory[0]);
  }

  // el trabajo de la funcion es unicamente buscar
  // no ordena
  async searchTag(tag: string) : Promise<void> {
    if (tag.length === 0) return;
    this.organizeHistory (tag);
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=jihIgDGo3OedoTJRrsHVQGRjbB4uFdj3&q=valorant&limit=10')
    //   .then( resp => resp.json() )
    //   .then( data => console.log(data) );
    //console.log('GifsService: searchTag : array:' +  this._tagsHistory );

    // esto es un observable : objeto que al largo de tiempo puede emitir valores a lo largo de su vida.
    // las peticiones de http debe de trabajarse así pq el paquete de http de angular es muy poderoso, es lo mas comun afuera
    // this.http.get(  `${ this.serviceUrl }/search?api_key=jihIgDGo3OedoTJRrsHVQGRjbB4uFdj3&q=valorant&limit=10`)
    // cambio

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    // this.http.get(  `${ this.serviceUrl }/search`,{params}) // se puede dejar así  pq tiene el mismo nombre
    // .subscribe( (resp) => {
    //   console.log(resp);

    // })
    //this.http.get(  `${ this.serviceUrl }/search`,{ params: params })

    //se le indica que tipo de datos va a devolver, para poder manejarlo mas facil.
    this.http.get<SearchResponse>(  `${ this.serviceUrl }/search`,{ params: params })
      .subscribe( (resp) => {
        //console.log(resp.data);
        //console.log(resp.patito);
        this.gifList = resp.data;
        //console.log( {gifs : this.gifList} );
      })
  }




}
