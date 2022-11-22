<script>
  import Field from "$lib/components/Field.svelte";
  import Form from "$lib/components/Form.svelte";
    import Activities from "./Activities.svelte";
</script>

<Form>
  <Field type="date" label="From Date" />
  <Field type="date" label="To Date" />
</Form>

<Activities />