import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersArchive } from './users-archive';

describe('UsersArchive', () => {
  let component: UsersArchive;
  let fixture: ComponentFixture<UsersArchive>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersArchive]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersArchive);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
