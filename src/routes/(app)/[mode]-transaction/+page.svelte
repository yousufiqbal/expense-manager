<script>
  import { page } from "$app/stores";
  import Button from "$lib/components/Button.svelte";
  import Buttons from "$lib/components/Buttons.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import Title from "$lib/components/Title.svelte";

  $: current = $page.url.searchParams.get('tab') || 'expense'
  
  const maps = { 'expense': 'Expense', 'income': 'Income', 'transfer': 'Transfer', }
  const colors = { 'expense': 'warning', 'income': 'primary', 'transfer': 'secondary', }

  const chooseAccount = e => {
    e.target.blur()
    modal.accounts = true
  }

  const chooseFromAccount = e => {
    e.target.blur()
    modal.fromAccounts = true
  }

  const chooseToAccount = e => {
    e.target.blur()
    modal.toAccounts = true
  }

  const chooseCategory = e => {
    e.target.blur()
    if (current == 'expense') modal.expenseCategories = true
    if (current == 'income') modal.incomeCategories = true
  }

  const setAccount = () => {

  }

  const setCategory = () => {

  }

  const closeAllModals = () => {
    modal = {
      accounts: false, expenseCategories: false, incomeCategories: false, fromAccounts: false, toAccounts: false
    }
  }

  let modal = {
    accounts: false, expenseCategories: false, incomeCategories: false, fromAccounts: false, toAccounts: false
  }
</script>

<Title title="New {maps[current]}" back href="/" />
<Tabs />

<Form>

  <Field label="Date" type="date" />
  <Field label="Time" type="time" />

  {#if current != 'transfer'}
  <Field label="Account" on:focus={chooseAccount} />
  <Field label="Category" on:focus={chooseCategory} />
  {/if}

  {#if current == 'transfer'}
  <Field label="From" on:focus={chooseFromAccount} />
  <Field label="To" on:focus={chooseToAccount} />
  {/if}

  <Field label="Amount" --cols={2} inputmode="numeric" />
  <Field label="Title" --cols={2} />
  <Field label="Description" --cols={2} textarea />

</Form>

<Buttons>
  <Button name="Save {maps[current]}" type={colors[current]} icon="ri:save-line" />
  <Button name="Discard" type="transparent" icon="ri:close-line" href="/" />
</Buttons>

{#if modal.accounts}
<Modal on:close={closeAllModals} title="Accounts">
  
</Modal>
{/if}

{#if modal.expenseCategories}
<Modal on:close={closeAllModals} title="Expense Categories">
  
</Modal>
{/if}

{#if modal.incomeCategories}
<Modal on:close={closeAllModals} title="Income Categories">
  
</Modal>
{/if}

{#if modal.fromAccounts}
<Modal on:close={closeAllModals} title="From Account">
  
</Modal>
{/if}

{#if modal.toAccounts}
<Modal on:close={closeAllModals} title="To Account">
  
</Modal>
{/if}