<script lang="ts">

  import { onMount }  from "svelte";
  import Menu   from "$lib/ui/Menu.svelte";
  import { userService }  from "$lib/services/user-service";

  onMount(() => {
    userService.restoreSession();
  });

</script>

<Menu />
<section class="section">
  <slot />
</section>