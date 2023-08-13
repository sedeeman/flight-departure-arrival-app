
# Flight Arrival Departure App
The Flight Arrival Departure App is a web application that facilitates various functionalities related to flight management, subscriptions, and notifications. The application allows users to view all flight data, with delay flights highlighted for easy identification. Users can subscribe to their preferred flight status (delay, arrival, departure) and receive email notifications based on their subscription preferences. On the admin side, users with appropriate permissions can add new flights, update flight statuses (arrival, departure, delay), and download flight data.


### High Level Design

![image](https://github.com/sedeeman/flight-departure-arrival-app/assets/119731054/9c921d93-47fc-442f-b950-4d2f15dd0da4)


### Features

1. View All Flight Data: Users can view all flight data, and delayed flights are highlighted to stand out.

2. Flight Status Subscription: Users can subscribe to their preferred flight status (delay, arrival, departure) to receive notifications.

3. Email Notifications: Users will receive email notifications based on their subscription preferences.(You will recive email notifications from selan.dimantha@gmail.com)

4. Admin Functionality:

5. Add New Flights: Admin users can add new flights to the system.

6. Update Flight Status: Admin users can update flight statuses such as arrival, departure, and delay.

7. Download Flight Data: Admin users can download flight data for further analysis. (Currently support .CSV format)


### Installation and Usage

### Prerequisites
Before running the Flight Arrival Departure App, you need to have the following software installed on your system:

1. Node.js (https://nodejs.org)
2. Angular CLI (https://angular.io/cli)
3. Backend Server (assuming it's already set up and running at http://localhost:3000 and http://localhost:3001 for flight-service and flight-notification service APIs respectively)

### Installation

### Clone the repository to your local machine:
git clone [flight-departure-arrival-app](https://github.com/sedeeman/flight-departure-arrival-app).git
cd flight-departure-arrival-app

https://github.com/sedeeman/flight-departure-arrival-app/edit/main/README.md

### Backend servers
private readonly flightsApiUrl = 'http://localhost:3000/api/flights';
private readonly flightStatusApiUrl = 'http://localhost:3001/api/flights/flight-status';
private readonly flightSubscribeApiUrl = 'http://localhost:3001/api/flights/subscribe';

### ng serve
The app will be accessible at http://localhost:4200.

### App Sign-In Process and Test Account Usage

When signing in to the application, users will be redirected to the Keycloak Authorization Server's Single Sign-On (SSO) page. Below are the test accounts that can be used for both user and admin roles:

### Admin Account:
Username: selan
Password: selan

### User Account:
Username: deemantha
Password: deemantha

### Admin Role Features
Add Flights
Download Flight Data to .CSV file
Update Flight Status
View Flight Data
Subscribe to Flight Status Updates

### User Role Features
View Flight Data
Subscribe to Flight Status Updates

Feel free to use these test accounts to explore and interact with the various features available to both admin and user roles in the application.             

### Unit Testing
ng test
This will execute the unit tests using Karma.
