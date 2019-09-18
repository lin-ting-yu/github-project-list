import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { ListCardComponent } from './list-card/list-card.component';
import { FormModule } from './form/form.module';
import { ButtonComponent } from './button-content/button/button.component';
import { ButtonContentComponent } from './button-content/button-content.component';


@NgModule({
  declarations: [
    InfiniteScrollComponent,
    ListCardComponent,
    ButtonComponent,
    ButtonContentComponent
  ],
  imports: [
    CommonModule,
    FormModule
  ],
  exports: [
    InfiniteScrollComponent,
    ListCardComponent,
    ButtonComponent,
    ButtonContentComponent
  ]
})
export class ComponentsModule { }
