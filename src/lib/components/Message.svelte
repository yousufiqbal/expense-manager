<script>
  import Icon from "@iconify/svelte";
  import Content from "./Content.svelte"

  export let type = 'warning'
  const iconMaps = {
    warning: 'ri:information-line',
    success: 'ri:check-double-line',
  }
</script>

<div class="message {type}">
  <i><Icon icon={iconMaps[type]} /></i>
  <section>
    <Content --mb="0">
      <slot></slot>
    </Content>
  </section>
</div>

<style>
  .message {
    display: flex;
    gap: 15px;
    padding: 15px;
    /* border: 1px solid var(--border); */
    margin-bottom: var(--mb, 30px);
    border-radius: var(--radius);
  }
  i {
    font-size: 20px;
  }
  section {
    flex: 1;
  }
  .warning {
    background-color: rgb(255, 238, 238);
  }
  .success {
    background-color: rgb(234, 255, 242);
  }
</style>