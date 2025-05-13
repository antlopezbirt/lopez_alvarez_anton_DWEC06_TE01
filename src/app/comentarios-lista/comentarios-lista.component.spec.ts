import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentariosListaComponent } from './comentarios-lista.component';

describe('ListacomentariosComponent', () => {
  let component: ComentariosListaComponent;
  let fixture: ComponentFixture<ComentariosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComentariosListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentariosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
