<div class="activities">

  {#each Array(10) as item}
  <div class="activity">
    <div class="dated">Nov 12, 2022 - 12:01 PM</div>
    <div class="detail">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, odio!</div>
  </div>
  {/each}

</div>

<style>
  .activities {
    display: grid;
    gap: 20px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 20px;
    box-shadow: var(--shadow);
    margin-bottom: var(--mb, 30px);
  }
  .activity {
    display: grid;
    gap: 5px;
  }
  .dated {
    font-size: 14px;
    color: var(--primary);
  }
</style>