import { Alert } from "react-native";

export function formatElectricalUnit(value: number): string {
  const units = [
    { factor: 1e-12, symbol: 'p' }, // pico (10^-12)
    { factor: 1e-9, symbol: 'n' },  // nano (10^-9)
    { factor: 1e-6, symbol: 'μ' },  // micro (10^-6)
    { factor: 1e-3, symbol: 'm' },  // mili (10^-3)
    { factor: 1, symbol: '' },      // base unit (10^0)
    { factor: 1e3, symbol: 'k' },   // kilo (10^3)
    { factor: 1e6, symbol: 'M' },   // mega (10^6)
    { factor: 1e9, symbol: 'G' },   // giga (10^9)
    { factor: 1e12, symbol: 'T' }   // tera (10^12)
  ];

  // Find the appropriate unit
  const appropriateUnit = units.slice().reverse().find(u => value >= u.factor);

  // Check if an appropriate unit was found (this is necessary to satisfy TypeScript's type system)
  if (!appropriateUnit) {
    Alert.alert('Error', 'Value is too small to format');
    return `${value}`;
  }

  // Convert the value to the found unit
  const formattedValue = (value / appropriateUnit.factor).toFixed(2); // Rounded to 2 decimal places

  return `${formattedValue} ${appropriateUnit.symbol}`;
}

export function formatSvgToBase64(svgString: string): string {
  console.log('svgString', svgString);
  return `data:image/svg+xml;base64,${btoa(svgString)}`;
}
