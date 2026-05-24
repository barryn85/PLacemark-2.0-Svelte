<script lang="ts">

  let {
    name = $bindable(),
    category = $bindable(),
    attendance = $bindable(),
    lat = $bindable(),
    lng = $bindable(),
    image = $bindable(),
    editingPlacemark,
    addPlacemark,
    savePlacemark
  } = $props();

</script>

<div class="box">

  <div class="field">

    <label
      class="label"
      for="name" >

      Name
    </label>
    <input
      id="name"
      class="input"
      bind:value={name} />

  </div>

  <div class="field">

    <label
      class="label"
      for="category">

      Category

    </label>

    <input
      id="category"
      class="input"
      bind:value={category}/>

  </div>

  <div class="field">

    <label
      class="label"
      for="attendance">

      Attendance

    </label>

    <input
      id="attendance"
      class="input"
      type="number"
      bind:value={attendance}/>

  </div>

  <div class="field">

    <label
      class="label"
      for="lat">

      Latitude

    </label>

    <input
      id="lat"
      class="input"
      type="number"
      bind:value={lat}/>
    </div>

  <div class="field">

    <label
      class="label"
      for="lng">

      Longitude
    </label>

    <input
      id="lng"
      class="input"
      type="number"
      bind:value={lng}/>

  </div>

  <div class="field">

  <label
    class="label"
    for="image"
  >

    Image URL

  </label>

  <input
    id="image"
    class="input"
    bind:value={image}
  />

</div>

  {#if editingPlacemark}

    <button
      class="button is-info"
      onclick={savePlacemark}>

      Save Changes
    </button>

  {:else}

    <button
      class="button is-warning"
      onclick={addPlacemark}>

      Add Placemark

    </button>

  {/if}

</div>