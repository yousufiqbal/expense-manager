<script>
  export let transactions = [1, 2, 3]
</script>

{#if transactions.length != 0}
<div class="transactions">

  {#each transactions as transaction}
  <div class="transaction">
    <div class="dated">Nov 11<br>2022</div>
    <div class="detail">
      <div class="title">Bykea Office</div>
      <div class="meta">Papa (in transport)</div>
    </div>
    <div class="amount">Rs. 600</div>
  </div>
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
    gap: 15px;
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