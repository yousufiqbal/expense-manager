<div class="categories">

  {#each Array(5) as category}
  <div class="category">
    <div class="percentage">15%</div>
    <div class="name">Grocery</div>
    <div class="amount">Rs. 54,250</div>
  </div>
  {/each}

</div>

<style>
  .categories {
    display: grid;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    margin-bottom: var(--mb, 30px);
  }
  .category {
    display: flex;
    gap: 15px;
    padding: 15px;
    border-bottom: 1px solid var(--border);
    align-items: center;
  }
  .percentage {
    padding: 2px 4px;
    font-size: 14px;
    border-radius: var(--radius);
    background-color: var(--primary);
    color: white;
  }
  .category:last-child {
    border-bottom: none;
  }
  .name {
    flex: 1;
  }
</style>