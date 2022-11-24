<script>
  import dayjs from 'dayjs';

  /** @type {import('./$types').PageServerData} */
  export let data
</script>

{#if data.activities?.length != 0}
<div class="activities">
  
  {#each data.activities as activity}
  <div class="activity">
    <div class="dated">{dayjs(activity.created).format('MMM DD, YYYY - hh:mm a')}</div>
    <div class="detail">{activity.detail}</div>
  </div>
  {/each}

</div>
{/if}

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