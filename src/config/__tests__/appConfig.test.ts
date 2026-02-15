import { defaultConfig, dataSourceConfig, AppConfig, DataSourceConfig } from '../appConfig';

describe('appConfig', () => {
  describe('defaultConfig', () => {
    it('should have correct update interval', () => {
      expect(defaultConfig.updateInterval).toBe(30000);
    });

    it('should have arrivals as default view mode', () => {
      expect(defaultConfig.defaultViewMode).toBe('arrivals');
    });

    it('should have animations enabled by default', () => {
      expect(defaultConfig.animationsEnabled).toBe(true);
    });

    it('should have sound alerts disabled by default', () => {
      expect(defaultConfig.soundAlertsEnabled).toBe(false);
    });

    it('should display maximum 20 flights by default', () => {
      expect(defaultConfig.maxFlightsDisplayed).toBe(20);
    });

    it('should have auto refresh enabled by default', () => {
      expect(defaultConfig.autoRefresh).toBe(true);
    });

    it('should have all required properties', () => {
      expect(defaultConfig).toHaveProperty('updateInterval');
      expect(defaultConfig).toHaveProperty('defaultViewMode');
      expect(defaultConfig).toHaveProperty('animationsEnabled');
      expect(defaultConfig).toHaveProperty('soundAlertsEnabled');
      expect(defaultConfig).toHaveProperty('maxFlightsDisplayed');
      expect(defaultConfig).toHaveProperty('autoRefresh');
    });

    it('should have valid updateInterval value', () => {
      expect(defaultConfig.updateInterval).toBeGreaterThan(0);
      expect(typeof defaultConfig.updateInterval).toBe('number');
    });

    it('should have valid maxFlightsDisplayed value', () => {
      expect(defaultConfig.maxFlightsDisplayed).toBeGreaterThan(0);
      expect(typeof defaultConfig.maxFlightsDisplayed).toBe('number');
    });

    it('should have boolean flags', () => {
      expect(typeof defaultConfig.animationsEnabled).toBe('boolean');
      expect(typeof defaultConfig.soundAlertsEnabled).toBe('boolean');
      expect(typeof defaultConfig.autoRefresh).toBe('boolean');
    });
  });

  describe('dataSourceConfig', () => {
    it('should use mock data source by default', () => {
      expect(dataSourceConfig.type).toBe('mock');
    });

    it('should have type property', () => {
      expect(dataSourceConfig).toHaveProperty('type');
    });

    it('should have valid data source type', () => {
      const validTypes: Array<DataSourceConfig['type']> = ['websocket', 'pubsub', 'polling', 'mock'];
      expect(validTypes).toContain(dataSourceConfig.type);
    });

    it('should be a valid DataSourceConfig object', () => {
      expect(typeof dataSourceConfig.type).toBe('string');
    });
  });

  describe('AppConfig interface validation', () => {
    it('should accept valid config with all properties', () => {
      const validConfig: AppConfig = {
        updateInterval: 60000,
        defaultViewMode: 'departures',
        animationsEnabled: false,
        soundAlertsEnabled: true,
        maxFlightsDisplayed: 50,
        autoRefresh: false,
      };

      expect(validConfig.updateInterval).toBe(60000);
      expect(validConfig.defaultViewMode).toBe('departures');
    });

    it('should accept config with arrivals view mode', () => {
      const config: AppConfig = {
        ...defaultConfig,
        defaultViewMode: 'arrivals',
      };

      expect(config.defaultViewMode).toBe('arrivals');
    });

    it('should accept config with departures view mode', () => {
      const config: AppConfig = {
        ...defaultConfig,
        defaultViewMode: 'departures',
      };

      expect(config.defaultViewMode).toBe('departures');
    });
  });

  describe('DataSourceConfig interface validation', () => {
    it('should accept websocket configuration', () => {
      const config: DataSourceConfig = {
        type: 'websocket',
        endpoint: 'wss://example.com',
        apiKey: 'test-key',
      };

      expect(config.type).toBe('websocket');
      expect(config.endpoint).toBe('wss://example.com');
      expect(config.apiKey).toBe('test-key');
    });

    it('should accept pubsub configuration', () => {
      const config: DataSourceConfig = {
        type: 'pubsub',
        region: 'us-west-2',
      };

      expect(config.type).toBe('pubsub');
      expect(config.region).toBe('us-west-2');
    });

    it('should accept polling configuration', () => {
      const config: DataSourceConfig = {
        type: 'polling',
        endpoint: 'https://api.example.com',
      };

      expect(config.type).toBe('polling');
    });

    it('should accept mock configuration', () => {
      const config: DataSourceConfig = {
        type: 'mock',
      };

      expect(config.type).toBe('mock');
    });
  });
});
