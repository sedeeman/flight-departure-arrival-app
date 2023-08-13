import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  constructor(private _http: HttpClient) {}

  getAllFlights(): Observable<any> {
    return this._http.get('http://localhost:3000/api/flight-service');
  }

  searchFlightData(data:any): Observable<any> {
    return this._http.get(this.createSearchUri(data));
  }

  addFlight(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/api/flight-service', data);
  }

  updateFlightStatus(data: any,id:number): Observable<any> {
    return this._http.patch(
      `http://localhost:3000/api/flight-service/${id}`,
      data
    );
  }

  subscribeToFlightStatus(data: any): Observable<any> {
    return this._http.post(`http://localhost:3001/api/flight-notification-service/subscribe`, data);
  }

  private createSearchUri(data:any){

    const queryParams = [];
    if (data.flightNumber) {
      queryParams.push(`flightNumber=${data.flightNumber}`);
    }
    if (data.status) {
      queryParams.push(`status=${data.status}`);
    }
    if (data.flightType) {
      queryParams.push(`flightType=${data.flightType}`);
    }
    if (data.originLocation) {
      queryParams.push(`originLocation=${data.originLocation}`);
    }
    if (data.destinationLocation) {
      queryParams.push(`destinationLocation=${data.destinationLocation}`);
    }
    if (data.terminalGate) {
      queryParams.push(`terminalGate=${data.terminalGate}`);
    }

    const queryParamString = queryParams.join('&');
    const uri = `http://localhost:3000/api/flight-service/search?${queryParamString}`;

    return uri;
  }


}
