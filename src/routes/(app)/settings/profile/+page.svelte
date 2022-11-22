<script>
  export let profile = {
    name: 'Yousuf Iqbal',
    email: 'yousufiqbal@gmail.com',
    method: 'Google',
    joined: 'Nov 22, 2022'
  }
</script>

<div class="profile">

  {#each Object.keys(profile) as item}
  <div class="part">
    <div class="property">{item}</div>
    <div class="value">{profile[item]}</div>
  </div>
  {/each}

</div>

<style>
  .profile {
    display: grid;
    gap: 20px;
  }
  .part {
    display: grid;
    gap: 3px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 10px 15px;
  }
  .property {
    /* border: 1px dashed red; */
    text-transform: capitalize;
    font-weight: bold;
  }
</style>