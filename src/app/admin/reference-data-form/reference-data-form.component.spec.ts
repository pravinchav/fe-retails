import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceDataFormComponent } from './reference-data-form.component';

describe('ReferenceDataFormComponent', () => {
  let component: ReferenceDataFormComponent;
  let fixture: ComponentFixture<ReferenceDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenceDataFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferenceDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
