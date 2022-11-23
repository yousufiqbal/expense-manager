<script>
  export let errors = {}
</script>

{#if errors.server}
<div class="server-error">
  {errors.server}
</div>
{/if}

<style>
  .server-error {
    color: var(--red);
    margin-bottom: 40px;
    font-weight: bold;
  }
</style>