import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListacomentariosComponent } from './comentarios-lista.component';

describe('ListacomentariosComponent', () => {
  let component: ListacomentariosComponent;
  let fixture: ComponentFixture<ListacomentariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListacomentariosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListacomentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
