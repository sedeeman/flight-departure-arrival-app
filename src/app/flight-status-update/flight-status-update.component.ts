import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/core/core.service';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-flight-status-update',
  templateUrl: './flight-status-update.component.html',
  styleUrls: ['./flight-status-update.component.scss'],
})
export class FlightStatusUpdateComponent {
  flightStatusUpdateForm: FormGroup;

  flightStatus: string[] = ['SCHEDULED', 'ARRIVAL', 'DEPARTURE', 'DELAY'];

  constructor(
    private _formBuilder: FormBuilder,
    private _flightService: FlightService,
    private _dialogRef: MatDialogRef<FlightStatusUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.flightStatusUpdateForm = this._formBuilder.group({
      flightNumber: '',
      status: '',
    });
  }

  ngOnInit(): void {
    this.flightStatusUpdateForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.flightStatusUpdateForm.valid) {
      this._flightService
        .updateFlightStatus(this.flightStatusUpdateForm.value, this.data.flightId)
        .subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Flight status updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
    }
  }
}
