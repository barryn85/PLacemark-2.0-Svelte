<script lang="ts">

  import { loggedInUser }
    from "$lib/runes.svelte";

</script>

<nav class="navbar has-background-warning">

  <div class="navbar-brand">

    <a
      class="navbar-item"
      href="/"
    >

      Metallica Tracker

    </a>

  </div>

  <div class="navbar-menu">

    <div class="navbar-start">

      <a
        class="navbar-item"
        href="/"
      >

        Home

      </a>

      <a
        class="navbar-item"
        href="/dashboard"
      >

        Dashboard

      </a>

      <a
        class="navbar-item"
        href="/charts"
      >

        Charts

      </a>

    </div>

    <div class="navbar-end">

      {#if loggedInUser.name}

        <span class="navbar-item">

          Welcome
          {loggedInUser.name}

        </span>

        <a
          class="navbar-item"
          href="/logout"
        >

          Logout

        </a>

      {:else}

        <a
          class="navbar-item"
          href="/signup"
        >

          Signup

        </a>

        <a
          class="navbar-item"
          href="/login"
        >

          Login

        </a>

      {/if}

    </div>

  </div>

</nav>