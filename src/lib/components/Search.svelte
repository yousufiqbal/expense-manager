<script>
  import Icon from '@iconify/svelte'
</script>

<div class="search">
  <input placeholder="Type here" type="text">
  <button>
    <Icon icon="ri:search-line" />
  </button>
</div>

<style>
  .search {
    display: flex;
    gap: 8px;
    /* border: 1px dashed red; */
  }
  input {
    flex: 1;
    border: 1px solid var(--border);
    padding: var(--field);
    border-radius: var(--radius);
  }
  button {
    border-radius: var(--radius);
    font-size: 20px;
    padding: 10px;
    display: flex;
    background-color: var(--primary);
    color: white;
    border: 1px solid var(--border);
  }
</style>