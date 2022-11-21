<script>
  import { goto } from '$app/navigation';
  import { title as t } from '$lib/others/stores'
  import Icon from '@iconify/svelte';
  import { fly } from 'svelte/transition';

  export let title, icon
  export let back = false
  export let href = null

  const goBack = () => {
    if (href) {
      goto(href)
    } else {
      history.back()
    }
  }

  $t = title
</script>

<div class="title">

  {#if back && !icon}
  <button on:click={goBack}>
    <Icon icon="ri:arrow-left-line" />
  </button>
  {/if}

  {#if icon && !back}
  <i><Icon {icon} /></i>
  {/if}

  {#key title}
  <h1 in:fly={{x: -20, duration: 150}}>{title}</h1>
  {/key}

</div>

<style>
  .title {
    display: flex;
    gap: 15px;
    margin-bottom: var(--mb, 30px);
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
    /* color: var(--primary); */
  }
</style>