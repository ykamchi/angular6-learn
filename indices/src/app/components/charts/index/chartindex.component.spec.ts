import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartIndexComponent } from './chartindex.component';

describe('TestComponent', () => {
  let component: ChartIndexComponent;
  let fixture: ComponentFixture<ChartIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
