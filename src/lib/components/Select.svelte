<script>
  import { kebabCase } from "$lib/others/utils";

  export let label, attr = kebabCase(label)
  export let touched = false, error = null
  export let value = ''
  export let el
  export let options = []
  export let v, n // v for value, n for name
  
  const touch = () => {
    touched = true
  }
</script>

<div on:click={touch} on:keydown on:click class="field">

  <label for={attr}>{label}</label>

  <select disabled {value} bind:this={el} name="{attr}" id="{attr}">
    <option value="" selected disabled hidden>Choose</option>
    {#each options as option}
    <option value="{option[v]}">{option[n]}</option>
    {/each}
  </select>

  {#if error && touched}
  <span class="error">{error}</span>
  {/if}

</div>

<style>
  .field {
    border: 1px dashed red;
    z-index: 99999999992;
    display: grid;
    grid-column: span var(--cols, 1);
  }
  label {
    border-radius: var(--radius);
    z-index: 1;
    margin-left: 10px;
    margin-bottom: -10px;
    background-color: white;
    justify-self: start;
    padding: 0 5px;
    font-weight: bold;
    font-size: 14px;
  }
  select {
    padding: 15px 10px 10px 13px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }
  select:focus {
    border-color: var(--primary);
    outline: 1px solid var(--primary);
  }
  .error {
    text-transform: capitalize;
    padding: 8px 10px;
    color: var(--red);
  }
</style>