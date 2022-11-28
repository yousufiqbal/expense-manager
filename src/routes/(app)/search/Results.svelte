<script>
    import { page } from '$app/stores';
    import dayjs from 'dayjs';


  /** @type {import('./$types').PageServerData} */
  export let data

</script>

{#if data.results?.length != 0}
<div class="transactions">

  {#each data.results as result}
  <a href="/edit-transaction?{result.type}-id={result.id}&tab={result.type}&next=search" class="transaction">
    <div class="dated">{dayjs(result.date).format('MMM DD')}<br>{dayjs(result.date).format('YYYY')}</div>
    <div class="detail">
      <div class="title">{result.title}</div>
      {#if result.type != 'transfer'}
      <div class="meta">{result.accountName} - {result.categoryName}</div>
      {:else}
      <div class="meta">{result.fromAccountName} - {result.toAccountName}</div>
      {/if}
    </div>
    <div class="amount">{$page.data.locals.currency} {result.amount}</div>
  </a>
  {/each}

</div>
{/if}

<style>
  .transactions {
    display: grid;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    background-color: #fff;
    /* gap: 10px; */
  }
  .transaction {
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 20px;
    /* border-radius: var(--radius); */
    border-bottom: 1px solid var(--border);
  }
  .transaction:last-child {
    border-bottom: none;
  }
  .detail {
    flex: 1;
  }
  .dated {
    color: gray;
    /* border: 1px dashed red; */
    font-size: 14px;
  }
  .meta {
    font-size: 14px;
    color: gray;
  }
  .amount {
    color: var(--red);
  }
</style>