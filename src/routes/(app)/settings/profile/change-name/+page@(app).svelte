<script>
    import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import Title from "$lib/components/Title.svelte";
    import { extractYupErrors, profileNameSchema } from "$lib/others/schema";
    import { addToast } from "$lib/others/toasts";
    import { isEmpty, post } from "$lib/others/utils";

  /** @type {import('./$types').PageServerData} */
  export let data
  let touched = false, errors = {}

  const crumbs = [
    { name: 'Settings', href: '/settings' },
    { name: 'Profile', href: '/settings/profile' },
    { name: 'Change Name', href: $page.url.pathname },
  ]

  const validate = async () => {
    try {
      await profileNameSchema.validate(data.user, { abortEarly: false })
      errors = {}
    } catch (error) {
      errors = extractYupErrors(error)
    }
  }

  const changeName = async () => {
    const response = await post('/settings/profile/change-name', data.user)
    const body = await response.json()
    if (response.ok) {
      addToast({ message: body.message })
      goto('/settings/profile')
    }
  }

  const submit = async () => {
    if (isEmpty(errors)) {
      await changeName()
    } else {
      touched = true
    }
  }

  $: data && validate()
</script>

<Breadcrumbs {crumbs} icon="ri:settings-4-line" />

<Title back href="/settings/profile" title="Change Name" />

<Form --gap="30px">
  <Field {touched} error={errors.name} label="Name" --cols={2} bind:value={data.user.name} />
</Form>

<Buttons --gap="25px">
  <Button on:click={submit} name="Save" icon="ri:save-line" />
  <Button name="Discard" type="secondary" on:click={()=>history.back()} icon="ri:close-line" />
</Buttons>