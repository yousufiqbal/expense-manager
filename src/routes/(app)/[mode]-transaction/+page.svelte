<script>
  import { goto } from "$app/navigation";
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
  import { extractYupErrors, generateExpenseSchema, generateIncomeSchema, generateTransferSchema } from "$lib/others/schema";
  import { addToast } from "$lib/others/toasts";
  import { capitalize, isEmpty, post, put } from "$lib/others/utils";
  import dayjs from "dayjs";

  /** @type {import('./$types').PageServerData} */
  export let data

  let modal = {
    accounts: false, expenseCategories: false, incomeCategories: false, fromAccounts: false, toAccounts: false
  }

  let transaction = data.transaction || {
    date: dayjs().format('YYYY-MM-DD'), time: dayjs().format('HH:mm'), accountId: '', expenseCategoryId: '', incomeCategoryId: '', fromAccountId: '', toAccountId: '', amount: '', title: '', description: ''
  }

  let touched = false, errors = {}


  // Mapping..
  const maps = { 'expense': 'Expense', 'income': 'Income', 'transfer': 'Transfer', }
  const colors = { 'expense': 'warning', 'income': 'primary', 'transfer': 'secondary', }


  const validate = async () => {
    try {
      await schema.validate(transaction, { abortEarly: false })
      errors = {}
    } catch (error) {
      errors = extractYupErrors(error)
    }
  }

  const closeAllModals = () => {
    modal = {
      accounts: false, expenseCategories: false, incomeCategories: false, fromAccounts: false, toAccounts: false
    }
  }

  const addTransaction = async () => {
    const response = await post('/add-transaction' + $page.url.search, transaction)
    addToast({ message: (await response.json()).message, type: response.ok ? 'success' : 'error' })
    goto('/')
  }

  const editTransaction = async () => {
    const response = await put('/edit-transaction' + $page.url.search, transaction)
    addToast({ message: (await response.json()).message, type: response.ok ? 'success' : 'error' })
    goto('/')
  }

  const submit = async () => {
    if (isEmpty(errors)) {
      if ($page.params.mode == 'add') await addTransaction()
      if ($page.params.mode == 'edit') await editTransaction()
    } else {
      touched = true
    }
  }

  // SETS AND MODALS..
  // ..............
  const openAccountModal = () => {
    modal.accounts = true
  }

  const openFromAccountModal = () => {
    modal.fromAccounts = true
  }

  const openToAccountModal = () => {
    modal.toAccounts = true
  }

  const openCategoryModal = () => {
    if (current == 'expense') modal.expenseCategories = true
    if (current == 'income') modal.incomeCategories = true
  }

  const setAccount = e => {
    transaction.accountId = +e.detail.result
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

  const setFromAccount = e => {
    transaction.fromAccountId = +e.detail.result
    closeAllModals()
  }

  const setToAccount = e => {
    transaction.toAccountId = +e.detail.result
    closeAllModals()
  }

  // Computed..

  $: current = $page.url.searchParams.get('tab') || 'expense'
  
  let schema
  $: if (current == 'expense') schema = generateExpenseSchema(data.accounts.map(a => String(a.accountId)), data.expenseCategories.map(a => String(a.expenseCategoryId)));
  $: if (current == 'income') schema = generateIncomeSchema(data.accounts.map(a => String(a.accountId)), data.incomeCategories.map(a => String(a.incomeCategoryId)))
  $: if (current == 'transfer') schema = generateTransferSchema(data.accounts.map(a => String(a.accountId)))

  $: transaction && validate()
  $: current && validate()
</script>

<Title title="{capitalize($page.params.mode)} {maps[current]}" back href="/" />
<Tabs />

<Form>

  <Field {touched} error={errors.date} bind:value={transaction.date} label="Date" type="date" />
  <Field {touched} error={errors.time} bind:value={transaction.time} label="Time" type="time" />

  {#if current != 'transfer'}
  <Select on:click={openAccountModal} n="name" v="accountId" options={data.accounts} {touched} error={errors.accountId} value={transaction.accountId} label="Account" />
  {#if current == 'expense'}
  <Select on:click={openCategoryModal} n="name" v="expenseCategoryId" options={data.expenseCategories} {touched} error={errors.expenseCategoryId} value={transaction.expenseCategoryId} label="Exp. Category" />
  {/if}
  {#if current == 'income'}
  <Select on:click={openCategoryModal} n="name" v="incomeCategoryId" options={data.incomeCategories} {touched} error={errors.incomeCategoryId} value={transaction.incomeCategoryId} label="Inc. Category" />
  {/if}
  {/if}
  
  {#if current == 'transfer'}
  <Select on:click={openFromAccountModal} n="name" v="accountId" options={data.accounts} {touched} error={errors.fromAccountId} value={transaction.fromAccountId} label="From Account" />
  <Select on:click={openToAccountModal} n="name" v="accountId" options={data.accounts} {touched} error={errors.toAccountId} value={transaction.toAccountId} label="To Account" />
  {/if}

  <Field {touched} error={errors.amount} bind:value={transaction.amount} label="Amount (Rs.)" --cols={2} inputmode="numeric" />
  <Field {touched} error={errors.title} bind:value={transaction.title} label="Title" --cols={2} />
  <Field {touched} error={errors.description} bind:value={transaction.description} label="Description" --cols={2} textarea />

</Form>

<Buttons>
  <Button on:click={submit} name="Save {maps[current]}" type={colors[current]} icon="ri:save-line" />
  <Button name="Discard" type="transparent" icon="ri:close-line" href="/" />
</Buttons>


<!-- Modals... -->

{#if modal.accounts}
<Modal on:close={closeAllModals} title="Accounts">
  <GridOptions on:select={setAccount} options={data.accounts} n="name" v="accountId" />
</Modal>
{/if}

{#if modal.expenseCategories}
<Modal on:close={closeAllModals} title="Expense Categories">
  <GridOptions on:select={setExpenseCategory} options={data.expenseCategories} n="name" v="expenseCategoryId" />
</Modal>
{/if}

{#if modal.incomeCategories}
<Modal on:close={closeAllModals} title="Income Categories">
  <GridOptions on:select={setIncomeCategory} options={data.incomeCategories} n="name" v="incomeCategoryId" />
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