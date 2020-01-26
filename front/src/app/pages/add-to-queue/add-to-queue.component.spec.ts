import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToQueueComponent } from './add-to-queue.component';

describe('AddToQueueComponent', () => {
  let component: AddToQueueComponent;
  let fixture: ComponentFixture<AddToQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddToQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
