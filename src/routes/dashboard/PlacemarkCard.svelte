<script lang="ts">

  let {

    placemark,

    editPlacemark,

    deletePlacemark

  } = $props();

</script>

<div class="card">

  {#if placemark.image}

    <div class="card-image">

      <figure class="image is-4by3">

        <img
          src={placemark.image}
          alt={placemark.name}
          style="
            object-fit: cover;
          "
        />

      </figure>

    </div>

  {/if}

  <div class="card-content">

    <p class="title is-4">

      {placemark.name}

    </p>

    <p class="subtitle is-6">

      {placemark.category}

    </p>

    <div class="content">

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