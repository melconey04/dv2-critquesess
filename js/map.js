async function loadMap() {
  const response = await fetch("data/conventions.geojson");
  if (!response.ok) throw new Error("Could not load convention data");
  const geojson = await response.json();
  const result = await vegaEmbed("#convention_map", "convention_map.json", {
    actions: false,
    renderer: "svg"
  });
  function updateSummary() {
    const year = result.view.signal("selectedYear");
    const mode = result.view.signal("yearMode");
    const visible = geojson.features.filter(function (feature) {
      return mode === "Founded by this year"
        ? feature.properties.established <= year
        : feature.properties.established === year;
    });
    const countries = new Set(visible.map(f => f.properties.country)).size;
    document.getElementById("year_summary").textContent =
      year + ": " + visible.length + " listed convention locations across " +
      countries + " countries (" + mode.toLowerCase() + ").";
  }
  result.view.addSignalListener("selectedYear", updateSummary);
  result.view.addSignalListener("yearMode", updateSummary);
  updateSummary();
}
loadMap().catch(function (error) {
  document.getElementById("convention_map").textContent =
    "Could not load the map. Open index.html with VS Code Live Server.";
  console.error(error);
});
