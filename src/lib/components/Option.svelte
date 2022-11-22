<script>
  import Icon from "@iconify/svelte";

  export let name
  export let href = null
  export let icon
  export let warning = false
</script>

{#if !href}
<button class:warning class="option" on:click>
  <span>{name}</span>
  <i>
    <Icon {icon} />
  </i>
</button>

{:else}
<a class:warning class="option" {href}>
  <span>{name}</span>
  <i>
    <Icon {icon} />
  </i>
</a>
{/if}

<style>
  .option {
    z-index: 5;
    /* border: 1px dashed orange; */
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 12px 15px;
    border-bottom: 1px solid var(--border);
  }
  i {
    font-size: 18px;
    color: var(--primary);
  }
  .option:last-child {
    border-bottom: none;
  }
  .warning, .warning i {
    color: red;
  }
  span {
    font-size: 15px;
  }
</style>