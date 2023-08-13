import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FlightService } from './services/flight.service';
import { FlightAddComponent } from './flight-add/flight-add.component';
import { FlightStatusUpdateComponent } from './flight-status-update/flight-status-update.component';
import { FlightStatusSubscribeComponent } from './flight-status-subscribe/flight-status-subscribe.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { KeycloakService } from 'keycloak-angular';
import { ExportService } from './services/export.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public hasAdminRole: boolean = false;
  title: string = 'flight-arrival-departure-app';
  defaultPageSize: number = 20;
  displayedColumns: string[] = [
    'flightNumber',
    'originLocation',
    'destinationLocation',
    'flightType',
    'terminalGate',
    'arrivalTime',
    'departureTime',
    'status',
  ];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly _keycloak: KeycloakService,
    private _exportService: ExportService,
    private _dialog: MatDialog,
    private _flightService: FlightService
  ) {}

  ngOnInit(): void {
    this.hasAdminRole = this._keycloak.getUserRoles().includes('admin');
    this.getAllFlights();
  }

  public async logout() {
    this._keycloak.logout();
 }

  openFlightAddForm() {
    const dialogRef = this._dialog.open(FlightAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllFlights();
        }
      },
    });
  }

  getAllFlights() {
    this._flightService.getAllFlights().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openFlightEditForm(data: any) {
    const dialogRef = this._dialog.open(FlightStatusUpdateComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        this.getAllFlights();
      },
      error: console.log,
    });
  }

  openFlightSearchForm(): void {
    const dialogRef = this._dialog.open(FlightSearchComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val != null && val.data.length > 0) {
          // Set search results
          this.dataSource = new MatTableDataSource(val.data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      },
    });
  }

  openFlightSubscribeForm() {
    const dialogRef = this._dialog.open(FlightStatusSubscribeComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        console.log(val);
      },
      error: console.log,
    });
  }

  exportToCsv(): void {
    this._exportService.exportToCsv(this.dataSource.data, 'flight-data', ['flightId', 'flightNumber', 'originLocation', 'destinationLocation','flightType','terminalGate','arrivalTime','departureTime','status','delayed']);
  }

}
