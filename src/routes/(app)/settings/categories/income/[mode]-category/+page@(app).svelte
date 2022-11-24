<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import Title from "$lib/components/Title.svelte";
  import { categorySchema, extractYupErrors } from "$lib/others/schema";
  import { addToast } from "$lib/others/toasts";
  import { capitalize, isEmpty, post, put } from "$lib/others/utils";

  /** @type {import('./$types').PageServerData} */
  export let data = {}
  let category = data.category || { name: '' }

  let touched = false, errors = {}

  const validate = async () => {
    try {
      await categorySchema.validate(category, { abortEarly: false })
      errors = {}
    } catch (error) {
      errors = extractYupErrors(error)
    }
  }

  const addCategory = async () => {
    const response = await post('/settings/categories/income/add-category', category)
    const body = await response.json()
    if (response.ok) {
      addToast({ message: body.message })
      goto('/settings/categories/income')
    }
  }
  
  const editCategory = async () => {
    const response = await put('/settings/categories/income/edit-category?category-id=' + $page.url.searchParams.get('category-id'), category)
    const body = await response.json()
    if (response.ok) {
      addToast({ message: body.message })
      goto('/settings/categories/income')
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

  $: category && validate()
</script>

<Title title="{capitalize($page.params.mode)} Income Category" back href="/settings/categories/income" />

<Form>
  <Field {touched} error={errors.name} --cols={2} label="Category Name" bind:value={category.name} />
</Form>

<Buttons>
  <Button on:click={submit} name="Save" icon="ri:save-line" />
  <Button name="Discard" icon="ri:close-line" on:click={()=>history.back()} type="secondary" />
</Buttons>
