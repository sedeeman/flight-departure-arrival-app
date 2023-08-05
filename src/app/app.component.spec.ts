import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { FlightService } from './services/flight.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockFlightService: jasmine.SpyObj<FlightService>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockFlightService = jasmine.createSpyObj('FlightService', ['getAllFlights']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: FlightService, useValue: mockFlightService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should open flight add form', () => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of(true));
    mockDialog.open.and.returnValue(dialogRef);

    component.openFlightAddForm();

    expect(mockDialog.open).toHaveBeenCalledWith(jasmine.any(Function), {});
    expect(dialogRef.afterClosed).toHaveBeenCalled();
    expect(component.getAllFlights).toHaveBeenCalled();
  });

  it('should get all flights and set data source on initialization', () => {
    const testData = {
      data: [
        {
          flightNumber: 'ABC123',
          scheduledTime: '2023-08-04T12:00:00Z',
        },
      ],
    };
    mockFlightService.getAllFlights.and.returnValue(of(testData));

    component.ngOnInit();

    expect(mockFlightService.getAllFlights).toHaveBeenCalled();
    expect(component.dataSource).toEqual(jasmine.any(MatTableDataSource));
    expect(component.dataSource.data).toEqual(testData.data);
  });

  it('should apply filter on the data source', () => {
    const inputElement = document.createElement('input');
    inputElement.value = 'abc';
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: inputElement });

    component.applyFilter(event);

    expect(component.dataSource.filter).toBe('abc');
  });

  it('should open flight edit form', () => {
    const testData = { flightNumber: 'ABC123' };
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of(true));
    mockDialog.open.and.returnValue(dialogRef);

    component.openFlightEditForm(testData);

    expect(mockDialog.open).toHaveBeenCalledWith(jasmine.any(Function), { data: testData });
    expect(dialogRef.afterClosed).toHaveBeenCalled();

  });

  it('should open flight subscribe form', () => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRef.afterClosed.and.returnValue(of(true));
    mockDialog.open.and.returnValue(dialogRef);

    component.openFlightSubscribeForm();

    expect(mockDialog.open).toHaveBeenCalledWith(jasmine.any(Function), {});
    expect(dialogRef.afterClosed).toHaveBeenCalled();

  });
});
