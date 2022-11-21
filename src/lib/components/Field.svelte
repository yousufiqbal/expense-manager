<script>
  import { kebabCase } from "$lib/others/utils";

  export let label, attr = kebabCase(label)
  export let touched = false, error = null
  export let type = 'text'
  export let inputmode = 'text'
  export let placeholder = ''
  export let value = ''

  const typeMe = node => {
    node.type = type
  }
</script>

<div class="field">
  <label for={attr}>{label}</label>
  <input {inputmode} use:typeMe id={attr} name={attr} {placeholder} {value} size="1">
  {#if error && touched}
  <span class="error">{error}</span>
  {/if}
</div>

<style>
  .field {
    display: grid;
    grid-column: span var(--cols, 1);
    /* border: 1px dashed red; */
  }
  label {
    z-index: 1;
    margin-left: 10px;
    margin-bottom: -10px;
    background-color: white;
    justify-self: start;
    padding: 0 5px;
    font-weight: bold;
    font-size: 14px;
  }
  input {
    padding: 13px 10px 10px 15px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }
  input:focus {
    border-color: var(--primary);
    outline: 1px solid var(--primary);
  }
  .error {
    text-transform: capitalize;
    padding: 8px 10px;
    color: var(--red);
  }
</style>