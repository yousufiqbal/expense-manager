<script>
    import Nothing from '$lib/components/Nothing.svelte';
  import dayjs from 'dayjs';

  /** @type {import('./$types').PageServerData} */
  export let data
</script>

{#if data.activities?.length != 0}
<div class="activities">
  
  {#each data.activities as activity}
  <div class="activity">
    <div class="dated">{dayjs(activity.created).format('MMM DD, YYYY - hh:mm a')}</div>
    <div class="detail">
      <p>{activity.summary}</p>
    </div>
  </div>
  {/each}

</div>
{:else}

<Nothing>
  No activities
</Nothing>
{/if}

<style>
  .activities {
    display: flex;
    flex-direction: column;
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
  .detail {
    border: 1px dashed red;
  }
</style>