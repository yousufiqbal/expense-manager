<div class="accounts">

  {#each Array(3) as account}
  <a href="/accounts/account-12" class="account">
    <div class="name">Papa</div>
    <div class="balance">Rs. 45000</div>
  </a>
  {/each}

</div>

<style>
  .accounts {
    display: grid;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
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
  .balance {
    color: var(--red);
  }
</style>