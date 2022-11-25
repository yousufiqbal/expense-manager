<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte'
  import dayjs from 'dayjs';

  let start = $page.url.searchParams.get('start') || dayjs().startOf('month').format('YYYY-MM-DD')
  let end = $page.url.searchParams.get('end') || dayjs().endOf('month').format('YYYY-MM-DD')

  const decrease = () => {
    start = dayjs(start, 'YYYY-MM-DD').subtract(1, 'month').format('YYYY-MM-DD')
    end = dayjs(end, 'YYYY-MM-DD').subtract(1, 'month').format('YYYY-MM-DD')
    navigate()
  }
  
  const increase = () => {
    start = dayjs(start, 'YYYY-MM-DD').add(1, 'month').format('YYYY-MM-DD')
    end = dayjs(end, 'YYYY-MM-DD').add(1, 'month').format('YYYY-MM-DD')
    navigate()
  }

  const navigate = async () => {
    goto(`?start=${start}&end=${end}`)
  }
</script>

<div class="date-navigator">
  <button on:click={decrease}><Icon icon="ri:arrow-left-s-line" /></button>
  <span>{dayjs(start, 'YYYY-MM-DD').format('MMM - YYYY')}</span>
  <button on:click={increase}><Icon icon="ri:arrow-right-s-line" /></button>
</div>

<style>
  .date-navigator {
    flex: 1;
    display: flex;
    border-radius: var(--radius);
    overflow: hidden;
    border: 1px solid var(--border);
    padding: 5px;
    margin-bottom: var(--mb, 30px);
  }
  span {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border); */
    /* box-shadow: var(--shadow); */
  }
  button {
    background-color: var(--primary);
    color: white;
    font-size: 26px;
    padding: 5px;
    display: flex;
    border-radius: var(--radius);
    /* border: 1px solid var(--border); */
  }
</style>