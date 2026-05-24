<script lang="ts">

  import { goto }  from "$app/navigation";
  import { userService } from "$lib/services/user-service";
  import Message  from "$lib/ui/Message.svelte";
  import UserCredentials  from "$lib/ui/UserCredentials.svelte";

  let firstName = $state("");
  let lastName = $state("");
  let email = $state("");
  let password = $state("");
  let message = $state("");

  async function signup() {

    const user = {

      firstName,
      lastName,
      email,
      password,

    };

    const success =
      await userService.signup(
        user
      );

    if (success) {

      // eslint-disable-next-line svelte/no-navigation-without-resolve
      goto("/login");

    } else {

      message =
        "Error signing up";

    }

  }

</script>

<div class="box">

  {#if message}

    <Message {message} />

  {/if}

  <div class="field">

    <label
      class="label"
      for="firstName"
    >

      First Name

    </label>

    <input
      id="firstName"
      class="input"
      bind:value={firstName}
    />

  </div>

  <div class="field">

    <label
      class="label"
      for="lastName"
    >

      Last Name

    </label>

    <input
      id="lastName"
      class="input"
      bind:value={lastName}
    />

  </div>

  <UserCredentials
    bind:email
    bind:password
  />

  <button
    onclick={() => signup()}
    class="button is-warning"
  >

    Signup

  </button>

</div>