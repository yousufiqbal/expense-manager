<script>
  import Icon from "@iconify/svelte";

  export let href
</script>

<a {href} class="plus">
  <Icon icon="ri:add-line" />
</a>

<style>
  .plus {
    display: grid;
    place-items: center;
    color: white;
    background-color: var(--primary);
    width: 42px; height: 42px;
    border-radius: 50%;
    position: fixed;
    bottom: 90px; right: 40px;
    font-size: 26px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  }
</style>