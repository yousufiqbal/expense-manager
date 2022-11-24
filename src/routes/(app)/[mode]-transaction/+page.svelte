<script>
  import { page } from "$app/stores";
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import GridOptions from "$lib/components/GridOptions.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import Select from "$lib/components/Select.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import Title from "$lib/components/Title.svelte";
  import dayjs from "dayjs";

  $: current = $page.url.searchParams.get('tab') || 'expense'

  /** @type {import('./$types').PageServerData} */
  export let data

  console.log(data)

  let transaction = data.transaction || {
    date: dayjs().format('YYYY-MM-DD'), time: dayjs().format('HH:mm'), accountId: '', expenseCategoryId: '', incomeCategoryId: '', fromAccountId: '', toAccountId: '', amount: '', title: '', description: ''
  }

  let touched = false, errors = {}

  // others..
  const maps = { 'expense': 'Expense', 'income': 'Income', 'transfer': 'Transfer', }
  const colors = { 'expense': 'warning', 'income': 'primary', 'transfer': 'secondary', }
  
  const validateExpense = async () => {}
  const validateIncome = async () => {}
  const validateTransfer = async () => {}

  const chooseAccount = () => {
    modal.accounts = true
  }

  const chooseFromAccount = () => {
    modal.fromAccounts = true
  }

  const chooseToAccount = () => {
    modal.toAccounts = true
  }

  const chooseCategory = () => {
    if (current == 'expense') modal.expenseCategories = true
    if (current == 'income') modal.incomeCategories = true
  }

  const setAccount = e => {
    transaction.accountId = +e.detail.result
    closeAllModals()
  }
  
  const setCategory = e => {
    transaction.categoryId = +e.detail.result
    closeAllModals()
  }

  const setExpenseCategory = e => {
    transaction.expenseCategoryId = +e.detail.result
    closeAllModals()
  }

  const setIncomeCategory = e => {
    transaction.incomeCategoryId = +e.detail.result
    closeAllModals()
  }
  
  const closeAllModals = () => {
    modal = {
      accounts: false, expenseCategories: false, incomeCategories: false, fromAccounts: false, toAccounts: false
    }
  }

  const setFromAccount = e => {
    transaction.fromAccountId = +e.detail.result
    closeAllModals()
  }
  const setToAccount = e => {
    transaction.toAccountId = +e.detail.result
    closeAllModals()
  }

  let modal = {
    accounts: false, expenseCategories: false, incomeCategories: false, fromAccounts: false, toAccounts: false
  }

  $: if (current == 'expense') validateExpense()
  $: if (current == 'income') validateIncome()
  $: if (current == 'transfer') validateTransfer()

  $: console.log(transaction)
</script>

<Title title="New {maps[current]}" back href="/" />
<Tabs />

<Form>

  <Field {touched} error={errors.date} bind:value={transaction.date} label="Date" type="date" />
  <Field {touched} error={errors.time} bind:value={transaction.time} label="Time" type="time" />

  {#if current != 'transfer'}
  <Select on:click={chooseAccount} n="name" v="accountId" options={data.accounts} {touched} error={errors.accountId} value={transaction.accountId} label="Account" />
  {#if current == 'expense'}
  <Select on:click={chooseCategory} n="name" v="categoryId" options={data.expenseCategories} {touched} error={errors.expenseCategoryId} value={transaction.expenseCategoryId} label="Exp. Category" />
  {/if}
  {#if current == 'income'}
  <Select on:click={chooseCategory} n="name" v="categoryId" options={data.incomeCategories} {touched} error={errors.incomeCategoryId} value={transaction.incomeCategoryId} label="Inc. Category" />
  {/if}
  {/if}
  
  {#if current == 'transfer'}
  <Select on:click={chooseFromAccount} n="name" v="accountId" options={data.accounts} {touched} error={errors.fromAccountId} value={transaction.fromAccountId} label="From Account" />
  <Select on:click={chooseToAccount} n="name" v="accountId" options={data.accounts} {touched} error={errors.toAccountId} value={transaction.toAccountId} label="To Account" />
  {/if}

  <Field {touched} error={errors.amount} bind:value={transaction.amount} label="Amount (Rs.)" --cols={2} inputmode="numeric" />
  <Field {touched} error={errors.title} bind:value={transaction.title} label="Title" --cols={2} />
  <Field {touched} error={errors.description} bind:value={transaction.description} label="Description" --cols={2} textarea />

</Form>

<Buttons>
  <Button name="Save {maps[current]}" type={colors[current]} icon="ri:save-line" />
  <Button name="Discard" type="transparent" icon="ri:close-line" href="/" />
</Buttons>

{#if modal.accounts}
<Modal on:close={closeAllModals} title="Accounts">
  <GridOptions on:select={setAccount} options={data.accounts} n="name" v="accountId" />
</Modal>
{/if}

{#if modal.expenseCategories}
<Modal on:close={closeAllModals} title="Expense Categories">
  <GridOptions on:select={setExpenseCategory} options={data.expenseCategories} n="name" v="categoryId" />
</Modal>
{/if}

{#if modal.incomeCategories}
<Modal on:close={closeAllModals} title="Income Categories">
  <GridOptions on:select={setIncomeCategory} options={data.incomeCategories} n="name" v="categoryId" />
</Modal>
{/if}

{#if modal.fromAccounts}
<Modal on:close={closeAllModals} title="From Account">
  <GridOptions on:select={setFromAccount} options={data.accounts} n="name" v="accountId" />
</Modal>
{/if}

{#if modal.toAccounts}
<Modal on:close={closeAllModals} title="To Account">
  <GridOptions on:select={setToAccount} options={data.accounts} n="name" v="accountId" />
  
</Modal>
{/if}