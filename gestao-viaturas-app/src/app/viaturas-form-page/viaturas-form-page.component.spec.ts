import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViaturasFormPageComponent } from './viaturas-form-page.component';

describe('ViaturasFormPageComponent', () => {
  let component: ViaturasFormPageComponent;
  let fixture: ComponentFixture<ViaturasFormPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViaturasFormPageComponent]
    });
    fixture = TestBed.createComponent(ViaturasFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
