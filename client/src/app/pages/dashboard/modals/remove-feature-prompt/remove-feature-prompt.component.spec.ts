import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveFeaturePromptComponent } from './remove-feature-prompt.component';

describe('RemoveFeaturePromptComponent', () => {
  let component: RemoveFeaturePromptComponent;
  let fixture: ComponentFixture<RemoveFeaturePromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveFeaturePromptComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveFeaturePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
