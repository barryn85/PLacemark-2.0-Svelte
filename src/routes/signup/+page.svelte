<script lang="ts">

  import { goto }
    from "$app/navigation";

  import { userService }
    from "$lib/services/user-service";

  let firstName = $state("");

  let lastName = $state("");

  let email = $state("");

  let password = $state("");

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

      
      goto("/login");

    } else {

      alert(
        "Error signing up"
      );

    }

  }

</script>

<div class="container mt-6">

  <div class="columns is-centered">

    <div class="column is-one-third">

      <div class="box">

        <h1 class="title">
          Signup
        </h1>

        <div class="field">

          <label class="label">
            First Name
          </label>

          <input
            class="input"
            bind:value={firstName}
          />

        </div>

        <div class="field">

          <label class="label">
            Last Name
          </label>

          <input
            class="input"
            bind:value={lastName}
          />

        </div>

        <div class="field">

          <label class="label">
            Email
          </label>

          <input
            class="input"
            bind:value={email}
          />

        </div>

        <div class="field">

          <label class="label">
            Password
          </label>

          <input
            class="input"
            type="password"
            bind:value={password}
          />

        </div>

        <button
          class="button is-warning"
          onclick={signup}
        >

          Signup

        </button>

      </div>

    </div>

  </div>

</div>