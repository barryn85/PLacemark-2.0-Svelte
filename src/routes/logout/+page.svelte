<script lang="ts">

  import { goto }
    from "$app/navigation";

  import { onMount }
    from "svelte";

  import { loggedInUser }
    from "$lib/runes.svelte";

  onMount(() => {

    localStorage.removeItem(
      "user"
    );

    loggedInUser.email = "";

    loggedInUser.name = "";

    loggedInUser.token = "";

    loggedInUser._id = "";

    goto("/");

  });

</script>