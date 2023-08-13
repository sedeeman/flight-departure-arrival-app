import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from 'src/core/core.service';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent {
  flightSearchForm: FormGroup;
  flightStatusList: String[] = ['SCHEDULED','ARRIVAL','DEPARTURE','DELAY'];

  constructor(
    private _formBuilder: FormBuilder,
    private _flightService: FlightService,
    private _dialogRef: MatDialogRef<FlightSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.flightSearchForm = this._formBuilder.group({
      flightNumber:'',
      originLocation:'',
      destinationLocation:'',
      flightType:'',
      terminalGate:'',
      status:'',
    });
  }

  ngOnInit(): void {
    this.flightSearchForm.patchValue(this.data);
  }

  onSearchFormSubmit() {
    if (this.flightSearchForm.valid) {
      this._flightService.searchFlightData(this.flightSearchForm.value).subscribe({
        next: (val: any) => {
           if(val != null && val.data.length > 0){
            this._coreService.openSnackBar(`Flights seacrhed successfully`);
           }else{
            this._coreService.openSnackBar(`No results found!`);
           }
          this._dialogRef.close(val);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }
}
