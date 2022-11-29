<script>
  import { page } from '$app/stores';
  import dayjs from 'dayjs';
    import Nothing from './Nothing.svelte';

  /** @type {import('./$types').PageServerData} */
  export let data
</script>

{#if data.transactionGroups?.length != 0}
<div class="transaction-groups">
  
  {#each data.transactionGroups as group}
  <div class="group">
    
    <a href="/add-transaction?tab=expense&date={dayjs(group.date).format('YYYY-MM-DD')}" class="head">
      <div class="dated">
        <span>{dayjs(group.date).format('MMM DD, YYYY')}</span>
        <span class="day">{dayjs(group.date).format('dddd')}</span>
      </div>
      <!-- <div class="day">Monday</div> -->
      <div class="total-income">{$page.data.locals.currency} {group.totalIncome}</div>
      <div class="total-expense">{$page.data.locals.currency} {group.totalExpense}</div>
    </a>
    
    {#each group.transactions as transaction}
    <a href="/edit-transaction?{transaction.type}-id={transaction.id}&tab={transaction.type}" class="transactions">
      <div class="transaction">
        <div class="detail">
          <div class="title">{transaction.title}</div>
          {#if transaction.type != 'transfer'}
          <div class="meta">{transaction.accountName} ({transaction.categoryName})</div>
          {:else}
          <div class="meta">{transaction.fromAccountName} &rarr; {transaction.toAccountName}</div>
          {/if}
        </div>
        <div class="{transaction.type} amount">{$page.data.locals.currency} {transaction.amount}</div>
      </div>
    </a>
    {/each}
    
  </div>
  {/each}
  
</div>
{:else}

<Nothing>
  No transactions
</Nothing>
{/if}

<style>
  .transaction-groups {
    display: grid;
    gap: 25px;
    /* border: 1px dashed red; */
  }
  .group {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    overflow: hidden;
  }
  .head {
    /* margin: 5px; */
    margin-bottom: 0;
    padding: 12px 15px;
    display: flex;
    gap: 20px;
    border-bottom: 1px solid var(--border);
    background-color: rgb(247, 247, 247);
    /* border-radius: var(--radius); */
    /* border: 1px solid var(--border); */
    align-items: center;
  }
  .dated {
    display: grid;
    /* gap: 10px; */
    align-items: center;
    flex: 1;
    font-size: 14px;
  }
  .title {
    margin-bottom: 2px;
  }
  .day {
    color: gray;
    font-size: 12px;
  }
  .transaction {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border);
  }
  .meta {
    font-size: 14px;
    color: gray;
  }
  .total-income {
    color: var(--primary);
  }
  .total-expense {
    color: var(--red);
  }
  .expense {
    color: var(--red);
  }
  .income {
    color: var(--primary);
  }
</style>