import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveDropmenuPromptComponent } from './remove-dropmenu-prompt.component';

describe('RemoveDropmenuPromptComponent', () => {
  let component: RemoveDropmenuPromptComponent;
  let fixture: ComponentFixture<RemoveDropmenuPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveDropmenuPromptComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveDropmenuPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
