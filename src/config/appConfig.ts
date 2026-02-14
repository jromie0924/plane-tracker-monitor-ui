export interface AppConfig {
  updateInterval: number; // in milliseconds
  defaultViewMode: 'arrivals' | 'departures';
  animationsEnabled: boolean;
  soundAlertsEnabled: boolean;
  maxFlightsDisplayed: number;
  autoRefresh: boolean;
}

export const defaultConfig: AppConfig = {
  updateInterval: 30000, // 30 seconds
  defaultViewMode: 'arrivals',
  animationsEnabled: true,
  soundAlertsEnabled: false,
  maxFlightsDisplayed: 20,
  autoRefresh: true,
};

// Configuration for real-time data sources
export interface DataSourceConfig {
  type: 'websocket' | 'pubsub' | 'polling' | 'mock';
  endpoint?: string;
  apiKey?: string;
  region?: string;
}

export const dataSourceConfig: DataSourceConfig = {
  type: 'mock', // Change to 'websocket' or 'pubsub' when ready
  // endpoint: 'wss://your-websocket-endpoint',
  // apiKey: 'your-api-key',
};
