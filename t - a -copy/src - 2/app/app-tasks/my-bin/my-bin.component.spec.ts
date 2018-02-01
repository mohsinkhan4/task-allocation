import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBinComponent } from './my-bin.component';

describe('MyBinComponent', () => {
  let component: MyBinComponent;
  let fixture: ComponentFixture<MyBinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
