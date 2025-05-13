import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioFormEditarComponent } from './comentario-form-editar.component';

describe('ComentarioFormEditarComponent', () => {
  let component: ComentarioFormEditarComponent;
  let fixture: ComponentFixture<ComentarioFormEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComentarioFormEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentarioFormEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
