import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  constructor(private _http: HttpClient) {}

  getAllFlights(): Observable<any> {
    return this._http.get('http://localhost:3000/api/flights');
  }

  searchFlightData(): Observable<any> {
    return this._http.get('http://localhost:3000/api/flights/search');
  }

  addFlight(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/api/flights', data);
  }

  updateFlightStatus(data: any): Observable<any> {
    return this._http.post(
      `http://localhost:3001/api/flights/flight-status`,
      data
    );
  }

  subscribeToFlightStatus(data: any): Observable<any> {
    return this._http.post(`http://localhost:3001/api/flights/subscribe`, data);
  }

  downloadFlightData(): Observable<HttpResponse<Blob>> {
    return this._http
      .get('http://localhost:3000/api/flights/download', {
        responseType: 'blob',
        observe: 'response',
      })
      .pipe(
        tap((response: HttpResponse<Blob>) => {
          this.downloadFile(response);
        })
      );
  }

  private downloadFile(response: HttpResponse<Blob>) {
    const anchor = document.createElement('a');
    const blob = new Blob([response.body!], {
      type: 'application/octet-stream',
    });

    const downloadUrl = URL.createObjectURL(blob);
    anchor.href = downloadUrl;
    anchor.download = 'flight_data.csv';

    document.body.appendChild(anchor);
    anchor.click();

    URL.revokeObjectURL(downloadUrl);
    document.body.removeChild(anchor);
  }
}
