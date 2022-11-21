<script>
    import Icon from "@iconify/svelte";


  export let subtitle
  export let icon = null
</script>

<div class="subtitle">
  {#if icon}
  <i><Icon {icon} /></i>
  {/if}
  <h2>{subtitle}</h2>
</div>

<style>
  .subtitle {
    display: flex;
    gap: 10px;
    /* border: 1px dashed red; */
    margin-bottom: var(--mb, 20px);
  }
  h2 {
    font-size: 20px;
    font-weight: bold;
  }
  i {
    font-size: 20px;
    padding: 2px;
  }
</style>