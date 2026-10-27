// Display the map in the first container.
vegaEmbed("#chart1", "stackedbarchart.json")
  .catch(console.error);

vegaEmbed("#chart2", "chloropeth.json")
  .catch(console.error);

fetch("convention_map_standalone.json", { cache: "no-store" })
  .then(response => response.json())
  .then(spec => {
    // Remove the oval globe background.

    spec.title = {
    text: "Spread of listed anime conventions by founding year",
    fontSize: 13
    };
    spec.layer = spec.layer.filter(layer => !layer.data?.sphere);

    // Add a rectangular blue background.
    spec.config = spec.config || {};
    spec.config.background = "#e6f4fa";
    spec.config.view = {
      stroke: "#d0d0d0",
      fill: "#e6f4fa"
    };

    return vegaEmbed("#chart3", spec, { actions: false });
  })
  .catch(console.error);



vegaEmbed("#chart4", "waffle.json")
.catch(console.error);




vegaEmbed("#chart5", "bumpchart.json")
.catch(console.error);

vegaEmbed("#chart6", "piechart.json")
.catch(console.error);

vegaEmbed("#chart7", "heatmap.json")
.catch(console.error);