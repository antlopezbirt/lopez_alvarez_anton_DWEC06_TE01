import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioFormComponent } from './comentario-form-nuevo.component';

describe('ComentarioFormComponent', () => {
  let component: ComentarioFormComponent;
  let fixture: ComponentFixture<ComentarioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComentarioFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
