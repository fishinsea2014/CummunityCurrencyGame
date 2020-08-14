/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Round2Component } from './Round2.component';

describe('Round2Component', () => {
  let component: Round2Component;
  let fixture: ComponentFixture<Round2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Round2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Round2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
