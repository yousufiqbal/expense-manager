<script>
  import { removeToast, toasts } from "$lib/others/toasts";
  import Icon from "@iconify/svelte";
  import { fly } from "svelte/transition";
    import Nothing from "./Nothing.svelte";

  const iconsMap = {
    success: 'ri:check-double-line',
    error: 'ri:error-warning-line',
    info: 'ri:information-line',
  }
</script>

{#if $toasts.length != 0}
<div class="toasts">

  {#each $toasts as toast (toast.id)}
  <div transition:fly={{y: -20, duration: 100}} class="toast {toast.type}">

    <i>
      <Icon width="20" icon={iconsMap[toast.type]} />
    </i>

    <div class="message">{toast.message}</div>

    {#if toast.dismissible}
    <button on:click={() => removeToast(toast.id)}>
      <Icon icon="ri:close-line" width="20"  />
    </button>
    {/if}

    <div style:animation-duration="{toast.timeout}ms" class="border"></div>

  </div>
  {/each}
  
</div>
{:else}

<Nothing>
  No transactions
</Nothing>
{/if}

<style>
  .message {
    text-transform: capitalize;
  }
  .border {
    position: absolute;
    width: 0%;
    border-top: 6px solid var(--border);
    top: 0; left: 0;
    animation: hero ease-in-out;
    filter: invert(1);
    mix-blend-mode: difference;
  }
  @keyframes hero {
    from { width: 0%; }
    to { width: 100%; }
  }
  .toasts {
    z-index: 10;
    top: 20px; right: 20px;
    /* left: 20px; */
    position: fixed;
    display: grid;
    justify-items: right;
    gap: 20px;
    /* border: 1px solid red; */
  }
  .toast {
    position: relative;
    gap: 12px;
    box-shadow: var(--shadow);
    padding: 13px 16px 13px 12px;
    display: flex;
    align-items: center;
    border-radius: var(--radius);
    overflow: hidden;
    color: white;
  }
  button {
    padding: 2px;
    background-color: rgb(26, 26, 26);
    display: flex;
    border-radius: 50%;
  }
  .success {
    background-color: var(--primary);
  }
  .info {
    background-color: var(--secondary);
  }
  .error {
    background-color: var(--red);
  }
</style>