<script lang="ts">

  import { goto } from "$app/navigation";

  import { loggedInUser }   from "$lib/runes.svelte";

  import { userService }   from "$lib/services/user-service";

  import Message   from "$lib/ui/Message.svelte";

  import UserCredentials  from "$lib/ui/UserCredentials.svelte";

  let email = $state("");

  let password = $state("");

  let message = $state("");

  async function login() {

    console.log(
      `attempting to log in email: ${email}`
    );

    const session =
      await userService.login(
        email,
        password
      );

    if (session) {

      loggedInUser.email =
        email;

      loggedInUser.name =
        session.name;

      loggedInUser.token =
        session.token;

      loggedInUser._id =
        session._id;

      // eslint-disable-next-line svelte/no-navigation-without-resolve
      goto("/dashboard");

    } else {

      email = "";

      password = "";

      message =
        "Invalid Credentials";

    }

  }

</script>

<div class="box">

  {#if message}

    <Message {message} />

  {/if}

  <UserCredentials
    bind:email
    bind:password
  />

  <button
    onclick={() => login()}
    class="button is-warning"
  >

    Log In

  </button>

</div>