import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWithFieldsetComponent } from './input-with-fieldset.component';

describe('InputWithFieldsetComponent', () => {
  let component: InputWithFieldsetComponent;
  let fixture: ComponentFixture<InputWithFieldsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputWithFieldsetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputWithFieldsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
