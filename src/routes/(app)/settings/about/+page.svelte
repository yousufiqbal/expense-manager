<script>
  import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
  import Content from "$lib/components/Content.svelte";
  import Title from "$lib/components/Title.svelte";

  const crumbs = [
    { name: 'Settings', href: '/settings' },
    { name: 'About', href: '/settings/about' },
  ]
</script>

<Breadcrumbs {crumbs} icon="ri:settings-4-line" />
<Title title="About" back href="/settings" />

<Content>

  <!-- <h1 id="expense-manager">Expense Manager</h1> -->
  <p>Expense Manager app can be used to manage day-to-day expenses.</p>
  <h2 id="features">Features</h2>
  <ol>
  <li>Manage incomes &amp; expenses</li>
  <li>Multiple accounts</li>
  <li>Transfer funds between accounts</li>
  <li>Google sign-in</li>
  <li>All data on cloud</li>
  <li>View stats of selected or all accounts</li>
  <li>Complete activity logging</li>
  <li>Platform agnostic. Use on any device including PC, laptop, mobiles, etc</li>
  <li>Free for everyone (or maybe?)</li>
  </ol>
  <h2 id="why-">Why?</h2>
  <p>I built this piece of code just to showcase some coding knowledge.</p>
  <h2 id="tech-stack">Tech Stack</h2>
  <p>Following technologies were used to build this app:</p>
  <ol>
  <li>SvelteKit</li>
  <li>MySQL</li>
  <li>Many other libraries (See package.json for more details)</li>
  </ol>

</Content>