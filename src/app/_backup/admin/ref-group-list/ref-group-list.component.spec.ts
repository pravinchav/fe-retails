import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefGroupListComponent } from './ref-group-list.component';

describe('RefGroupListComponent', () => {
  let component: RefGroupListComponent;
  let fixture: ComponentFixture<RefGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefGroupListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
