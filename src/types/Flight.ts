export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  airlineCode: string;
  origin: string;
  destination: string;
  scheduledTime: string;
  estimatedTime: string;
  status: FlightStatus;
  altitude?: number;
  speed?: number;
  aircraft?: string;
  gate?: string;
}

export enum FlightStatus {
  SCHEDULED = 'Scheduled',
  BOARDING = 'Boarding',
  DEPARTED = 'Departed',
  IN_FLIGHT = 'In Flight',
  LANDED = 'Landed',
  ARRIVED = 'Arrived',
  DELAYED = 'Delayed',
  CANCELLED = 'Cancelled',
  EXPECTED = 'Expected at',
}

export type ViewMode = 'arrivals' | 'departures';
