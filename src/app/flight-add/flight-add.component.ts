import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlightService } from '../services/flight.service';
import { CoreService } from 'src/core/core.service';

@Component({
  selector: 'app-flight-add',
  templateUrl: './flight-add.component.html',
  styleUrls: ['./flight-add.component.scss'],
})
export class FlightAddComponent implements OnInit {
  flightForm: FormGroup;
  flightStatusList: String[] = ['SCHEDULED','ARRIVAL','DEPARTURE','DELAY'];

  constructor(
    private _formBuilder: FormBuilder,
    private _flightService: FlightService,
    private _dialogRef: MatDialogRef<FlightAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.flightForm = this._formBuilder.group({
      flightNumber:'',
      originLocation:'',
      destinationLocation:'',
      flightType:'',
      terminalGate:'',
      arrivalTime:'',
      departureTime:'',
      status:'',
    });
  }

  ngOnInit(): void {
    this.flightForm.patchValue(this.data);
    this.flightForm.controls['status'].setValue('SCHEDULED');
  }

  onFormSubmit() {
    if (this.flightForm.valid) {
      this._flightService.addFlight(this.flightForm.value).subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar(`Flight ${val.data.flightNumber} added successfully`);
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}
