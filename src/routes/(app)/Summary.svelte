<div class="summary">
  <div class="part income">
    <div class="title">Income</div>
    <div class="amount">279,950</div>
  </div>
  <div class="part expense">
    <div class="title">Expense</div>
    <div class="amount">279,950</div>
  </div>
  <div class="part total">
    <div class="title">Total</div>
    <div class="amount">279,950</div>
  </div>
</div>

<style>
  .summary {
    padding: 10px 0;
    display: flex;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    margin-bottom: var(--mb, 30px);
  }
  .part {
    /* padding:  0; */
    flex: 1;
    display: grid;
    justify-items: center;
    border-right: 1px solid var(--border);
    /* border: 1px dashed red; */
  }
  .part:last-child {
    border-right: none;
  }
  .title {
    font-size: 14px;
  }
  .income .amount {
    color: var(--primary);
  }
  .expense .amount {
    color: var(--red);
  }
</style>