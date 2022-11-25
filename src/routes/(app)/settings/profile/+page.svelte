<script>
  import Message from "$lib/components/Message.svelte";
  import Profile from "./Profile.svelte";

  /** @type {import('./$types').PageServerData} */
  export let data
</script>

<Profile {data} />

{#if !data.profile?.isVerified}
<Message>
  <p>
    Your account is not verified. Please click on the link sent to your <em>email inbox</em> to complete verification.
  </p>
</Message>
{/if}

{#if data.profile?.isVerified}
<Message type="success">
  <p>
    Your account is verified.
  </p>
</Message>
{/if}