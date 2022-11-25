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
  export let data = {
    account: '',
    category: '',
    min: '', 
    max: ''
  }

  let modal = {
    chooseAccount: false, chooseCategory: false
  }

  const accounts = [
    { name: 'Papa', urlName: 'papa' },
    { name: 'Office', urlName: 'office' },
    { name: 'Yousuf', urlName: 'yousuf' },
  ]
  
  const expenseCategories = [
    { name: 'Grocery', urlName: 'grocery' },
    { name: 'Transport', urlName: 'transport' },
    { name: 'Bills', urlName: 'bills' },
    { name: 'Health', urlName: 'health' },
    { name: 'Others', urlName: 'others' },
  ]

  const closeAllModals = () => {
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

  const setAccount = e => {
    data.account = accounts.filter(el => el.urlName == e.detail.result)[0].name
    closeAllModals()
  }

  const setExpenseCategory = e => {
    data.category = expenseCategories.filter(el => el.urlName == e.detail.result)[0].name
    closeAllModals()
  }

  $: summary = [
    { title: 'Income', amount: 0, color: 'blue' },
    { title: 'Expenses', amount: 0, color: 'red' },
    { title: 'Transfer', amount: 0, color: 'black' },
  ]
</script>

<Search />

{#if filters}
<Form --mb="30px">
  <Field bind:value={data.account} label="Account" on:focus={openAccountModal} />
  <Field bind:value={data.category} label="Category" on:focus={openCategoryModal} />
  <Field bind:value={data.min} label="Amount Min" inputmode="numeric" />
  <Field bind:value={data.max} label="Amount Max" inputmode="numeric" />
</Form>
{/if}

<FiltersToggle bind:filters />

<Summary {summary} />
<Results />

{#if modal.chooseAccount}
<Modal on:close={closeAllModals} title="Choose Account">
  <GridOptions on:select={setAccount} options={accounts} />
</Modal>
{/if}

{#if modal.chooseCategory}
<Modal on:close={closeAllModals} title="Choose Category">
  <GridOptions on:select={setExpenseCategory} options={expenseCategories} />
</Modal>
{/if}