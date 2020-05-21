import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeberListComponent } from './memeber-list.component';

describe('MemeberListComponent', () => {
  let component: MemeberListComponent;
  let fixture: ComponentFixture<MemeberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemeberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
