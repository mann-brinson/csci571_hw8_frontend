import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueWatchLruComponent } from './continue-watch-lru.component';

describe('ContinueWatchLruComponent', () => {
  let component: ContinueWatchLruComponent;
  let fixture: ComponentFixture<ContinueWatchLruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinueWatchLruComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinueWatchLruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
