<script>
  import { page } from "$app/stores";
    import Button from "$lib/components/Button.svelte";
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
  import Tabs from "$lib/components/Tabs.svelte";
  import Title from "$lib/components/Title.svelte";

  $: current = $page.url.searchParams.get('tab') || 'expense'
  const maps = { 'expense': 'Expense', 'income': 'Income', 'transfer': 'Transfer', }
  const colors = { 'expense': 'warning', 'income': 'primary', 'transfer': 'secondary', }
</script>

<Title title="New {maps[current]}" back href="/" />
<Tabs />

<Form>
  <Field label="Date" type="date" />
  <Field label="Time" type="time" />
  <!-- Account / From (Transfer) -->
  <Field label="Account" />
  <!-- Category / To (Transfer)  -->
  <Field label="Category" />
  <Field label="Amount" --cols={2} inputmode="numeric" />
  <Field label="Title" --cols={2} />
  <Field label="Description" --cols={2} textarea />
</Form>

<div style="display: flex; gap: 15px">
  <Button name="Save {maps[current]}" type={colors[current]} icon="ri:save-line" />
  <Button name="Discard" type="transparent" icon="ri:close-line" href="/" />
</div>
<!-- Image(s) -->