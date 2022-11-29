<script>
  import { page } from "$app/stores";
  import Button from "$lib/components/Button.svelte";
  import Equal from "$lib/components/Equal.svelte";
    import Message from "$lib/components/Message.svelte";
  import { title } from "$lib/others/stores";
  import { slide } from "svelte/transition";

  $title = 'Welcome'
  $: current = $page.url.searchParams.get('step')
</script>

{#key current}
<div transition:slide|local={{ duration: 250 }} class="wrapper">

{#if !current}

<div>
  <h2>Assalam-u-Alaekum,</h2>
  <h1>{$page.data.locals.name}</h1>
</div>

<p>Tired of manually managing daily expenses? Often forgetting many things? Worry Not.</p>
<p><em>Expense Manager</em> lets you manage your daily expenses on the go with user-friendly UI.</p>

<Equal>
  <Button href="?step=how-it-works" reverse icon="ri:arrow-right-line" name="How It Works?" />
</Equal>

<Message>
  A verification email has been sent to your email. Please verify your account.
</Message>
{/if}

{#if current == 'how-it-works'}
<h1>How it works?</h1>

<ol>
  <li>You create an account.</li>
  <li>Add your income like salary to account.</li>
  <li>Add expenses as they happen.</li>
  <li>That's all</li>
</ol>

<p>Account naming <em>'Personal'</em> is auto-generated when you register.</p>

<Equal>
  <Button href="/welcome" icon="ri:arrow-left-line" name="Back" type="ghost" />
  <Button href="?step=features" reverse icon="ri:arrow-right-line" name="Features" />
</Equal>
{/if}

  {#if current == 'features'}
<h1>Features</h1>

<ol>
  <li>All data on-cloud</li>
  <li>Works on all devices</li>
  <li>Every action is logged</li>
  <li>Complete statistics</li>
  <li>Free?</li>
</ol>

<Equal>
  <Button href="?step=how-it-works" icon="ri:arrow-left-line" name="Back" type="ghost" />
  <Button href="/" reverse icon="ri:arrow-right-line" name="Dive In" />
</Equal>
{/if}

</div>
{/key}

<style>
  .wrapper {
    display: grid;
    gap: 30px;
  }
  h1 {
    font-size: 40px;
    font-weight: bold;
    color: var(--primary);
  }
  h2 {
    font-weight: bold;
    font-size: 24px;
  }
  p {
    line-height: 1.5;
  }
  em {
    font-weight: bold;
  }
  li {
    list-style-type: decimal;
    list-style-position: inside;
    line-height: 1.5;
    /* margin-bottom: 10px; */
  }
</style>