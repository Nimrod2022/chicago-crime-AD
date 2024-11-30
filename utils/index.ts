export async function fetchData(url:string) {
  //console.log("Fetching URL:", url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("Network response was not ok", response.statusText);
      throw new Error("Failed to fetch GeoJSON data");
    }
    const data = await response.json();
    // console.log("Data received:", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
