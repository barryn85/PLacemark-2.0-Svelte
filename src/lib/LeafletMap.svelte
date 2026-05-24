<script lang="ts">

  import "leaflet/dist/leaflet.css";

  import { onMount }
    from "svelte";

  import type {
    Map as LeafletMapType,
    LayerGroup,
  } from "leaflet";

  let map: LeafletMapType;

  let mapElement:
    HTMLDivElement;

  let {

    height = 500,

    lat = 53.3498,

    lng = -6.2603,

    zoom = 7,

  } = $props();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let leaflet: any;

  let markers: LayerGroup;

  onMount(async () => {

    leaflet =
      await import("leaflet");

    markers =
      leaflet.layerGroup();

    map = leaflet.map(
      mapElement,
      {
        center: [lat, lng],
        zoom: zoom,
        layers: [markers],
      }
    );

    leaflet.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          "© OpenStreetMap contributors",
      }
    ).addTo(map);

  });

  export function addMarker(
    lat: number,
    lng: number,
    popupText: string,
    category: string
  ) {

    let markerColor =
      "blue";

    if (
      category === "Festival"
    ) {

      markerColor = "red";

    }

    if (
      category === "Arena"
    ) {

      markerColor = "green";

    }

    const marker =
      leaflet.circleMarker(
        [lat, lng],
        {
          radius: 10,
          color: markerColor,
          fillColor:
            markerColor,
          fillOpacity: 0.8,
        }
      );

    marker.bindPopup(
      popupText
    );

    marker.addTo(markers);

  }

  export function clearMarkers() {

  markers.clearLayers();

}

  export function moveTo(
    lat: number,
    lng: number
  ) {

    map.flyTo(
      [lat, lng],
      zoom
    );

  }

</script>

<div
  bind:this={mapElement}
  style="height: {height}px;"
></div>