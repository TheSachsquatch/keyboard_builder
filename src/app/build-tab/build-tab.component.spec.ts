import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildTabComponent } from './build-tab.component';

describe('BuildTabComponent', () => {
  let component: BuildTabComponent;
  let fixture: ComponentFixture<BuildTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
