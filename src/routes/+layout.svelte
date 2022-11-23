<script>
  import ProgressBar from '$lib/components/ProgressBar.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import Toasts from '$lib/components/Toasts.svelte';
  import '$lib/styles/all.css'
</script>

<Toasts />
<ProgressBar />
<Seo />

<slot></slot>
