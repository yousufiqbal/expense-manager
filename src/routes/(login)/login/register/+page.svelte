<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import ServerError from "$lib/components/ServerError.svelte";
  import { extractYupErrors, registerSchema } from "$lib/others/schema";
  import { title } from "$lib/others/stores";
  import { addToast } from "$lib/others/toasts";
  import { axios, isEmpty, post } from "$lib/others/utils";

  $title = 'Register'
  let user = { name: '', email: '', password: '' }
  let touched = false, errors = {}

  const validate = async () => {
    try {
      await registerSchema.validate(user, { abortEarly: false })
      errors = {}
    } catch (error) {
      errors = extractYupErrors(error)
    }
  }

  const submit = async () => {
    if (isEmpty(errors)) {
      await register()
    } else {
      touched = true
    }
  }

  const register = async () => {
    const response = await post($page.url.pathname, user)
    if (response.ok) goto('/welcome')
    if (response.status == 400) errors.server = (await response.json()).message
  }

  $: if (user) validate()
</script>

<Form --gap="30px">
  <Field {touched} error={errors.name} bind:value={user.name} label="Name" --cols={2} />
  <Field {touched} error={errors.email} bind:value={user.email} label="Email" --cols={2} type="email" />
  <Field {touched} error={errors.password} bind:value={user.password} label="Password" --cols={2} type="password" />
</Form>

<ServerError {errors} />

<Buttons --gap="25px">
  <Button on:click={submit} name="Register" icon="ri:check-double-line" type="secondary" />
  <Button name="Already a user?" type="ghost" href="/login" />
</Buttons>