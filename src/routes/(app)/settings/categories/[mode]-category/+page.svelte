<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import GridOptions from "$lib/components/GridOptions.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import Title from "$lib/components/Title.svelte";
  import { categorySchema, extractYupErrors } from "$lib/others/schema";
  import { addToast } from "$lib/others/toasts";
  import { capitalize, isEmpty, post, put } from "$lib/others/utils";

  /** @type {import('./$types').PageServerData} */
  export let data = {}

  let touched = false, errors = {}

  let modal = false
  
  const types = [
    { name: 'Expense', urlName: 'expense' },
    { name: 'Income', urlName: 'income' },
  ]

  const validate = async () => {
    try {
      await categorySchema.validate(data.category, { abortEarly: false })
      errors = {}
    } catch (error) {
      errors = extractYupErrors(error)
    }
  }

  const addCategory = async () => {
    const response = await post('/settings/categories/add-category', data.category)
    const body = await response.json()
    if (response.ok) {
      addToast({ message: body.message })
      goto('/')
    }
  }

  const editCategory = async () => {
    const response = await put('/settings/categories/edit-category?category-id=' + $page.url.searchParams.get('category-id'), data.category)
    const body = await response.json()
    if (response.ok) {
      addToast({ message: body.message })
      goto('/settings/categories')
    }
  }

  const submit = async () => {
    if (isEmpty(errors)) {
      if ($page.params.mode == 'add') await addCategory()
      if ($page.params.mode == 'edit') await editCategory()
    } else {
      touched = true
    }
  }
  
  const openModal = e => {
    e.target.blur()
    modal = true
  }
  
  const setInside = e => {
    data.category.belongsTo = types.filter(el => el.urlName == e.detail.result)[0].name
    closeModal()
  }
  
  const closeModal = () => {
    modal = false
  }

  $: data && validate()
</script>

<Title title="{capitalize($page.params.mode)} Category" back href="/settings/categories" />

<Form>
  <Field {touched} error={errors.name} --cols={2} label="Category Name" bind:value={data.category.name} />
  <Field {touched} error={errors.belongsTo} --cols={2} label="Belongs To" on:focus={openModal} value="{data.category.belongsTo}" />
</Form>

<Buttons>
  <Button on:click={submit} name="Save" icon="ri:save-line" />
  <Button name="Discard" icon="ri:close-line" on:click={()=>history.back()} type="secondary" />
</Buttons>

{#if modal}
<Modal type="secondary" on:close={closeModal} title="Choose Type">
  <GridOptions on:select={setInside} options={types} />
</Modal>
{/if}