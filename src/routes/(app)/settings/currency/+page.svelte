<script>
  import { goto, invalidateAll } from "$app/navigation";
  import { page } from "$app/stores";
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import Title from "$lib/components/Title.svelte";
  import { addToast } from "$lib/others/toasts";
  import { post } from "$lib/others/utils";

  let error = null

  const crumbs = [
    { name: 'Settings', href: '/settings' },
    { name: 'Currency', href: '/settings/currency' },
  ]

  const submit = async () => {
    if (!data.user.currency) { error = 'Required'; return }
    if (data.user.currency.length > 4) { error = 'Only 4 Characters Allowed'; return }
    error = null
    await editCurrency()
  }

  const editCurrency = async () => {
    const response = await post($page.url.pathname, data.user)
    addToast({ message: (await response.json()).message, type: response.ok ? 'success' : 'error' })
    await invalidateAll()
    goto('/settings')
  }

  /** @type {import('./\types').PageServerData} */
  export let data
</script>

<Breadcrumbs {crumbs} icon="ri:settings-4-line" />

<Title title="Currency" back href="/settings"  />

<Form>
  <Field --cols={2} label="Currency Unit" {error}  bind:value={data.user.currency} />
</Form>

<Buttons>
  <Button name="Save" icon="ri:save-line" on:click={submit} />
  <Button name="Discard" icon="ri:close-line" on:click={()=>history.back()} type="secondary" />
</Buttons>