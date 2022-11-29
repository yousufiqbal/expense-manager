<script>
  import Button from '$lib/components/Button.svelte';
  import Title from '$lib/components/Title.svelte'
</script>

<Title title="Problem Happened" icon="ri:alarm-warning-line" />
<p>Looks like I cannot find what you are looking for on my computer.</p>

<div>
  <Button name="Back to Home" icon="ri:arrow-left-line" href="/" />
</div>

<style>
  p {
    line-height: 1.5;
    margin-bottom: 40px;
  }
</style>