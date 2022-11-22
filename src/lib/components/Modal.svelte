<script>
  // import { outclickHandler } from "$lib/others/utils";
  import Icon from "@iconify/svelte";
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";

  const dispatch = createEventDispatcher()

  const dispatchClose = () => {
    dispatch('close')
  }

  export let title
  export let type = 'secondary'
</script>

{#if title}
<div class="wrapper">

  <div transition:fly={{y: 30, duration: 150}} class="modal">
    
    <div class="head {type}">
      <h2>{title}</h2>
      <button on:click={dispatchClose}  class="close">
        <Icon icon="ri:close-line" />
      </button>
    </div>

    <div class="body">
      <slot></slot>
    </div>

  </div>

</div>
{/if}

<style>
  .wrapper {
    display: grid;
    align-content: end;
    /* border: 2px dashed red; */
    position: fixed;
    top: 0; bottom: 0;
    left: 0; right: 0;
    /* background-color: rgb(255, 255, 255, 0.3); */
    z-index: 2;
  }
  .modal {
    background-color: #fff;
    box-shadow: 0 -4px 5px 0 rgb(0, 0, 0, 0.3);
    padding-bottom: 20px;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--primary);
    color: white;
    padding: 0 10px 0 20px;
  }
  h2 {
    padding: 13px 0;
  }
  button {
    padding: 8px;
    display: flex;
    font-size: 24px;
    /* border: 1px dashed white; */
  }
  .body {
    padding: 20px;
  }
  .primary {
    background-color: var(--primary);
  }
  .secondary {
    background-color: var(--secondary);
  }
  .warning {
    background-color: var(--red);
  }
</style>