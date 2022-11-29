<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Equal from "$lib/components/Equal.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import GridOptions from "$lib/components/GridOptions.svelte";
  import IconButton from "$lib/components/IconButton.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import Select from "$lib/components/Select.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import Title from "$lib/components/Title.svelte";
  import { extractYupErrors, generateExpenseSchema, generateIncomeSchema, generateTransferSchema } from "$lib/others/schema";
  import { addToast } from "$lib/others/toasts";
  import { capitalize, del, isEmpty, post, put } from "$lib/others/utils";
  import dayjs from "dayjs";
  import { onMount } from "svelte";
  
  onMount(() => {
    autoFlow()
  })

  let els = {
    amount: '', title: ''
  }

  const autoFlow = () => {
    if ($page.params.mode == 'add' && current == 'expense') openAccountModal()
    if ($page.params.mode == 'add' && current == 'income') openAccountModal()
    if ($page.params.mode == 'add' && current == 'transfer') openFromAccountModal()
  }

  /** @type {import('./$types').PageServerData} */
  export let data

  let modal = {
    accounts: false, expenseCategories: false, incomeCategories: false, fromAccounts: false, toAccounts: false
  }

  let transaction = data.transaction || {
    // default from params if given..
    date: $page.url.searchParams.get('date') || dayjs().format('YYYY-MM-DD'),
    time: dayjs().format('HH:mm:ss'),
    // default from params if given..
    accountId: +$page.url.searchParams.get('account-id') || '',
    expenseCategoryId: '', incomeCategoryId: '', fromAccountId: '', toAccountId: '', amount: '', title: '', description: ''
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
    const response = await post($page.url.pathname + $page.url.search, transaction)
    addToast({ message: (await response.json()).message, type: response.ok ? 'success' : 'error' })
    back()
  }

  const editTransaction = async () => {
    const response = await put($page.url.pathname + $page.url.search, transaction)
    addToast({ message: (await response.json()).message, type: response.ok ? 'success' : 'error' })
    back()
  }

  const deleteTransaction = async () => {
    if (!confirm('Are you sure to delete this?')) return
    const response = await del($page.url.pathname + $page.url.search, transaction)
    addToast({ message: (await response.json()).message, type: response.ok ? 'success' : 'error' })
    back()
  }

  const back = () => {
    if ($page.url.searchParams.get('next') == 'search') {
      history.back()
    } else {
      goto('/')
    }
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
    setTimeout(() => {
      if ($page.params.mode != 'add') return
      if (current == 'expense' & !transaction.expenseCategoryId) {
        openCategoryModal()
      }
      if (current == 'income' & !transaction.incomeCategoryId) {
        openCategoryModal()
      }
    }, 0);
  }
  
  const setExpenseCategory = e => {
    transaction.expenseCategoryId = +e.detail.result
    closeAllModals()
    if ($page.params.mode == 'add' && !transaction.amount) els.amount.focus() 
  }

  const setIncomeCategory = e => {
    transaction.incomeCategoryId = +e.detail.result
    closeAllModals()
    if ($page.params.mode == 'add' && !transaction.amount) els.amount.focus() 
  }
  
  const setFromAccount = e => {
    transaction.fromAccountId = +e.detail.result
    closeAllModals()
    if ($page.params.mode == 'add' && !transaction.toAccountId) {
      openToAccountModal()
    }
  }

  const setToAccount = e => {
    transaction.toAccountId = +e.detail.result
    closeAllModals()
    if ($page.params.mode == 'add' && !transaction.amount) els.amount.focus() 
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

<Equal>
  <Title --mb="0" title="{capitalize($page.params.mode)} {maps[current]}" back href="/" />
  {#if $page.params.mode == 'edit'}
  <IconButton on:click={deleteTransaction} icon="ri:delete-bin-line" />
  {/if}
</Equal>

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

  <Field {touched} bind:el={els.amount} error={errors.amount} bind:value={transaction.amount} label="Amount ({$page.data.locals.currency})" --cols={2} inputmode="numeric" />
  <Field {touched} bind:el={els.title} error={errors.title} bind:value={transaction.title} label="Title" --cols={2} />
  <Field {touched} error={errors.description} bind:value={transaction.description} label="Description" --cols={2} textarea />

</Form>

<Buttons>
  <Button on:click={submit} name="Save {maps[current]}" type={colors[current]} icon="ri:save-line" />
  <Button name="Discard" type="transparent" icon="ri:close-line" on:click={back} />
</Buttons>


<!-- Modals... -->

{#if modal.accounts}
<Modal on:close={closeAllModals} title="Choose Account">
  <GridOptions on:select={setAccount} options={data.accounts} n="name" v="accountId" />
</Modal>
{/if}

{#if modal.expenseCategories}
<Modal on:close={closeAllModals} title="Choose Expense Category">
  <GridOptions on:select={setExpenseCategory} options={data.expenseCategories} n="name" v="expenseCategoryId" />
</Modal>
{/if}

{#if modal.incomeCategories}
<Modal on:close={closeAllModals} title="Choose Income Category">
  <GridOptions on:select={setIncomeCategory} options={data.incomeCategories} n="name" v="incomeCategoryId" />
</Modal>
{/if}

{#if modal.fromAccounts}
<Modal on:close={closeAllModals} title="Choose From Account">
  <GridOptions on:select={setFromAccount} options={data.accounts} n="name" v="accountId" />
</Modal>
{/if}

{#if modal.toAccounts}
<Modal on:close={closeAllModals} title="Choose To Account">
  <GridOptions on:select={setToAccount} options={data.accounts} n="name" v="accountId" />
</Modal>
{/if}