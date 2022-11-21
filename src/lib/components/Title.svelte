<script>
  import { title as t } from '$lib/others/stores'
  import Icon from '@iconify/svelte';

  export let title, icon
  export let back = false
  $t = title
</script>

<div class="title">

  {#if back && !icon}
  <button on:click={()=>history.back()}>
    <Icon icon="ri:arrow-left-line" />
  </button>
  {/if}

  {#if icon && !back}
  <i><Icon {icon} /></i>
  {/if}

  <h1>{title}</h1>

</div>

<style>
  .title {
    display: flex;
    gap: 15px;
    margin-bottom: var(--mb, 20px);
  }
  h1 {
    font-size: 24px;
    font-weight: bold;
  }
  i {
    padding: 3px;
    font-size: 24px;
  }
  button {
    /* border: 1px dashed red; */
    display: flex;
    align-items: center;
    /* padding: 3px; */
    font-size: 28px;
    color: var(--primary);
  }
</style>