<script lang="ts">
  import {goto} from "$app/navigation";
  import {userService} from "$lib/services/user-service";

  async function logout() {
    userService.clearSession();
    await fetch(
      "/api/users/logout",
      {
        method: "POST",
      }
    );

    // eslint-disable-next-line svelte/no-navigation-without-resolve
    goto("/");

  }

  logout();

</script>