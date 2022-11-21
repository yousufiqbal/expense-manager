<script>
  import Button from "$lib/components/Button.svelte";
    import Buttons from "$lib/components/Buttons.svelte";
    import Field from "$lib/components/Field.svelte";
    import Form from "$lib/components/Form.svelte";
  import Title from "$lib/components/Title.svelte";
</script>

<Title title="Add Account" back href="/accounts" />

<Form>
  <Field --cols={2} label="Account Group" />
  <Field --cols={2} label="Account Name" />
  <Field --cols={2} label="Starting Amount (Rs.)" inputmode="numeric" />
</Form>

<Buttons>
  <Button name="Save Account" icon="ri:save-line" />
  <Button name="Discard" icon="ri:close-line" href="/accounts" type="secondary" />
</Buttons>