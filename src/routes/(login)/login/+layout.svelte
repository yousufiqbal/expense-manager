<script>
  import Content from "$lib/components/Content.svelte";
  import Logo from "$lib/components/Logo.svelte";
  import Tabs from "./Tabs.svelte";
  import Title from "$lib/components/Title.svelte";
</script>

<Logo />

<Content>
  <p>Expense manager is a multi-account, cloud-based, expense management app.</p>
</Content>

<Tabs  />

<slot></slot>