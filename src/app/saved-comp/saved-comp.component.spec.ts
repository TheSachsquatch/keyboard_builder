import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedCompComponent } from './saved-comp.component';

describe('SavedCompComponent', () => {
  let component: SavedCompComponent;
  let fixture: ComponentFixture<SavedCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedCompComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
