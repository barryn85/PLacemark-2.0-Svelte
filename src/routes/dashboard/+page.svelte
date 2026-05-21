<script lang="ts">

  import { onMount }
    from "svelte";

  import { goto }
    from "$app/navigation";

  import { loggedInUser }
    from "$lib/runes.svelte";

  import { placemarkService }
    from "$lib/services/placemark-service";

  import LeafletMap
    from "$lib/LeafletMap.svelte";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let placemarks = $state<any[]>([]);

  let name = $state("");

  let description = $state("");

  let category = $state("");

  let attendance = $state(0);

  let lat = $state(0);

  let lng = $state(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let editingPlacemark = $state<any>(null);
    

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let map: $state<any>;

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

      description:
        description,

      category:
        category,

      lat: lat,

      lng: lng,

      attendance:
        attendance,

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

    description = "";

    category = "";

    attendance = 0;

    lat = 0;

    lng = 0;

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

    name =
      placemark.name;

    description =
      placemark.description;

    category =
      placemark.category;

    attendance =
      placemark.attendance;

    lat =
      placemark.lat;

    lng =
      placemark.lng;

  }

  async function savePlacemark() {

    editingPlacemark.name =
      name;

    editingPlacemark.description =
      description;

    editingPlacemark.category =
      category;

    editingPlacemark.attendance =
      attendance;

    editingPlacemark.lat =
      lat;

    editingPlacemark.lng =
      lng;

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

    description = "";

    category = "";

    attendance = 0;

    lat = 0;

    lng = 0;

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

<div class="box">

  <div class="field">

    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label class="label">
      Name
    </label>

    <input
      class="input"
      bind:value={name}
    />

  </div>

  <div class="field">

    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label class="label">
      Description
    </label>

    <input
      class="input"
      bind:value={description}
    />

  </div>

  <div class="field">

    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label class="label">
      Category
    </label>

    <input
      class="input"
      bind:value={category}
    />

  </div>

  <div class="field">

    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label class="label">
      Attendance
    </label>

    <input
      class="input"
      type="number"
      bind:value={attendance}
    />

  </div>

  <div class="field">

    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label class="label">
      Latitude
    </label>

    <input
      class="input"
      type="number"
      bind:value={lat}
    />

  </div>

  <div class="field">

    <!-- svelte-ignore a11y_label_has_associated_control -->
    <label class="label">
      Longitude
    </label>

    <input
      class="input"
      type="number"
      bind:value={lng}
    />

  </div>

  {#if editingPlacemark}

    <button
      class="button is-info"
      onclick={savePlacemark}
    >

      Save Changes

    </button>

  {:else}

    <button
      class="button is-warning"
      onclick={addPlacemark}
    >

      Add Placemark

    </button>

  {/if}

</div>

<div class="columns is-multiline">

  {#each placemarks as placemark (placemark._id)}

    <div class="column is-one-third">

      <div class="card">

        <div class="card-content">

          <p class="title is-4">
            {placemark.name}
          </p>

          <p class="subtitle is-6">
            {placemark.category}
          </p>

          <div class="content">

            <p>
              {placemark.description}
            </p>

            <p>
              Attendance:
              {placemark.attendance}
            </p>

            <button
              class="button is-info mt-3 mr-2"
              onclick={() =>
                editPlacemark(
                  placemark
                )
              }
            >

              Edit

            </button>

            <button
              class="button is-danger mt-3"
              onclick={() =>
                deletePlacemark(
                  placemark._id
                )
              }
            >

              Delete

            </button>

          </div>

        </div>

      </div>

    </div>

  {/each}

</div>