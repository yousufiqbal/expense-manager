<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import ServerError from "$lib/components/ServerError.svelte";
  import Title from "$lib/components/Title.svelte";
  import { changePasswordSchema, extractYupErrors } from "$lib/others/schema";
    import { addToast } from "$lib/others/toasts";
  import { isEmpty, post } from "$lib/others/utils";

  let form = { currentPassword: '', newPassword: '' }
  let touched = false, errors = {}

  const crumbs = [
    { name: 'Settings', href: '/settings' },
    { name: 'Profile', href: '/settings/profile' },
    { name: 'Change Password', href: $page.url.pathname },
  ]

  const validate = async () => {
    try {
      await changePasswordSchema.validate(form, { abortEarly: false})
      errors = {}
    } catch (error) {
      errors = extractYupErrors(error)
    }
  }

  const submit = async () => {
    if (isEmpty(errors)) {
      await changePassword()
    } else {
      touched = true
    }
  }

  const changePassword = async () => {
    const response = await post($page.url.pathname, form)
    const body = await response.json()
    if (response.ok) {
      addToast({ message: body.message })
    }
    if (response.status == 400) {
      errors.server = body.message
    }
    goto('/settings/profile')
  }

  $: form && validate()
</script>

<Breadcrumbs {crumbs} icon="ri:settings-4-line" />

<Title back href="/settings/profile" title="Change Password" />

<Form --gap="30px">
  <Field {touched} type="password" error={errors.currentPassword} label="Current Password" --cols={2} bind:value={form.currentPassword} />
  <Field {touched} type="password" error={errors.newPassword} label="New Password" --cols={2} bind:value={form.newPassword} />
</Form>

<ServerError {errors} />

<Buttons --gap="25px">
  <Button name="Save" icon="ri:edit-line" on:click={submit} />
  <Button name="Discard" type="secondary" on:click={()=>history.back()} icon="ri:close-line" />
</Buttons>