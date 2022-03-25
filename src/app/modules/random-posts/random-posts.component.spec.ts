import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomPostsComponent } from './random-posts.component';

describe('RandomPostsComponent', () => {
  let component: RandomPostsComponent;
  let fixture: ComponentFixture<RandomPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
