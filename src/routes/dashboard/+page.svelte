<script lang="ts">

  import { onMount }   from "svelte";
  import { goto }   from "$app/navigation";
  import { loggedInUser }  from "$lib/runes.svelte";
  import { placemarkService }  from "$lib/services/placemark-service";
  import LeafletMap   from "$lib/LeafletMap.svelte";
  import PlacemarkForm   from "./PlacemarkForm.svelte";
  import PlacemarkCard   from "./PlacemarkCard.svelte";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let placemarks =
    $state<any[]>([]);

  let name = $state("");
  let category = $state("");
  let attendance = $state(0);
  let lat =  $state(0);
  let lng =  $state(0);
  let image = $state("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let editingPlacemark =
    $state<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let map =
    $state<any>(null);

  onMount(async () => {

    if (!loggedInUser.token) {
      goto("/login");
      return;

    }

    placemarks =
      await placemarkService
        .getPlacemarks();

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

  });

  async function addPlacemark() {

    const placemark = {

      userid:
        loggedInUser._id,
      name: name,
      category: category,
      lat: lat,
      lng: lng,
      attendance: attendance,
      image: image
    };

    await placemarkService
      .addPlacemark(
        placemark
      );

    placemarks =
      await placemarkService
        .getPlacemarks();

    map.addMarker(
      placemark.lat,
      placemark.lng,
      placemark.name,
      placemark.category
    );

    map.moveTo(
      placemark.lat,
      placemark.lng
    );

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
      .deletePlacemark(id);

    placemarks =
      await placemarkService
        .getPlacemarks();

  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function editPlacemark(
    placemark: any
  ) {

    editingPlacemark =
      placemark;
    name = placemark.name;
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

<h1 class="title">

  Metallica Stadium Tracker

</h1>

<LeafletMap
  bind:this={map}
  height={500}
/>

<p class="mb-5">

  Total Placemarks:
  {placemarks.length}

</p>

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