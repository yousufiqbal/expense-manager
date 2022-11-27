<script>
  import Icon from '@iconify/svelte'

  export let keyword
</script>

<div class="search">
  <input bind:value={keyword} placeholder="Type here" type="text">
  <button on:click>
    <Icon icon="ri:search-line" />
  </button>
</div>

<style>
  .search {
    display: flex;
    gap: 8px;
    /* border: 1px dashed red; */
    margin-bottom: var(--mb, 20px);
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
    padding: 12px;
    display: flex;
    background-color: var(--primary);
    color: white;
    border: 1px solid var(--border);
  }
</style>