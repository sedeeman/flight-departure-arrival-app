import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlightStatusUpdateComponent } from './flight-status-update.component';
import { CoreService } from 'src/core/core.service';
import { FlightService } from '../services/flight.service';
import { of } from 'rxjs';

describe('FlightStatusUpdateComponent', () => {
  let component: FlightStatusUpdateComponent;
  let fixture: ComponentFixture<FlightStatusUpdateComponent>;
  let mockFlightService: jasmine.SpyObj<FlightService>;
  let mockCoreService: jasmine.SpyObj<CoreService>;

  beforeEach(async () => {
    mockFlightService = jasmine.createSpyObj('FlightService', [
      'updateFlightStatus',
    ]);
    mockCoreService = jasmine.createSpyObj('CoreService', ['openSnackBar']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FlightStatusUpdateComponent],
      providers: [
        FormBuilder,
        { provide: FlightService, useValue: mockFlightService },
        { provide: CoreService, useValue: mockCoreService },
        {
          provide: MatDialogRef,
          useValue: {
            close: jasmine.createSpy('close'),
          },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { flightNumber: 'ABC123', status: 'arrival' },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightStatusUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with data', () => {
    const data = { flightNumber: 'ABC123', status: 'departure' };

    component.data = data;
    component.ngOnInit();

    expect(component.flightStatusUpdateForm.value).toEqual(data);
  });

  it('should call the flight service and close the dialog when the form is submitted and valid', () => {
    const validFormValue = { flightNumber: 'ABC123', status: 'delay' };
    const mockApiResponse = {};
    mockFlightService.updateFlightStatus.and.returnValue(of(mockApiResponse));

    component.flightStatusUpdateForm.setValue(validFormValue);
    component.onFormSubmit();

    expect(mockFlightService.updateFlightStatus).toHaveBeenCalledWith(
      validFormValue
    );
    expect(mockCoreService.openSnackBar).toHaveBeenCalledWith(
      'Flight status updated!'
    );
    expect(TestBed.inject(MatDialogRef).close).toHaveBeenCalledWith(true);
  });

  it('should not call the flight service when the form is submitted and invalid', () => {
    const invalidFormValue = { flightNumber: '', status: 'arrival' };

    component.flightStatusUpdateForm.setValue(invalidFormValue);
    component.onFormSubmit();

    expect(mockFlightService.updateFlightStatus).not.toHaveBeenCalled();
    expect(mockCoreService.openSnackBar).not.toHaveBeenCalled();
    expect(TestBed.inject(MatDialogRef).close).not.toHaveBeenCalled();
  });
});
