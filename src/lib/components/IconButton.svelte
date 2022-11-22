<script>
  import Icon from "@iconify/svelte";

  export let href = null
  export let icon
</script>

{#if !href}
<button on:click class="button">
  <Icon {icon} />
</button>

{:else}
<a {href} class="button">
  <Icon {icon} />
</a>
{/if}

<style>
  .button {
    display: flex;
    align-items: center;
    padding: 5px;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    color: var(--primary);
    /* gap: 15px; */
    /* box-shadow: var(--shadow); */
    font-size: 20px;
  }
</style>