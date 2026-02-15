export type ColumnType = 
  | 'time'
  | 'airline'
  | 'flight'
  | 'from'
  | 'to'
  | 'altitude'
  | 'airplaneType';

export interface ColumnConfig {
  id: ColumnType;
  label: string;
  visible: boolean;
}

export const DEFAULT_COLUMNS: ColumnConfig[] = [
  { id: 'time', label: 'Time', visible: true },
  { id: 'airline', label: 'Airline', visible: true },
  { id: 'flight', label: 'Flight', visible: true },
  { id: 'from', label: 'From', visible: true },
  { id: 'to', label: 'To', visible: true },
  { id: 'altitude', label: 'Altitude', visible: true },
  { id: 'airplaneType', label: 'Airplane Type', visible: true },
];
