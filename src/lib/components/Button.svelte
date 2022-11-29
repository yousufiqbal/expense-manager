<script>
  import Icon from "@iconify/svelte";

  export let name, href = null
  export let icon
  export let type = 'primary'
  export let reverse = false
</script>

{#if !href}
<button on:click class:reverse class="button {type}">
  {#if icon}
  <i><Icon {icon} /></i>
  {/if}
  <span>{name}</span>
</button>

{:else}
<a {href} class:reverse class="button {type}">
  {#if icon}
  <i><Icon {icon} /></i>
  {/if}
  <span>{name}</span>
</a>
{/if}

<style>
  .button {
    padding: 10px 20px 10px 15px;
    border-radius: var(--radius);
    display: inline-flex;
    align-items: center;
    gap: 15px;
    box-shadow: var(--shadow);
  }
  .reverse {
    flex-flow: row-reverse;
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
  .ghost {
    text-decoration: underline;
    padding: 0;
    box-shadow: none;
    color: var(--primary);
  }
  i {
    font-size: 20px;
  }
</style>