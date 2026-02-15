import { Flight, FlightStatus } from '../types/Flight';

// Mock flight data generator
export class FlightDataService {
  private airlines = [
    { code: 'AA', name: 'American Airlines' },
    { code: 'UA', name: 'United Airlines' },
    { code: 'DL', name: 'Delta Air Lines' },
    { code: 'BA', name: 'British Airways' },
    { code: 'LH', name: 'Lufthansa' },
    { code: 'AF', name: 'Air France' },
    { code: 'KL', name: 'KLM' },
    { code: 'TK', name: 'Turkish Airlines' },
    { code: 'EK', name: 'Emirates' },
    { code: 'QR', name: 'Qatar Airways' },
  ];

  private airports = [
    'JFK', 'LAX', 'ORD', 'DFW', 'ATL', 'SFO', 'SEA', 'BOS', 'MIA', 'LAS',
    'LHR', 'CDG', 'FRA', 'AMS', 'IST', 'DXB', 'DOH', 'SIN', 'HKG', 'NRT'
  ];

  private statuses = [
    FlightStatus.SCHEDULED,
    FlightStatus.BOARDING,
    FlightStatus.DEPARTED,
    FlightStatus.IN_FLIGHT,
    FlightStatus.LANDED,
    FlightStatus.ARRIVED,
    FlightStatus.DELAYED,
  ];

  generateMockFlights(count: number = 15): Flight[] {
    const flights: Flight[] = [];
    const now = new Date();

    for (let i = 0; i < count; i++) {
      const airline = this.airlines[Math.floor(Math.random() * this.airlines.length)];
      const flightNumber = `${airline.code} ${Math.floor(Math.random() * 9000) + 1000}`;
      const origin = this.airports[Math.floor(Math.random() * this.airports.length)];
      const destination = this.airports[Math.floor(Math.random() * this.airports.length)];
      
      const scheduledTime = new Date(now.getTime() + (i - 5) * 30 * 60000);
      const estimatedTime = new Date(scheduledTime.getTime() + (Math.random() > 0.7 ? Math.random() * 30 * 60000 : 0));
      
      const status = this.statuses[Math.floor(Math.random() * this.statuses.length)];

      flights.push({
        id: `flight-${i}`,
        flightNumber,
        airline: airline.name,
        airlineCode: airline.code,
        origin,
        destination,
        scheduledTime: scheduledTime.toISOString(),
        estimatedTime: estimatedTime.toISOString(),
        status,
        altitude: status === FlightStatus.IN_FLIGHT ? Math.floor(Math.random() * 40000) + 10000 : undefined,
        speed: status === FlightStatus.IN_FLIGHT ? Math.floor(Math.random() * 500) + 400 : undefined,
        aircraft: `B${Math.floor(Math.random() * 9) + 7}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}`,
        gate: `${String.fromCharCode(65 + Math.floor(Math.random() * 10))}${Math.floor(Math.random() * 50) + 1}`,
      });
    }

    return flights.sort((a, b) => 
      new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime()
    );
  }

  // Simulate real-time updates
  updateFlight(flight: Flight): Flight {
    const now = new Date();
    const scheduledTime = new Date(flight.scheduledTime);
    
    // Simulate status progression
    let newStatus = flight.status;
    
    if (scheduledTime < now) {
      if (flight.status === FlightStatus.SCHEDULED) {
        newStatus = Math.random() > 0.5 ? FlightStatus.BOARDING : FlightStatus.DELAYED;
      } else if (flight.status === FlightStatus.BOARDING) {
        newStatus = FlightStatus.DEPARTED;
      } else if (flight.status === FlightStatus.DEPARTED) {
        newStatus = FlightStatus.IN_FLIGHT;
      } else if (flight.status === FlightStatus.IN_FLIGHT) {
        newStatus = Math.random() > 0.3 ? flight.status : FlightStatus.LANDED;
      } else if (flight.status === FlightStatus.LANDED) {
        newStatus = FlightStatus.ARRIVED;
      }
    }

    return {
      ...flight,
      status: newStatus,
      altitude: newStatus === FlightStatus.IN_FLIGHT ? Math.floor(Math.random() * 40000) + 10000 : flight.altitude,
      speed: newStatus === FlightStatus.IN_FLIGHT ? Math.floor(Math.random() * 500) + 400 : flight.speed,
    };
  }
}

export const flightDataService = new FlightDataService();
