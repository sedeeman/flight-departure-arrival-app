import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlightStatusSubscribeComponent } from './flight-status-subscribe.component';
import { CoreService } from 'src/core/core.service';
import { FlightService } from '../services/flight.service';
import { of } from 'rxjs';

describe('FlightStatusSubscribeComponent', () => {
  let component: FlightStatusSubscribeComponent;
  let fixture: ComponentFixture<FlightStatusSubscribeComponent>;
  let mockFlightService: jasmine.SpyObj<FlightService>;
  let mockCoreService: jasmine.SpyObj<CoreService>;

  beforeEach(async () => {
    mockFlightService = jasmine.createSpyObj('FlightService', ['subscribeToFlightStatus']);
    mockCoreService = jasmine.createSpyObj('CoreService', ['openSnackBar']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FlightStatusSubscribeComponent],
      providers: [
        FormBuilder,
        { provide: FlightService, useValue: mockFlightService },
        { provide: CoreService, useValue: mockCoreService },
        {
          provide: MatDialogRef,
          useValue: {
            close: jasmine.createSpy('close')
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightStatusSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with data', () => {
    const data = {
      flightNumber: 'ABC123',
      email: 'test@example.com',
      subscribeToDelay: true,
      subscribeToArrival: false,
      subscribeToDeparture: true,
    };

    component.data = data;
    component.ngOnInit();

    expect(component.subscribeToFlightStatusForm.value).toEqual(data);
  });

  it('should call the flight service and close the dialog when the form is submitted and valid', () => {
    const validFormValue = {
      flightNumber: 'ABC123',
      email: 'test@example.com',
      subscribeToDelay: true,
      subscribeToArrival: false,
      subscribeToDeparture: true,
    };

    mockFlightService.subscribeToFlightStatus.and.returnValue(of({}));
    component.subscribeToFlightStatusForm.setValue(validFormValue);
    component.onFormSubmit();

    expect(mockFlightService.subscribeToFlightStatus).toHaveBeenCalledWith(validFormValue);
    expect(mockCoreService.openSnackBar).toHaveBeenCalledWith('Subscribed to flight status!');
    expect(TestBed.inject(MatDialogRef).close).toHaveBeenCalledWith(true);
  });

  it('should not call the flight service when the form is submitted and invalid', () => {
    const invalidFormValue = {
      flightNumber: '',
      email: 'invalid-email', // Invalid email
      subscribeToDelay: true,
      subscribeToArrival: false,
      subscribeToDeparture: true,
    };

    component.subscribeToFlightStatusForm.setValue(invalidFormValue);
    component.onFormSubmit();

    expect(mockFlightService.subscribeToFlightStatus).not.toHaveBeenCalled();
    expect(mockCoreService.openSnackBar).not.toHaveBeenCalled();
    expect(TestBed.inject(MatDialogRef).close).not.toHaveBeenCalled();
  });
});
