import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeletComponent } from './dialog-delet.component';

describe('DialogDeletComponent', () => {
  let component: DialogDeletComponent;
  let fixture: ComponentFixture<DialogDeletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
