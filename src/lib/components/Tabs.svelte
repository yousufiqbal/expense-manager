<script>
  import { page } from "$app/stores";
  export let transfer = true
</script>

<div class="tabs">
  <a class:active={$page.url.searchParams.get('tab') == 'income'} class="income" href="?tab=income">Income</a>
  <a class:active={$page.url.searchParams.get('tab') == 'expense'} class="expense" href="?tab=expense">Expense</a>
  {#if transfer}
  <a class:active={$page.url.searchParams.get('tab') == 'transfer'} class="transfer" href="?tab=transfer">Transfer</a>
  {/if}
</div>

<style>
  .tabs {
    display: flex;
    border: 1px solid var(--border);
    padding: 5px;
    gap: 6px;
    border-radius: var(--radius);
    margin-bottom: var(--mb, 30px);
  }
  a {
    display: flex;
    justify-content: center;
    flex: 1;
    padding: 10px 0;
    background-color: rgb(240, 240, 240);
    border-radius: var(--radius);
  }
  .active {
    color: white;
  }
  .income.active {
    background-color: var(--primary);
  }
  .expense.active {
    background-color: var(--red);
  }
  .transfer.active {
    background-color: var(--secondary);
  }
</style>