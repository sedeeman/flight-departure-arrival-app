import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/core/core.service';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-flight-status-subscribe',
  templateUrl: './flight-status-subscribe.component.html',
  styleUrls: ['./flight-status-subscribe.component.scss'],
})
export class FlightStatusSubscribeComponent {
  subscribeToFlightStatusForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _flightService: FlightService,
    private _dialogRef: MatDialogRef<FlightStatusSubscribeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.subscribeToFlightStatusForm = this._formBuilder.group({
      flightNumber: '',
      email: '',
      subscribeToDelay: false,
      subscribeToArrival: false,
      subscribeToDeparture: false,
    });
  }

  ngOnInit(): void {
    this.subscribeToFlightStatusForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.subscribeToFlightStatusForm.valid) {
      this._flightService
        .subscribeToFlightStatus(this.subscribeToFlightStatusForm.value)
        .subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Subscribed to flight status updates!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
    }
  }
}
