<script>
    import dayjs from 'dayjs';


  // import Icon from "@iconify/svelte";

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
      </div>
      <!-- <div class="day">Monday</div> -->
      <div class="total-income">Rs. 0</div>
      <div class="total-expense">Rs. 1000</div>
    </a>
    
    {#each group.transactions as transaction}
    <a href="/edit-transaction?expense-id=46&tab=expense" class="transactions">
      <div class="transaction">
        <div class="detail">
          <div class="title">{transaction.title}</div>
          <div class="meta">Account: {transaction.accountId} (in transport)</div>
        </div>
        <div class="amount">Rs. {transaction.amount}</div>
      </div>
    </a>
    {/each}
    
  </div>
  {/each}
  
</div>
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
    margin: 5px;
    margin-bottom: 0;
    padding: 12px 15px;
    display: flex;
    gap: 30px;
    /* border-bottom: 1px solid var(--border); */
    background-color: var(--light);
    border-radius: var(--radius);
    align-items: center;
  }
  .dated {
    display: flex;
    gap: 10px;
    align-items: center;
    flex: 1;
  }
  /* .day {
    font-size: 14px;
  } */
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
  .amount {
    color: var(--red);
  }
</style>