import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateImageComponent } from './add-or-update-image.component';

describe('AddOrUpdateImageComponent', () => {
  let component: AddOrUpdateImageComponent;
  let fixture: ComponentFixture<AddOrUpdateImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
