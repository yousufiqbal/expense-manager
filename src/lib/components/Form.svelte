<form on:submit|preventDefault>
  <slot></slot>
</form>

<style>
  form {
    display: grid;
    align-items: start;
    grid-template-columns: 1fr 1fr;
    gap: var(--gap, 20px);
    margin-bottom: var(--mb, 40px);
  }
</style>