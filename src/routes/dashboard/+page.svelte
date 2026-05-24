<script lang="ts">

  import { goto } from "$app/navigation";
  import { loggedInUser } from "$lib/runes.svelte";
  import { placemarkService } from "$lib/services/placemark-service";
  import LeafletMap from "$lib/LeafletMap.svelte";
  import PlacemarkForm from "./PlacemarkForm.svelte";
  import PlacemarkCard from "./PlacemarkCard.svelte";

  let { data } =
    $props();

  let placemarks =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $state<any[]>(
      data.placemarks
    );

  let name =
    $state("");
  let category =
    $state("");
  let attendance =
    $state(0);
  let lat =
    $state(0);
  let lng =
    $state(0);
  let image =
    $state("");
  let editingPlacemark =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $state<any>(null);

  
  let map =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $state<any>(null);
  

$effect(() => {

  if (
    !map ||
    !placemarks ||
    placemarks.length === 0
  ) {
    return;
  }

  setTimeout(() => {

    placemarks.forEach(

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (placemark: any) => {

        map.addMarker(
          placemark.lat,
          placemark.lng,
          placemark.name,
          placemark.category
        );
      }
    );

    const lastPlacemark =
      placemarks[
        placemarks.length - 1
      ];

    if (lastPlacemark) {

      map.moveTo(
        lastPlacemark.lat,
        lastPlacemark.lng
      );
    }
  }, 100);

});
  
  async function addPlacemark() {

    const placemark = {
      userid:
        loggedInUser._id,
      name:
        name,
      category:
        category,
      lat:
        lat,
      lng:
        lng,
      attendance:
        attendance,
      image:
        image,
    };

    await placemarkService
      .addPlacemark(
        placemark
      );

    placemarks =
      await placemarkService
        .getPlacemarks();

    name = "";
    category = "";
    attendance = 0;
    lat = 0;
    lng = 0;
    image = "";
  }

  async function deletePlacemark(
    id: string
  ) {

    await placemarkService
      .deletePlacemark(
        id
      );

    placemarks =
      await placemarkService
        .getPlacemarks();

  }

 
  function editPlacemark(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    placemark: any
  ) {
    editingPlacemark =
      placemark;
    name =
      placemark.name;
    category =
      placemark.category;
    attendance =
      placemark.attendance;
    lat =
      placemark.lat;
    lng =
      placemark.lng;
    image =
      placemark.image;
  }

  async function savePlacemark() {

    editingPlacemark.name =
      name;

    editingPlacemark.category =
      category;

    editingPlacemark.attendance =
      attendance;

    editingPlacemark.lat =
      lat;

    editingPlacemark.lng =
      lng;

    editingPlacemark.image =
      image;

    await placemarkService
      .updatePlacemark(
        editingPlacemark
      );

    placemarks =
      await placemarkService
        .getPlacemarks();

    editingPlacemark =
      null;
    name = "";
    category = "";
    attendance = 0;
    lat = 0;
    lng = 0;
    image = "";
  }

</script>

<section class="hero mb-5">

  <div class="hero-body">

    <p class="title">
      Metallica Concert Tracker
    </p>

    <p class="subtitle">
      Track concerts worldwide
    </p>

  </div>

</section>

<div class="box p-2 mb-5">

  <LeafletMap
    bind:this={map}
    height={500}
  />

</div>

<div class="notification is-light mb-5">
  <strong>
    Total Venues:
  </strong>
  {placemarks.length}
</div>

<PlacemarkForm
  bind:name
  bind:category
  bind:attendance
  bind:lat
  bind:lng
  bind:image
  {editingPlacemark}
  {addPlacemark}
  {savePlacemark}
/>

<div class="columns is-multiline">

  {#each placemarks as placemark (placemark._id)}

    <div class="column is-one-third">

      <PlacemarkCard
        {placemark}
        {editPlacemark}
        {deletePlacemark}
      />
    </div>
  {/each}
</div>