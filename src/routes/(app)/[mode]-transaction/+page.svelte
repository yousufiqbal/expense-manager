<script>
  import { page } from "$app/stores";
  import Tabs from "$lib/components/Tabs.svelte";
  import Title from "$lib/components/Title.svelte";

  $: current = $page.url.searchParams.get('tab') || 'expense'
  const maps = { 'expense': 'Expense', 'income': 'Income', 'transfer': 'Transfer', }
</script>

<Title title="New {maps[current]}" back />
<Tabs />

<!-- Date -->
<!-- Time -->
<!-- Account / From (Transfer) -->
<!-- Category / To (Transfer)  -->
<!-- Amount -->
<!-- Title -->
<!-- Description -->
<!-- Image(s) -->

