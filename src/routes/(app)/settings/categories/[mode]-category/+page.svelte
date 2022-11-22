<script>
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import GridOptions from "$lib/components/GridOptions.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import Title from "$lib/components/Title.svelte";
  import { onMount } from 'svelte'

  let modal = false
  let el

  onMount(() => {
    setTimeout(() => {
      el.focus()
    }, 100);
  })

  const openModal = e => {
    e.target.blur()
    modal = true
  }
</script>

<Title title="Add Category" back href="/settings/categories" />

<Form>
  <Field --cols={2} label="In" on:focus={openModal} value="Expense" />
  <Field bind:el --cols={2} label="Category Name" />
</Form>

<Buttons>
  <Button name="Save Category" icon="ri:save-line" />
  <Button name="Discard" icon="ri:close-line" on:click={()=>history.back()} type="secondary" />
</Buttons>

{#if modal}
<Modal type="secondary" on:close={()=>modal=false} title="Choose Type">
  <GridOptions options={['Expense', 'Income']} />
</Modal>
{/if}