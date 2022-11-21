<script>
  import Icon from "@iconify/svelte";

  export let name, href = null
  export let icon
  export let type = 'primary'
</script>

{#if !href}
<button class="button {type}">
  <i><Icon {icon} /></i>
  <span>{name}</span>
</button>

{:else}
<a {href} class="button {type}">
  <i><Icon {icon} /></i>
  <span>{name}</span>
</a>
{/if}

<style>
  .button {
    padding: 10px 20px 10px 15px;
    border-radius: var(--radius);
    display: flex;
    align-items: center;
    gap: 15px;
    box-shadow: var(--shadow);
  }
  .primary {
    background-color: var(--primary);
    color: white;
  }
  .secondary {
    background-color: var(--secondary);
    color: white;
  }
  .warning {
    background-color: var(--red);
    color: white;
  }
  .transparent {
    background-color: white;
    border: 1px solid var(--border);
  }
  /* .ghost {
    flex-flow: row-reverse;
    padding: 0;
    box-shadow: none;
    color: var(--primary);
  } */
  i {
    font-size: 20px;
  }
</style>