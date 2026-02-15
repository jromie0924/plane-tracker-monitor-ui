export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  textSecondary: string;
  headerBackground: string;
  rowEven: string;
  rowOdd: string;
  border: string;
  statusColors: {
    scheduled: string;
    boarding: string;
    departed: string;
    inFlight: string;
    landed: string;
    arrived: string;
    delayed: string;
    cancelled: string;
  };
}

// Default purple theme (airport-style)
export const defaultTheme: Theme = {
  primary: '#7B2CBF',
  secondary: '#9D4EDD',
  background: '#10002B',
  text: '#FFFFFF',
  textSecondary: '#E0AAFF',
  headerBackground: '#5A189A',
  rowEven: '#240046',
  rowOdd: '#3C096C',
  border: '#5A189A',
  statusColors: {
    scheduled: '#E0AAFF',
    boarding: '#FFD60A',
    departed: '#4CC9F0',
    inFlight: '#4CC9F0',
    landed: '#06FFA5',
    arrived: '#06FFA5',
    delayed: '#FF9E00',
    cancelled: '#FF0054',
  },
};

// Light theme
export const lightTheme: Theme = {
  primary: '#5A189A',
  secondary: '#7B2CBF',
  background: '#FFFFFF',
  text: '#10002B',
  textSecondary: '#5A189A',
  headerBackground: '#E0AAFF',
  rowEven: '#F8F9FA',
  rowOdd: '#FFFFFF',
  border: '#C77DFF',
  statusColors: {
    scheduled: '#5A189A',
    boarding: '#FFD60A',
    departed: '#0077B6',
    inFlight: '#0077B6',
    landed: '#06A77D',
    arrived: '#06A77D',
    delayed: '#FF9E00',
    cancelled: '#D90429',
  },
};

// Dark theme (alternative)
export const darkTheme: Theme = {
  primary: '#9D4EDD',
  secondary: '#C77DFF',
  background: '#000000',
  text: '#FFFFFF',
  textSecondary: '#C77DFF',
  headerBackground: '#240046',
  rowEven: '#0D0221',
  rowOdd: '#1A0B3F',
  border: '#5A189A',
  statusColors: {
    scheduled: '#E0AAFF',
    boarding: '#FFD60A',
    departed: '#4CC9F0',
    inFlight: '#4CC9F0',
    landed: '#06FFA5',
    arrived: '#06FFA5',
    delayed: '#FF9E00',
    cancelled: '#FF0054',
  },
};
