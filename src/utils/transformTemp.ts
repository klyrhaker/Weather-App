type TemperatureUnit = "celsius" | "fahrenheit";

function transformTemp(temp: number, unit: TemperatureUnit): number {
  if (unit === "celsius") {
    return Math.round(temp * 1.8 + 32);
  }
  return Math.round((temp - 32) / 1.8);
}
export default transformTemp;
