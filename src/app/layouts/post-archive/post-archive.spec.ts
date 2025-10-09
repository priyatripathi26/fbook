import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostArchive } from './post-archive';

describe('PostArchive', () => {
  let component: PostArchive;
  let fixture: ComponentFixture<PostArchive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostArchive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostArchive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
