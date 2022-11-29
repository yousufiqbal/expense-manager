<script>
  import Icon from "@iconify/svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher()

  export let filters, form
</script>

<div class="wrapper">

  <button style="color: var(--primary)" on:click={()=>dispatch('toggle')}>
    <span>{filters ? 'Hide' : 'Show'} Filters</span>
    <i><Icon icon="{filters ? 'ri:arrow-up-s-line' : 'ri:arrow-down-s-line'}" /></i>
  </button>

  {#if filters && form}
  <button on:click={()=>dispatch('clear')}>
    <i><Icon icon="ri:close-line" /></i>
    <span>Clear Filters</span>
  </button>
  {/if}

</div>

<style>
  .wrapper {
    display: flex;
    justify-content: space-between;
    /* border: 1px dashed red; */
    margin-bottom: 25px;
  }
  button {
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
</style>