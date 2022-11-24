<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import ServerError from "$lib/components/ServerError.svelte";
  import Title from "$lib/components/Title.svelte";
  import { accountSchema, extractYupErrors } from "$lib/others/schema";
  import { addToast } from "$lib/others/toasts";
  import { capitalize, isEmpty, post, put } from "$lib/others/utils";

  /** @type {import('./$types').PageServerData} */
  export let data
  let account = data.account || { name: '', balance: 0 }
  let touched = false, errors = {}

  const validate = async () => {
    try {
      await accountSchema.validate(account, { abortEarly: false })
      errors = {}
    } catch (error) {
      errors = extractYupErrors(error)
    }
  }

  const addAccount = async () => {
    const response = await post('/accounts/add-account', account)
    const body = await response.json()
    if (response.ok) {
      addToast({ message: body.message })
      goto('/accounts')
    }
    if (response.status == 400) {
      errors.server = body.message
    }
  }

  const editAccount = async () => {
    const response = await put(`/accounts/${$page.params.mode}-account?account-id=${$page.url.searchParams.get('account-id')}`, account)
    const body = await response.json()
    if (response.ok) {
      addToast({ message: body.message })
      goto('/accounts')
    }
    if (response.status == 400) {
      errors.server = body.message
    }
  }

  const submit = async () => {
    if (isEmpty(errors)) {
      if ($page.params.mode == 'add') await addAccount()
      if ($page.params.mode == 'edit') await editAccount()
    } else {
      touched = true
    }
  }

  $: account && validate()
</script>

<Title title="{capitalize($page.params.mode)} Account" back href="/accounts" />

<Form>
  <Field {touched} error={errors.name} bind:value={account.name} --cols={2} label="Account Name" />
  {#if $page.params.mode == 'add'}
  <Field {touched} error={errors.balance} bind:value={account.balance} --cols={2} label="Starting Balance (Rs.)" inputmode="numeric" />
  {/if}
</Form>

<ServerError {errors} />

<Buttons>
  <Button name="Save" icon="ri:save-line" on:click={submit} />
  <Button name="Discard" icon="ri:close-line" href="/accounts" type="secondary" />
</Buttons>