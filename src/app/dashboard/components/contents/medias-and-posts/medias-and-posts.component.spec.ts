import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediasAndPostsComponent } from './medias-and-posts.component';

describe('MediasAndPostsComponent', () => {
  let component: MediasAndPostsComponent;
  let fixture: ComponentFixture<MediasAndPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediasAndPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediasAndPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
