<script>
  import { page } from "$app/stores";
  import Bar from "$lib/components/Bar.svelte";

  const list = [
    '/add-transaction', 'edit-transaction'
  ]
</script>

{#if !list.includes($page.url.pathname)}
<Bar />
{/if}

<slot></slot>