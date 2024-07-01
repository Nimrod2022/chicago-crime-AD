export async function fetchBoundaries(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch GeoJSON data");
  }
  const data = await response.json();
  return data;
}
