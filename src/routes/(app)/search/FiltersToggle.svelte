<script>
  import Icon from "@iconify/svelte";

  export let filters
</script>

<div class="wrapper">
  <button on:click={()=>filters=!filters}>
    <span>
      {filters ? 'Hide' : 'Show'} Filters
    </span>
    <i><Icon icon="{filters ? 'ri:arrow-up-s-line' : 'ri:arrow-down-s-line'}" /></i>
  </button>
</div>

<style>
  .wrapper {
    display: flex;
    justify-content: center;
    /* border: 1px dashed red; */
    margin-bottom: 25px;
  }
  button {
    display: flex;
    gap: 10px;
    align-items: center;
    color: var(--primary);
  }
  i {
    font-size: 20px;
  }
</style>