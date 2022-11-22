<script>
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import GridOptions from "$lib/components/GridOptions.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import Search from "$lib/components/Search.svelte";
  import Summary from "$lib/components/Summary.svelte";
  import { title } from "$lib/others/stores";
  import FiltersToggle from "./FiltersToggle.svelte";
  import Results from "./Results.svelte";

  $title = 'Search'
  let filters = true

  let modal = {
    chooseAccount: false, chooseCategory: false
  }

  const close = () => {
    modal.chooseAccount = false
    modal.chooseCategory = false
  }

  const openAccountModal = e => {
    e.target.blur()
    modal.chooseAccount = true
  }

  const openCategoryModal = e => {
    e.target.blur()
    modal.chooseCategory = true
  }
</script>

<Search />

{#if filters}
<Form --mb="30px">
  <Field label="Account" on:focus={openAccountModal} />
  <Field label="Category" on:focus={openCategoryModal} />
  <Field label="Amount Min" inputmode="numeric" />
  <Field label="Amount Max" inputmode="numeric" />
</Form>
{/if}

<FiltersToggle bind:filters />

<Summary />

<Results />

{#if modal.chooseAccount}
<Modal on:close={close} title="Choose Account">
  <GridOptions options={['Home', 'Yousuf', 'Office']} />
</Modal>
{/if}

{#if modal.chooseCategory}
<Modal on:close={close} title="Choose Category">
  <GridOptions options={['Grocery', 'Transport', 'Bills', 'Health', 'Others']} />
</Modal>
{/if}