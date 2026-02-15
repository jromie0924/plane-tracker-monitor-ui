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

// Blue theme (default)
export const blueTheme: Theme = {
  primary: '#0077B6',
  secondary: '#00B4D8',
  background: '#001219',
  text: '#FFFFFF',
  textSecondary: '#90E0EF',
  headerBackground: '#003459',
  rowEven: '#001D35',
  rowOdd: '#002942',
  border: '#005F89',
  statusColors: {
    scheduled: '#90E0EF',
    boarding: '#FFD60A',
    departed: '#00B4D8',
    inFlight: '#00B4D8',
    landed: '#06FFA5',
    arrived: '#06FFA5',
    delayed: '#FF9E00',
    cancelled: '#FF0054',
  },
};

// Green theme
export const greenTheme: Theme = {
  primary: '#2D6A4F',
  secondary: '#40916C',
  background: '#081C15',
  text: '#FFFFFF',
  textSecondary: '#B7E4C7',
  headerBackground: '#1B4332',
  rowEven: '#0F2419',
  rowOdd: '#1A3828',
  border: '#2D6A4F',
  statusColors: {
    scheduled: '#B7E4C7',
    boarding: '#FFD60A',
    departed: '#52B788',
    inFlight: '#52B788',
    landed: '#06FFA5',
    arrived: '#06FFA5',
    delayed: '#FF9E00',
    cancelled: '#FF0054',
  },
};

// Red theme
export const redTheme: Theme = {
  primary: '#9D0208',
  secondary: '#D00000',
  background: '#370617',
  text: '#FFFFFF',
  textSecondary: '#FFCCD5',
  headerBackground: '#6A040F',
  rowEven: '#1E0308',
  rowOdd: '#520B13',
  border: '#9D0208',
  statusColors: {
    scheduled: '#FFCCD5',
    boarding: '#FFD60A',
    departed: '#DC2F02',
    inFlight: '#DC2F02',
    landed: '#06FFA5',
    arrived: '#06FFA5',
    delayed: '#FF9E00',
    cancelled: '#FF0054',
  },
};

// Black theme
export const blackTheme: Theme = {
  primary: '#495057',
  secondary: '#6C757D',
  background: '#000000',
  text: '#FFFFFF',
  textSecondary: '#ADB5BD',
  headerBackground: '#212529',
  rowEven: '#0A0A0A',
  rowOdd: '#1A1A1A',
  border: '#495057',
  statusColors: {
    scheduled: '#ADB5BD',
    boarding: '#FFD60A',
    departed: '#6C757D',
    inFlight: '#6C757D',
    landed: '#06FFA5',
    arrived: '#06FFA5',
    delayed: '#FF9E00',
    cancelled: '#FF0054',
  },
};

// White theme
export const whiteTheme: Theme = {
  primary: '#1864AB',
  secondary: '#228BE6',
  background: '#FFFFFF',
  text: '#212529',
  textSecondary: '#495057',
  headerBackground: '#E7F5FF',
  rowEven: '#F8F9FA',
  rowOdd: '#FFFFFF',
  border: '#C5D9E9',
  statusColors: {
    scheduled: '#495057',
    boarding: '#FCC419',
    departed: '#1C7ED6',
    inFlight: '#1C7ED6',
    landed: '#12B886',
    arrived: '#12B886',
    delayed: '#F76707',
    cancelled: '#E03131',
  },
};
