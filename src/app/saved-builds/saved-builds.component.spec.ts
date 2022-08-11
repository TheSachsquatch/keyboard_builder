import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedBuildsComponent } from './saved-builds.component';

describe('SavedBuildsComponent', () => {
  let component: SavedBuildsComponent;
  let fixture: ComponentFixture<SavedBuildsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedBuildsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedBuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
