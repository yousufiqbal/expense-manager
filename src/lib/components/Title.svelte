<script>
  import { title as t } from '$lib/others/stores'
  import Icon from '@iconify/svelte';

  export let title, icon
  $t = title
</script>

<div class="title">
  <i><Icon {icon} /></i>
  <h1>{title}</h1>
</div>

<style>
  .title {
    display: flex;
    gap: 10px;
    /* border: 1px dashed red; */
    margin-bottom: var(--mb, 20px);
  }
  h1 {
    font-size: 24px;
    font-weight: bold;
  }
  i {
    padding: 3px;
    font-size: 24px;
    /* color: var(--primary); */
  }
</style>