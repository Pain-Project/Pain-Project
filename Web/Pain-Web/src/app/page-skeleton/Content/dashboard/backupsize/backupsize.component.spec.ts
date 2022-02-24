import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackupsizeComponent } from './backupsize.component';

describe('BackupsizeComponent', () => {
  let component: BackupsizeComponent;
  let fixture: ComponentFixture<BackupsizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackupsizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackupsizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
