<script>
  import Nothing from '$lib/components/Nothing.svelte';
  import Icon from '@iconify/svelte';
  import dayjs from 'dayjs';
  import { slide } from 'svelte/transition';

  /** @type {import('./$types').PageServerData} */
  export let data

  let current = null

  const toggle = id => {
    if (current == id) {current = null; return }
    current = id
  }
</script>

{#if data.activities?.length != 0}
<div class="activities">
  
  {#each data.activities as activity}
  <div class="activity">

    <button on:click={()=>toggle(activity.activityId)} class="head">
      <div class="dated">{dayjs(activity.created).format('MMM DD, YYYY - hh:mm a')}</div>
      <i><Icon icon={current == activity.activityId ? 'ri:arrow-up-s-line' : 'ri:arrow-down-s-line'} /></i>
    </button>

    <div class="summary">
      <p>{activity.summary}</p>
    </div>

    {#if current == activity.activityId}
    <div transition:slide={{ duration: 100 }} class="detail">
      {activity.detail}
    </div>
    {/if}

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
    gap: 2px;
  }
  .head {
    display: flex;
    justify-content: space-between;
  }
  i {
    font-size: 18px;
  }
  .dated {
    font-size: 14px;
    color: var(--primary);
  }
  .detail {
    margin-top: 3px;
    color: gray;
    word-break: break-all;
    font-size: 14px;
    /* border: 1px solid var(--border); */
  }
</style>