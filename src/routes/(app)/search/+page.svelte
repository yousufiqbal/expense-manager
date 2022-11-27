<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import GridOptions from "$lib/components/GridOptions.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import Search from "$lib/components/Search.svelte";
  import Select from "$lib/components/Select.svelte";
  import Summary from "$lib/components/Summary.svelte";
  import { title } from "$lib/others/stores";
  import { setQuery } from "$lib/others/utils";
  import FiltersToggle from "./FiltersToggle.svelte";
  import Results from "./Results.svelte";

  $title = 'Search'

  export let data

  let filters = true
  let form = {}
  let values = {}
  let keyword = ''

  let modal = { accounts: false, categories: false }

  const closeAllModals = () => {
    modal.accounts = false
    modal.categories = false
  }

  const openAccountModal = e => {
    modal.accounts = true
  }

  const openCategoryModal = e => {
    e.target.blur()
    modal.categories = true
  }

  const setAccount = e => {
    form['account-id'] = +e.detail.result
    closeAllModals()
  }

  const setExpenseCategory = e => {
    form['income-category-id'] = ''
    form['expense-category-id'] = e.detail.result
    values.categoryName = data.expenseCategories.filter(el => el.expenseCategoryId == e.detail.result)[0].name
    closeAllModals()
  }
  
  const setIncomeCategory = e => {
    form['expense-category-id'] = ''
    form['income-category-id'] = e.detail.result
    values.categoryName = data.incomeCategories.filter(el => el.incomeCategoryId == e.detail.result)[0].name
    closeAllModals()
  }

  const search = () => {
    goto($page.url.pathname + setQuery({ keyword, ...form }, $page))
  }

  $: summary = [
    { title: 'Income', amount: 0, color: 'blue' },
    { title: 'Expenses', amount: 0, color: 'red' },
    { title: 'Transfer', amount: 0, color: 'black' },
  ]

  const clearFilters = () => {
    values = {}
    form = { 'account-id': '' }
  }
</script>

<Search bind:keyword on:click={search} />

{#if filters}
<Form --mb="30px">
  <Select label="Account" on:click={openAccountModal} bind:value={form['account-id']} options={data.accounts} n="name" v="accountId" />
  <Field placeholder="Choose" value={values?.categoryName} label="Category" on:focus={openCategoryModal} />
  <Field bind:value={form.min} label="Amount Min" inputmode="numeric" />
  <Field bind:value={form.max} label="Amount Max" inputmode="numeric" />
</Form>
{/if}

<FiltersToggle {filters} on:clear={clearFilters} on:toggle={()=>filters=!filters} {form} />

<Summary {summary} />

<Results />

{#if modal.accounts}
<Modal on:close={closeAllModals} title="Choose Account">
  <GridOptions on:select={setAccount} options={data.accounts} n="name" v="accountId" />
</Modal>
{/if}

{#if modal.categories}
<Modal on:close={closeAllModals} title="Choose Category">
  <h2 style="color: var(--red)">Expense</h2>
  <GridOptions on:select={setExpenseCategory}  options={data.expenseCategories} n="name" v="expenseCategoryId" />
  <h2 style="color: var(--primary)">Income</h2>
  <GridOptions on:select={setIncomeCategory}  options={data.incomeCategories} n="name" v="incomeCategoryId" />
</Modal>
{/if}

<style>
  h2 {
    margin: 30px 0;
    font-weight: bold;
  }
  h2:first-child {
    margin-top: 0;
  }
</style>