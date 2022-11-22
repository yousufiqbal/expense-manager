<script>
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import GridOptions from "$lib/components/GridOptions.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import Title from "$lib/components/Title.svelte";

  export let data = { inside: '', name: '' }
  let modal = false
  let el
  
  const types = [
    { name: 'Expense', urlName: 'expense' },
    { name: 'Income', urlName: 'income' },
  ]

  const openModal = e => {
    e.target.blur()
    modal = true
  }

  const setInside = e => {
    data.inside = types.filter(el => el.urlName == e.detail.result)[0].name
    closeModal()
  }

  const closeModal = () => {
    modal = false
  }
</script>

<Title title="Add Category" back href="/settings/categories" />

<Form>
  <Field --cols={2} label="Inside" on:focus={openModal} value="{data.inside}" />
  <Field bind:el --cols={2} label="Category Name" bind:value={data.name} />
</Form>

<Buttons>
  <Button name="Save" icon="ri:save-line" />
  <Button name="Discard" icon="ri:close-line" on:click={()=>history.back()} type="secondary" />
</Buttons>

{#if modal}
<Modal type="secondary" on:close={closeModal} title="Choose Type">
  <GridOptions on:select={setInside} options={types} />
</Modal>
{/if}