<script>
    import { page } from '$app/stores';
    import Nothing from '$lib/components/Nothing.svelte';


  /** @type {import('./$types').PageServerData} */
  export let data
</script>

{#if data?.accounts.length != 0}
<div class="accounts">
  
  {#each data.accounts as account}
  <a href="/accounts/account-{account.accountId}" class="account">
    <div class="name">{account.name}</div>
    <div class:expense={account.balance < 0} class:income={account.balance > 0} class="balance">{$page.data.locals.currency} {account.balance}</div>
  </a>
  {/each}
  
</div>
{:else}

<Nothing>
  No accounts
</Nothing>
{/if}

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
    padding: 13px 15px;
  }
  .account:last-child {
    border-bottom: none;
  }
  .expense {
    color: var(--red);
  }
  .income {
    color: var(--primary);
  }
</style>