<script>

    import Icon from "@iconify/svelte";

</script>
<div class="nothing">
  <i><Icon icon="ri:information-line" /></i>
  <slot></slot>
</div>

<style>
  .nothing {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed var(--red);
  }
</style>