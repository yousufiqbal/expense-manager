<script>
    import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import Title from "$lib/components/Title.svelte";
  import { accountSchema, extractYupErrors } from "$lib/others/schema";
  import { addToast } from "$lib/others/toasts";
  import { isEmpty, post } from "$lib/others/utils";

  export let data = { name: '', balance: 0 }
  let touched = false, errors = {}

  const validate = async () => {
    try {
      await accountSchema.validate(data, { abortEarly: false })
      errors = {}
    } catch (error) {
      errors = extractYupErrors(error)
    }
  }

  const addAccount = async () => {
    const response = await post('/accounts/add-account', data)
    const body = await response.json()
    if (response.ok) {
      addToast({ message: body.message })
      goto('/')
    }
    if (response.status == 400) {
      errors.server = body.message
    }
  }

  const submit = async () => {
    if (isEmpty(errors)) {
      await addAccount()
    } else {
      touched = true
    }
  }

  $: data && validate()
</script>

<Title title="Add Account" back href="/accounts" />

<Form>
  <Field {touched} error={errors.name} bind:value={data.name} --cols={2} label="Account Name" />
  {#if $page.params.mode == 'add'}
  <Field {touched} error={errors.balance} bind:value={data.balance} --cols={2} label="Starting Balance (Rs.)" inputmode="numeric" />
  {/if}
</Form>

<Buttons>
  <Button name="Save" icon="ri:save-line" on:click={submit} />
  <Button name="Discard" icon="ri:close-line" href="/accounts" type="secondary" />
</Buttons>