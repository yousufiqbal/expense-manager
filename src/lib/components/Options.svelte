<script>
  import { outclickHandler } from "$lib/others/utils";
  import Icon from "@iconify/svelte";

  let el

  const show = () => {
    el.style.display = 'flex'
  }
  
  const hide = () => {
    el.style.display = 'none'
  }
</script>

<div use:outclickHandler on:keydown on:outclick={hide} on:click={show} class="options">

  <i><Icon icon="ri:more-2-fill" /></i>

  <div bind:this={el} on:keydown on:click={hide} class="actions">
    <slot></slot>
  </div>

</div>

<style>
  .options {
    display: flex;
    position: relative;
    background-color: #fff;
    z-index: 1;
  }
  .options > i {
    align-items: center;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    color: var(--primary);
    padding: 5px;
    font-size: 20px;
  }
  .options .actions {
    z-index: 1;
    display: none;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    flex-direction: column;
    background-color: #fff;
    position: absolute;
    top: 0; right: 0;
    border: 1px solid var(--border);
    /* border: 1px dashed green; */
    
  }
  .actions > :last-child {
    border-bottom: none;
  }
</style>