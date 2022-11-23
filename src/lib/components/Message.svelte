<script>
    import Icon from "@iconify/svelte";
    import Content from "./Content.svelte";


  export let icon = 'ri:information-line'
</script>

<div class="message">
  <i><Icon {icon} /></i>
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
    border: 1px solid var(--border);
    margin-bottom: var(--mb, 30px);
    background-color: rgb(255, 246, 226);
    border-radius: var(--radius);
  }
  i {
    font-size: 20px;
  }
  section {
    flex: 1;
  }
</style>