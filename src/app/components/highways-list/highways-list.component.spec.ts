import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighwaysListComponent } from './highways-list.component';

describe('HighwaysListComponent', () => {
  let component: HighwaysListComponent;
  let fixture: ComponentFixture<HighwaysListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HighwaysListComponent]
    });
    fixture = TestBed.createComponent(HighwaysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
