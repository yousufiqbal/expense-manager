<script>
  import Icon from "@iconify/svelte";
</script>

<div class="logo">
  <i><Icon icon="ri:wallet-3-line" /></i>
  <h1>
    Expense<br>Manager
  </h1>
</div>

<style>
  .logo {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
  }
  i {
    font-size: 60px;
    color: var(--primary);
  }
  h1 {
    font-size: 21px;
    font-weight: bold;
    margin-bottom: 4px;
  }
</style>