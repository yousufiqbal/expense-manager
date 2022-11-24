<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Title from "$lib/components/Title.svelte";
  import { addToast } from "$lib/others/toasts";
  import { put } from "$lib/others/utils";
  import { onMount } from "svelte";
  
  onMount(() => {
    setTimeout(async () => {
      await verifyEmail()
    }, 2000);
  })
  
  const verifyEmail = async () => {
    const response = await put(`/verify-email?email=${$page.url.searchParams.get('email')}.com&token=${$page.url.searchParams.get('token')}`)
    if (response.ok) {
      addToast({ message: (await response.json()).message })
    }
    goto('/')
  }
</script>

<Title title="Verifying Email" icon="ri:time-line" />