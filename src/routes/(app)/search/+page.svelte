<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import GridOptions from "$lib/components/GridOptions.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import Search from "$lib/components/Search.svelte";
  import Summary from "$lib/components/Summary.svelte";
  import { title } from "$lib/others/stores";
  import { setQuery } from "$lib/others/utils";
  import FiltersToggle from "./FiltersToggle.svelte";
  import Results from "./Results.svelte";

  $title = 'Search'
  export let data

  let filters = false
  let form = {}

  let modal = {
    accounts: false, categories: false
  }

  
  const expenseCategories = [
    { name: 'Grocery', urlName: 'grocery' },
    { name: 'Transport', urlName: 'transport' },
    { name: 'Bills', urlName: 'bills' },
    { name: 'Health', urlName: 'health' },
    { name: 'Others', urlName: 'others' },
  ]

  const closeAllModals = () => {
    modal.accounts = false
    modal.categories = false
  }

  const openAccountModal = e => {
    e.target.blur()
    modal.accounts = true
  }

  const openCategoryModal = e => {
    e.target.blur()
    modal.categories = true
  }

  const setAccount = e => {
    // data.filter.accountId = accounts.filter(el => el.urlName == e.detail.result)[0].name
    closeAllModals()
  }

  const setExpenseCategory = e => {
    data.filter.expenseCategoryId = expenseCategories.filter(el => el.urlName == e.detail.result)[0].name
    closeAllModals()
  }

  const setIncomeCategory = e => {
    data.filter.incomeCategoryId = expenseCategories.filter(el => el.urlName == e.detail.result)[0].name
    closeAllModals()
  }

  const fire = () => {
    goto($page.url.pathname + setQuery(form, $page))
  }

  $: summary = [
    { title: 'Income', amount: 0, color: 'blue' },
    { title: 'Expenses', amount: 0, color: 'red' },
    { title: 'Transfer', amount: 0, color: 'black' },
  ]
</script>

<Search on:click={fire} />

{#if filters}
<Form --mb="30px">
  <Field label="Account" on:focus={openAccountModal} />
  <Field label="Category" on:focus={openCategoryModal} />
  <Field bind:value={form.min} label="Amount Min" inputmode="numeric" />
  <Field bind:value={form.max} label="Amount Max" inputmode="numeric" />
</Form>
{/if}

<FiltersToggle bind:filters />

<Summary {summary} />

<Results />

{#if modal.accounts}
<Modal on:close={closeAllModals} title="Choose Account">
  <GridOptions on:select={setAccount} options={data.accounts} name="name" value="accountId" />
</Modal>
{/if}

{#if modal.categories}
<Modal on:close={closeAllModals} title="Choose Category">
  <GridOptions on:select={setExpenseCategory}  options={data.expenseCategories} name="name" value="expenseCategoryId" />
  <GridOptions on:select={setIncomeCategory}  options={data.incomeCategories} name="name" value="incomeCategoryId" />
</Modal>
{/if}