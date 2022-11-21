<script>
  import Icon from '@iconify/svelte'
</script>

<div class="date-navigator">
  <button><Icon icon="ri:arrow-left-s-line" /></button>
  <span>Sep 2022</span>
  <button><Icon icon="ri:arrow-right-s-line" /></button>
</div>

<style>
  .date-navigator {
    flex: 1;
    display: flex;
    border-radius: var(--radius);
    overflow: hidden;
    border: 1px solid var(--border);
    padding: 5px;
    margin-bottom: var(--mb, 30px);
  }
  span {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border); */
    /* box-shadow: var(--shadow); */
  }
  button {
    background-color: var(--primary);
    color: white;
    font-size: 26px;
    padding: 5px;
    display: flex;
    border-radius: var(--radius);
    /* border: 1px solid var(--border); */
  }
</style>