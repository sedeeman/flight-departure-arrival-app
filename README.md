
# Flight Arrival Departure App
The Flight Arrival Departure App is a web application that facilitates various functionalities related to flight management, subscriptions, and notifications. The application allows users to view all flight data, with delay flights highlighted for easy identification. Users can subscribe to their preferred flight status (delay, arrival, departure) and receive email notifications based on their subscription preferences. On the admin side, users with appropriate permissions can add new flights, update flight statuses (arrival, departure, delay), and download flight data.

# Features

1. View All Flight Data: Users can view all flight data, and delayed flights are highlighted to stand out.

2. Flight Status Subscription: Users can subscribe to their preferred flight status (delay, arrival, departure) to receive notifications.

3. Email Notifications: Users will receive email notifications based on their subscription preferences.(You will recive email notifications from selan.dimantha@gmail.com)

4. Admin Functionality:

5. Add New Flights: Admin users can add new flights to the system.

6. Update Flight Status: Admin users can update flight statuses such as arrival, departure, and delay.

7. Download Flight Data: Admin users can download flight data for further analysis.

# Installation and Usage

# Prerequisites
Before running the Flight Arrival Departure App, you need to have the following software installed on your system:

1. Node.js (https://nodejs.org)
2. Angular CLI (https://angular.io/cli)
3. Backend Server (assuming it's already set up and running at http://localhost:3000 and http://localhost:3001 for flights and flight status APIs respectively)

# Installation

### Clone the repository to your local machine:
git clone https://github.com/yourusername/FlightArrivalDepartureApp.git
cd FlightArrivalDepartureApp

### nstall the dependencies:
npm install
Configuration

Backend URL: In the src/app/services/flight.service.ts file, update the API URLs in the FlightService to point to the backend server:
typescript

### backend servers
private readonly flightsApiUrl = 'http://localhost:3000/api/flights';
private readonly flightStatusApiUrl = 'http://localhost:3001/api/flights/flight-status';
private readonly flightSubscribeApiUrl = 'http://localhost:3001/api/flights/subscribe';

### ng serve
The app will be accessible at http://localhost:4200.

### Unit Testing
ng test
This will execute the unit tests using Karma.

### Additional Features (Todo)
Fine-Grained Permission-Based Authentication: Implement fine-grained permission-based authentication to control access to admin functionalities based on user roles and permissions.
