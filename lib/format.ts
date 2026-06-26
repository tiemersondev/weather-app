export function formatTemperature(value: number) {
  return `${Math.round(value)}deg`.replace("deg", "°");
}

export function formatMetric(value: number, unit: string) {
  if (unit === "in") {
    return `${Number(value.toFixed(1))} ${unit}`;
  }

  return `${Math.round(value)} ${unit}`;
}

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
