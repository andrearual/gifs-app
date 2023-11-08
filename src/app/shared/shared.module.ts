//Agular
import { NgModule } from '@angular/core';
//Module
import { CommonModule } from '@angular/common';
//Component
import { LazyImageComponent } from './components/lazy-image/lazy-image.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    LazyImageComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    LazyImageComponent
  ]
})
export class SharedModule { }
