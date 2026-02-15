import { FlightDataService } from '../FlightDataService';
import { FlightStatus } from '../../types/Flight';

describe('FlightDataService', () => {
  let service: FlightDataService;

  beforeEach(() => {
    service = new FlightDataService();
  });

  describe('generateMockFlights', () => {
    it('should generate default 15 flights when no count is provided', () => {
      const flights = service.generateMockFlights();
      expect(flights).toHaveLength(15);
    });

    it('should generate specified number of flights', () => {
      const counts = [5, 10, 20, 30];
      counts.forEach(count => {
        const flights = service.generateMockFlights(count);
        expect(flights).toHaveLength(count);
      });
    });

    it('should generate flights with all required fields', () => {
      const flights = service.generateMockFlights(1);
      const flight = flights[0];

      expect(flight).toHaveProperty('id');
      expect(flight).toHaveProperty('flightNumber');
      expect(flight).toHaveProperty('airline');
      expect(flight).toHaveProperty('airlineCode');
      expect(flight).toHaveProperty('origin');
      expect(flight).toHaveProperty('destination');
      expect(flight).toHaveProperty('scheduledTime');
      expect(flight).toHaveProperty('estimatedTime');
      expect(flight).toHaveProperty('status');
      expect(flight).toHaveProperty('aircraft');
      expect(flight).toHaveProperty('gate');
    });

    it('should generate flights with valid flight numbers', () => {
      const flights = service.generateMockFlights(10);
      flights.forEach(flight => {
        expect(flight.flightNumber).toMatch(/^[A-Z]{2} \d{4}$/);
      });
    });

    it('should generate flights with valid status values', () => {
      const flights = service.generateMockFlights(20);
      const validStatuses = Object.values(FlightStatus);
      flights.forEach(flight => {
        expect(validStatuses).toContain(flight.status);
      });
    });

    it('should generate flights sorted by scheduled time', () => {
      const flights = service.generateMockFlights(10);
      for (let i = 1; i < flights.length; i++) {
        const prevTime = new Date(flights[i - 1].scheduledTime).getTime();
        const currTime = new Date(flights[i].scheduledTime).getTime();
        expect(prevTime).toBeLessThanOrEqual(currTime);
      }
    });

    it('should assign altitude and speed only to in-flight flights', () => {
      const flights = service.generateMockFlights(50);
      flights.forEach(flight => {
        if (flight.status === FlightStatus.IN_FLIGHT) {
          expect(flight.altitude).toBeDefined();
          expect(flight.speed).toBeDefined();
          expect(flight.altitude).toBeGreaterThanOrEqual(10000);
          expect(flight.altitude).toBeLessThanOrEqual(50000);
          expect(flight.speed).toBeGreaterThanOrEqual(400);
          expect(flight.speed).toBeLessThanOrEqual(900);
        }
      });
    });

    it('should generate unique flight IDs', () => {
      const flights = service.generateMockFlights(20);
      const ids = flights.map(f => f.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(flights.length);
    });

    it('should generate valid ISO date strings for times', () => {
      const flights = service.generateMockFlights(5);
      flights.forEach(flight => {
        expect(new Date(flight.scheduledTime).toISOString()).toBe(flight.scheduledTime);
        expect(new Date(flight.estimatedTime).toISOString()).toBe(flight.estimatedTime);
      });
    });

    it('should generate valid airport codes', () => {
      const flights = service.generateMockFlights(10);
      flights.forEach(flight => {
        expect(flight.origin).toMatch(/^[A-Z]{3}$/);
        expect(flight.destination).toMatch(/^[A-Z]{3}$/);
      });
    });

    it('should generate valid aircraft codes', () => {
      const flights = service.generateMockFlights(10);
      flights.forEach(flight => {
        expect(flight.aircraft).toMatch(/^B\d{3,4}$/);
      });
    });

    it('should generate valid gate assignments', () => {
      const flights = service.generateMockFlights(10);
      flights.forEach(flight => {
        expect(flight.gate).toMatch(/^[A-Z]\d{1,2}$/);
      });
    });
  });

  describe('updateFlight', () => {
    it('should keep scheduled flight status when scheduled time is in future', () => {
      const futureTime = new Date();
      futureTime.setHours(futureTime.getHours() + 2);
      
      const flight = {
        id: 'test-1',
        flightNumber: 'AA 1234',
        airline: 'American Airlines',
        airlineCode: 'AA',
        origin: 'JFK',
        destination: 'LAX',
        scheduledTime: futureTime.toISOString(),
        estimatedTime: futureTime.toISOString(),
        status: FlightStatus.SCHEDULED,
        aircraft: 'B737',
        gate: 'A1'
      };

      const updated = service.updateFlight(flight);
      expect(updated.status).toBe(FlightStatus.SCHEDULED);
    });

    it('should progress from SCHEDULED to BOARDING or DELAYED for past flights', () => {
      const pastTime = new Date();
      pastTime.setHours(pastTime.getHours() - 1);
      
      const flight = {
        id: 'test-1',
        flightNumber: 'AA 1234',
        airline: 'American Airlines',
        airlineCode: 'AA',
        origin: 'JFK',
        destination: 'LAX',
        scheduledTime: pastTime.toISOString(),
        estimatedTime: pastTime.toISOString(),
        status: FlightStatus.SCHEDULED,
        aircraft: 'B737',
        gate: 'A1'
      };

      const updated = service.updateFlight(flight);
      expect([FlightStatus.BOARDING, FlightStatus.DELAYED]).toContain(updated.status);
    });

    it('should progress BOARDING to DEPARTED', () => {
      const pastTime = new Date();
      pastTime.setHours(pastTime.getHours() - 1);
      
      const flight = {
        id: 'test-1',
        flightNumber: 'AA 1234',
        airline: 'American Airlines',
        airlineCode: 'AA',
        origin: 'JFK',
        destination: 'LAX',
        scheduledTime: pastTime.toISOString(),
        estimatedTime: pastTime.toISOString(),
        status: FlightStatus.BOARDING,
        aircraft: 'B737',
        gate: 'A1'
      };

      const updated = service.updateFlight(flight);
      expect(updated.status).toBe(FlightStatus.DEPARTED);
    });

    it('should progress DEPARTED to IN_FLIGHT', () => {
      const pastTime = new Date();
      pastTime.setHours(pastTime.getHours() - 1);
      
      const flight = {
        id: 'test-1',
        flightNumber: 'AA 1234',
        airline: 'American Airlines',
        airlineCode: 'AA',
        origin: 'JFK',
        destination: 'LAX',
        scheduledTime: pastTime.toISOString(),
        estimatedTime: pastTime.toISOString(),
        status: FlightStatus.DEPARTED,
        aircraft: 'B737',
        gate: 'A1'
      };

      const updated = service.updateFlight(flight);
      expect(updated.status).toBe(FlightStatus.IN_FLIGHT);
    });

    it('should sometimes progress IN_FLIGHT to LANDED', () => {
      const pastTime = new Date();
      pastTime.setHours(pastTime.getHours() - 1);
      
      const flight = {
        id: 'test-1',
        flightNumber: 'AA 1234',
        airline: 'American Airlines',
        airlineCode: 'AA',
        origin: 'JFK',
        destination: 'LAX',
        scheduledTime: pastTime.toISOString(),
        estimatedTime: pastTime.toISOString(),
        status: FlightStatus.IN_FLIGHT,
        altitude: 35000,
        speed: 500,
        aircraft: 'B737',
        gate: 'A1'
      };

      const updated = service.updateFlight(flight);
      expect([FlightStatus.IN_FLIGHT, FlightStatus.LANDED]).toContain(updated.status);
    });

    it('should progress LANDED to ARRIVED', () => {
      const pastTime = new Date();
      pastTime.setHours(pastTime.getHours() - 1);
      
      const flight = {
        id: 'test-1',
        flightNumber: 'AA 1234',
        airline: 'American Airlines',
        airlineCode: 'AA',
        origin: 'JFK',
        destination: 'LAX',
        scheduledTime: pastTime.toISOString(),
        estimatedTime: pastTime.toISOString(),
        status: FlightStatus.LANDED,
        aircraft: 'B737',
        gate: 'A1'
      };

      const updated = service.updateFlight(flight);
      expect(updated.status).toBe(FlightStatus.ARRIVED);
    });

    it('should not change ARRIVED status', () => {
      const pastTime = new Date();
      pastTime.setHours(pastTime.getHours() - 1);
      
      const flight = {
        id: 'test-1',
        flightNumber: 'AA 1234',
        airline: 'American Airlines',
        airlineCode: 'AA',
        origin: 'JFK',
        destination: 'LAX',
        scheduledTime: pastTime.toISOString(),
        estimatedTime: pastTime.toISOString(),
        status: FlightStatus.ARRIVED,
        aircraft: 'B737',
        gate: 'A1'
      };

      const updated = service.updateFlight(flight);
      expect(updated.status).toBe(FlightStatus.ARRIVED);
    });

    it('should update altitude and speed for IN_FLIGHT status', () => {
      const pastTime = new Date();
      pastTime.setHours(pastTime.getHours() - 1);
      
      const flight = {
        id: 'test-1',
        flightNumber: 'AA 1234',
        airline: 'American Airlines',
        airlineCode: 'AA',
        origin: 'JFK',
        destination: 'LAX',
        scheduledTime: pastTime.toISOString(),
        estimatedTime: pastTime.toISOString(),
        status: FlightStatus.IN_FLIGHT,
        altitude: 35000,
        speed: 500,
        aircraft: 'B737',
        gate: 'A1'
      };

      const updated = service.updateFlight(flight);
      if (updated.status === FlightStatus.IN_FLIGHT) {
        expect(updated.altitude).toBeDefined();
        expect(updated.speed).toBeDefined();
        expect(updated.altitude).toBeGreaterThanOrEqual(10000);
        expect(updated.altitude).toBeLessThanOrEqual(50000);
        expect(updated.speed).toBeGreaterThanOrEqual(400);
        expect(updated.speed).toBeLessThanOrEqual(900);
      }
    });

    it('should preserve original flight data except status and flight data', () => {
      const pastTime = new Date();
      pastTime.setHours(pastTime.getHours() - 1);
      
      const flight = {
        id: 'test-1',
        flightNumber: 'AA 1234',
        airline: 'American Airlines',
        airlineCode: 'AA',
        origin: 'JFK',
        destination: 'LAX',
        scheduledTime: pastTime.toISOString(),
        estimatedTime: pastTime.toISOString(),
        status: FlightStatus.BOARDING,
        aircraft: 'B737',
        gate: 'A1'
      };

      const updated = service.updateFlight(flight);
      expect(updated.id).toBe(flight.id);
      expect(updated.flightNumber).toBe(flight.flightNumber);
      expect(updated.airline).toBe(flight.airline);
      expect(updated.airlineCode).toBe(flight.airlineCode);
      expect(updated.origin).toBe(flight.origin);
      expect(updated.destination).toBe(flight.destination);
      expect(updated.scheduledTime).toBe(flight.scheduledTime);
      expect(updated.estimatedTime).toBe(flight.estimatedTime);
      expect(updated.aircraft).toBe(flight.aircraft);
      expect(updated.gate).toBe(flight.gate);
    });
  });
});
