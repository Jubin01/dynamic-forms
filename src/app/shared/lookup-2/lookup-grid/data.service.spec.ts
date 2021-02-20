import { TestBed } from '@angular/core/testing';
import { LookupGridDataService2 } from './data.service';



describe('LookupGridDataService2', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LookupGridDataService2 = TestBed.get(LookupGridDataService2);
    expect(service).toBeTruthy();
  });

  it('should check if fetchAllData function exists', () => {
    const service: LookupGridDataService2 = TestBed.get(LookupGridDataService2);
    expect(service.fetchAllData).toBeTruthy();
  });
});
