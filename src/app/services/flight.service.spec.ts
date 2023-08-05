import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FlightService } from './flight.service';
import { HttpResponse } from '@angular/common/http';

describe('FlightService', () => {
  let service: FlightService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlightService],
    });
    service = TestBed.inject(FlightService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all flights', () => {
    const dummyResponse = {};

    service.getAllFlights().subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/flights');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });


  it('should search flight data', () => {
    const dummyResponse = {};

    service.searchFlightData().subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/flights/search');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should add a flight', () => {
    const dummyData = {};
    const dummyResponse = {};

    service.addFlight(dummyData).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/flights');
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should update flight status', () => {
    const dummyData = {};
    const dummyResponse = {};

    service.updateFlightStatus(dummyData).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(
      `http://localhost:3001/api/flights/flight-status`
    );
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should subscribe to flight status', () => {
    const dummyData = {};
    const dummyResponse = {};

    service.subscribeToFlightStatus(dummyData).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(
      `http://localhost:3001/api/flights/subscribe`
    );
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  describe('FlightService', () => {
    let service: FlightService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      service = TestBed.inject(FlightService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should download flight data', () => {
      const dummyResponse: HttpResponse<Blob> = new HttpResponse<Blob>({
        body: new Blob(),
        status: 200,
      });

      service.downloadFlightData().subscribe((response) => {
        expect(response).toEqual(dummyResponse);
      });

      const req = httpMock.expectOne('http://localhost:3000/api/flights/download');
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });
  });





});
