<div class="account-groups">

  <!-- {#each Array(3) as group} -->
  <div class="group">

    <!-- <div class="head">
      <div class="name">Home</div>
      <div class="balance">Rs. 169686</div>
    </div> -->

    <div class="accounts">
      {#each Array(4) as item}
      <div class="account">
        <div class="name">Papa</div>
        <div class="balance">Rs. 50000</div>
      </div>
      {/each}
    </div>

  </div>
  <!-- {/each} -->

</div>

<style>
  .account-groups {
    display: grid;
    gap: 20px;
  }
  .group {
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
  }
  .head {
    display: flex;
    justify-content: space-between;
    background-color: var(--light);
    padding: 12px 15px;
    border-radius: var(--radius);
    margin: 5px;
    margin-bottom: 0;
    /* color: white; */
  }
  .head .name {
    font-weight: bold;
  }
  .accounts {
    display: grid;
  }
  .account {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--border);
    padding: 12px 15px;
  }
  .account:last-child {
    border-bottom: none;
  }
</style>