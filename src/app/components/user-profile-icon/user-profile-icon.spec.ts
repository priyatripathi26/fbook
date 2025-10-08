import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileIcon } from './user-profile-icon';

describe('UserProfileIcon', () => {
  let component: UserProfileIcon;
  let fixture: ComponentFixture<UserProfileIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
