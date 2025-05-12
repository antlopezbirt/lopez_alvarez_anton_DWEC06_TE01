import { Component, ViewChildren, QueryList, AfterContentChecked } from '@angular/core';
import { ToastService } from '../services/toasts.service';

@Component({
  selector: 'app-toast-contenedor',
  standalone: false,
  templateUrl: './toast-contenedor.component.html',
  styleUrl: './toast-contenedor.component.css',
  providers: [ToastService]
})
export class ToastContenedorComponent {
  constructor( public _toastsService: ToastService) {

  }

  // @ViewChildren('toast') tostadas?: QueryList<any>;

  // ngAfterViewInit() {
  //   this.tostadas.changes.subscribe(t => {
  //     this.ngForRendred();
  //   })
  // }

  // ngForRendred() {
  //   console.log('NgFor is Rendered');
  //   this._toastsService.toasts = [];
  // }


}
