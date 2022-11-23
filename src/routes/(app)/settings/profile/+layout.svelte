<script>
  import { goto } from "$app/navigation";
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import Equal from "$lib/components/Equal.svelte";
  import Option from "$lib/components/Option.svelte";
  import Options from "$lib/components/Options.svelte";
  import Title from "$lib/components/Title.svelte";
  import Tabs from "./Tabs.svelte";

  const crumbs = [
    { name: 'Settings', href: '/settings' },
    { name: 'Profile', href: '/settings/profile' },
  ]

  const logout = () => {
    goto('/login')
  }
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

<Tabs />

<slot></slot>