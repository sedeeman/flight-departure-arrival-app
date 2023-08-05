import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FlightService } from './services/flight.service';
import { FlightAddComponent } from './flight-add/flight-add.component';
import { FlightStatusUpdateComponent } from './flight-status-update/flight-status-update.component';
import { FlightStatusSubscribeComponent } from './flight-status-subscribe/flight-status-subscribe.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'flight-arrival-departure-app';
  defaultPageSize: number = 20;
  displayedColumns: string[] = [
    'flightNumber',
    'scheduledTime',
    'flightType',
    'airportCode',
    'location',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _flightService: FlightService) {}

  ngOnInit(): void {
    this.getAllFlights();
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
        console.log(val);
      },
      error: console.log,
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

  startDownload(){
    this._flightService.downloadFlightData();
  }

}
