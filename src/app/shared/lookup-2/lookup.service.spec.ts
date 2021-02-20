import { TestBed } from '@angular/core/testing';

import { LookupService } from './lookup.service';

describe('LookupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LookupService = TestBed.get(LookupService);
    expect(service).toBeTruthy();
  });

  it('should check if setLookupDataId function exists', () => {
    const service: LookupService = TestBed.get(LookupService);
    expect(service.setLookupDataId).toBeTruthy();
  });

  it('should check if setLookupDataName function exists', () => {
    const service: LookupService = TestBed.get(LookupService);
    expect(service.setLookupDataName).toBeTruthy();
  });

  it('should check if getLookupDataId function exists', () => {
    const service: LookupService = TestBed.get(LookupService);
    expect(service.getLookupDataId).toBeTruthy();
  });

  it('should check if getLookupDataName function exists', () => {
    const service: LookupService = TestBed.get(LookupService);
    expect(service.getLookupDataName).toBeTruthy();
  });

  it('should check if setTextBoxValue function exists', () => {
    const service: LookupService = TestBed.get(LookupService);
    expect(service.setTextBoxValue).toBeTruthy();
  });

});
