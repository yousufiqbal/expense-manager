<script>
  import Icon from "@iconify/svelte";
</script>

<div class="transaction-groups">

  <!-- {#each groups as group} -->
  {#each Array(3) as group}
  <div class="group">

    <div class="head">
      <div class="dated">
        <!-- <i><Icon icon="ri:calendar-line" /></i> -->
        <span>Nov 22, 2022</span>
      </div>
      <!-- <div class="day">Monday</div> -->
      <div class="total-income">Rs. 0</div>
      <div class="total-expense">Rs. 1000</div>
    </div>

    <!-- {#each group.transactions as transaction} -->
    {#each Array(3) as transaction}
    <div class="transactions">
      <div class="transaction">
        <div class="detail">
          <div class="title">Bykea Office</div>
          <div class="meta">Papa (in transport)</div>
        </div>
        <div class="amount">Rs. 600</div>
      </div>
    </div>
    {/each}

  </div>
  {/each}

</div>

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