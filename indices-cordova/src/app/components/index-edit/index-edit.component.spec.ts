import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexEditComponent } from './index-edit.component';

describe('IndexEditComponent', () => {
  let component: IndexEditComponent;
  let fixture: ComponentFixture<IndexEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
