<script>
  import Message from "$lib/components/Message.svelte";
  import Profile from "./Profile.svelte";
  import { goto } from "$app/navigation";
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import Equal from "$lib/components/Equal.svelte";
  import Option from "$lib/components/Option.svelte";
  import Options from "$lib/components/Options.svelte";
  import Title from "$lib/components/Title.svelte";
  import { addToast } from "$lib/others/toasts";
  import { post } from "$lib/others/utils";
  import Tabs from "./Tabs.svelte";
  
  const crumbs = [
    { name: 'Settings', href: '/settings' },
    { name: 'Profile', href: '/settings/profile' },
  ]
  
  const logout = async () => {
    const response = await post('/settings/profile/logout')
    addToast({ message: (await response.json()).message, type: response.ok ? 'success' : 'error' })
    goto('/login')
  }

  /** @type {import('./$types').PageServerData} */
  export let data
</script>

<Breadcrumbs {crumbs} icon="ri:settings-4-line" />

<Equal>
  <Title title="Profile" back href="/settings" --mb="0" />
  <Options>
    <Option href="/settings/profile/change-password" name="Change Password" icon="ri:lock-password-line" />
    <Option href="/settings/profile/change-name" name="Change Name" icon="ri:edit-line" />
    <Option on:click={logout} name="Logout" icon="ri:logout-box-line" />
  </Options>
</Equal>

<!-- <Tabs /> -->

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