<script>
    import { page } from "$app/stores";


  /** @type {{ title: string, amount: number, color: string }[]}*/
  export let summary = []
</script>

<div class="summary">

  {#each summary as item}
  <div class="part income">
    <div class="title">{item.title}</div>
    <div class="amount {item.color}">{$page.data.locals.currency} {item.amount}</div>
  </div>
  {/each}

</div>

<style>
  .summary {
    padding: 10px 0;
    display: flex;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    margin-bottom: var(--mb, 30px);
    font-size: 14px;
  }
  .part {
    /* padding:  0; */
    flex: 1;
    display: grid;
    justify-items: center;
    gap: 3px;
    border-right: 1px solid var(--border);
    /* border: 1px dashed red; */
  }
  .part:last-child {
    border-right: none;
  }
  .red {
    color: var(--primary);
  }
  .blue {
    color: var(--red);
  }
  .black {
    color: black;
  }
</style>