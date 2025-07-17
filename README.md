##  Flight Booking System

A backend API for a Flight Booking System, developed using **Node.js**, **Express**, and **Sequelize ORM**. It allows users to manage flights, airports, airplanes, and cities, and supports features like flight search, seat availability, and flight booking operations.

---

##  Features

-  Create, read, update, and delete flights
-  Manage airports linked to cities
-  Manage airplanes and their capacity
-  Add cities (with duplication validation)
-  Filter flights by departure/arrival, price, and sort options
-  Reduce flight seats on booking (seat availability logic)
-  API tested via `request.http` or Postman

---

## Tech Stack

- **Node.js** – Backend runtime
- **Express.js** – Web framework
- **Sequelize ORM** – Database interaction
- **MySQL / PostgreSQL** – Database (based on your setup)
- **JWT** *(planned for auth)* – For token-based authentication
- **dotenv** – For environment variables
- **nodemon** – Dev-time auto-restart

---

## Project Structure

flight-booking/
├── config/             # DB configs and environment setup (e.g., dbConfig.js)
├── controllers/        # Handles incoming HTTP requests (FlightController, CityController, etc.)
├── logs/               # Logging output (optional if using Winston/Morgan)
├── middlewares/        # Request validation, auth, error handling
├── migrations/         # Sequelize migrations (tables creation/updation)
├── models/             # Sequelize models (Flight, Airport, City, etc.)
├── node_modules/       # Installed packages
├── repositories/       # Database query abstraction layer
├── routes/             # API route definitions
│   ├── airplane.js
│   ├── airport.js
│   ├── city.js
│   └── flight.js
├── seeders/            # Seed sample data (cities, airports, airplanes)
├── services/           # Core business logic (e.g., createFlight, reduceSeats)
├── utils/              # Helper functions (formatters, time validators, etc.)
├── .env                # Environment variables (not pushed to GitHub)
├── .gitignore          # Git ignore list
├── index.js            # Entry point - Express app setup
├── notes.txt           # Dev notes (optional)
├── package.json        # Project metadata and dependencies
├── package-lock.json   # Lock file for dependency versions
├── README.md           # Project documentation
├── request.http        # Sample API requests (Postman alternative)

---

## API Endpoints

### Flight APIs

- **POST** `/api/v1/flight` – Create a new flight  
- **GET** `/api/v1/flight` – Get all flights (with optional filters)  
- **GET** `/api/v1/flight/:id` – Get flight details by ID  
- **PATCH** `/api/v1/flight/:id` – Update flight info by ID  
- **DELETE** `/api/v1/flight/:id` – Delete a flight by ID  
- **POST** `/api/v1/flight/reduce-seats` – Reduce seats after booking  

**Sample Body for Create Flight:**
```json
{
  "flightNumber": "AI101",
  "airplaneId": 1,
  "departureAirportId": 2,
  "arrivalAirportId": 3,
  "departureTime": "2025-06-10T10:00:00Z",
  "arrivalTime": "2025-06-10T14:00:00Z",
  "price": 5000,
  "boardingGate": "A5",
  "totalSeats": 150
}
```

**Sample Body for Reduce Seats:**
```json
{
  "flightId": 1,
  "seats": 2
}
```

**Query Filters for GET /api/v1/flight:**
```
?departureAirportId=2
&arrivalAirportId=3
&priceMin=1000
&priceMax=7000
&sortBy=price
&order=ASC
```

---

### Airport APIs

- **POST** `/api/v1/airport` – Create a new airport  
- **GET** `/api/v1/airport` – Get all airports  
- **GET** `/api/v1/airport/:id` – Get airport by ID  
- **PATCH** `/api/v1/airport/:id` – Update airport by ID  
- **DELETE** `/api/v1/airport/:id` – Delete airport by ID  

**Sample Body for Create Airport:**
```json
{
  "name": "Chennai International Airport",
  "address": "Meenambakkam, Chennai",
  "cityId": 1
}
```

---

### Airplane APIs

- **POST** `/api/v1/airplane` – Create a new airplane  
- **GET** `/api/v1/airplane` – Get all airplanes  
- **GET** `/api/v1/airplane/:id` – Get airplane by ID  
- **PATCH** `/api/v1/airplane/:id` – Update airplane by ID  
- **DELETE** `/api/v1/airplane/:id` – Delete airplane by ID  

**Sample Body for Create Airplane:**
```json
{
  "modelNumber": "Boeing747MAX",
  "capacity": 680
}
```

---

### City APIs

- **POST** `/api/v1/city` – Create a new city (duplicates not allowed)

**Sample Body for Create City:**
```json
{
  "name": "Chennai",
  "state": "Tamil Nadu",
  "country": "India"
}
```


## Installation & Running the Project

```bash
# Clone the repository
git clone https://github.com/yourusername/flight-booking-system.git
cd flight-booking-system

# Install dependencies
npm install

# Configure DB (use Sequelize CLI or programmatic sync)
npx sequelize db:migrate
npx sequelize db:seed:all   # optional

# Start the server
npm start
```

Visit: [http://localhost:3000/api/v1/flight](http://localhost:3000/api/v1/flight) to test the API.

---

## Learnings

- Designed RESTful APIs with modular architecture
- Implemented full backend CRUD operations using Sequelize ORM
- Applied middleware validation and reusable service layers
- Handled filtering, sorting, and custom business logic (like reducing available seats)
- Worked with Sequelize relationships and query filters
- Practiced clean folder structure using MVC + Services + Repositories pattern

---

## Author

**Shanmugam PR**  
 B.Tech Information Technology  
 Backend Developer | Placement-Ready  

[LinkedIn](https://www.linkedin.com/in/shanmugam-p-r-53331525a/) • [GitHub](https://github.com/SHANMUGAM-PR?tab=repositories)


