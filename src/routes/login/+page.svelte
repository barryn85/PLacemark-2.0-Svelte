<script lang="ts">

  import { goto }
    from "$app/navigation";

  import { userService }
    from "$lib/services/user-service";

  let email = $state("");

  let password = $state("");

  async function login() {

    const session =
      await userService.login(
        email,
        password
      );

    console.log(session);

    if (session) {

      window.location.href =
  "/dashboard";

    } else {

      email = "";

      password = "";

      alert(
        "Invalid Credentials"
      );

    }

  }

</script>
<div class="container mt-6"> 
    <div class="columns is-centered"> 
        <div class="column is-one-third"> 
            <div class="box"> 
                <h1 class="title"> Login </h1> 
                <div class="field"> 
                    <label class="label"> Email </label> 
                    <input class="input" bind:value={email} /> 
                </div> 
                
                <div class="field"> 
                    <label class="label"> Password </label> 
                    <input class="input" type="password" bind:value={password} /> </div>
                    
                    <button class="button is-warning" onclick={login} > Login </button> </div> 
                </div> 
            </div> 
        </div>