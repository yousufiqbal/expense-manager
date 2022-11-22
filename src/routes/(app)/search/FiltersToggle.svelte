<script>
  import Icon from "@iconify/svelte";

  export let filters
</script>

<button on:click={()=>filters=!filters}>
  <span>
    {filters ? 'Hide' : 'Show'} Filters
  </span>
  <i><Icon icon="{filters ? 'ri:arrow-up-s-line' : 'ri:arrow-down-s-line'}" /></i>
</button>

<style>
  button {
    display: flex;
    gap: 10px;
    align-items: center;
    color: var(--primary);
    margin-bottom: 20px;
  }
  i {
    font-size: 20px;
  }
</style>