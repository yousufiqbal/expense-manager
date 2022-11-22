<script>
  import { page } from "$app/stores";
</script>

<div class="tabs">
  <a class:active={$page.url.pathname == '/settings/profile'} class="details" href="/settings/profile">Details</a>
  <a class:active={$page.url.pathname == '/settings/profile/activities'} class="activities" href="/settings/profile/activities">Activities</a>
</div>

<style>
  .tabs {
    display: flex;
    border: 1px solid var(--border);
    padding: 5px;
    gap: 6px;
    border-radius: var(--radius);
    margin-bottom: var(--mb, 30px);
  }
  a {
    display: flex;
    justify-content: center;
    flex: 1;
    padding: 10px 0;
    background-color: rgb(240, 240, 240);
    border-radius: var(--radius);
    /* transition: all 0.2s; */
  }
  .active {
    color: white;
    background-color: var(--primary);
  }
</style>