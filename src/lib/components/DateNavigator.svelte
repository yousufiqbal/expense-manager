<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { outclickHandler, setQuery } from '$lib/others/utils';
  import Icon from '@iconify/svelte'
  import dayjs from 'dayjs';
  import { fly } from 'svelte/transition';

  export let type = 'primary'

  let picker = false
  let pickerYear = dayjs($page.url.searchParams.get('start'), 'YYYY-MM-DD' || dayjs()).format('YYYY')

  let start = $page.url.searchParams.get('start') || dayjs().startOf('month').format('YYYY-MM-DD')
  let end = $page.url.searchParams.get('end') || dayjs().endOf('month').format('YYYY-MM-DD')

  const restart = () => {
    start = dayjs().startOf('month').format('YYYY-MM-DD')
    end = dayjs().endOf('month').format('YYYY-MM-DD')
    navigate()
  }

  const decrease = () => {
    start = dayjs(start, 'YYYY-MM-DD').subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
    end = dayjs(end, 'YYYY-MM-DD').subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
    navigate()
  }
  
  const increase = () => {
    start = dayjs(start, 'YYYY-MM-DD').add(1, 'month').startOf('month').format('YYYY-MM-DD')
    end = dayjs(end, 'YYYY-MM-DD').add(1, 'month').endOf('month').format('YYYY-MM-DD')
    navigate()
  }

  const decreasePickerYear = () => {
    pickerYear = dayjs(pickerYear, 'YYYY').subtract(1, 'year').format('YYYY')
  }

  const increasePickerYear = () => {
    pickerYear = dayjs(pickerYear, 'YYYY').add(1, 'year').format('YYYY')
  }

  const navigate = async () => {
    goto(setQuery({ start, end }, $page))
  }

  const selectPickerDate = month => {
    start = dayjs(pickerYear + ' ' + month, 'YYYY MMM').startOf('month').format('YYYY-MM-DD')
    end = dayjs(pickerYear + ' ' + month, 'YYYY MMM').endOf('month').format('YYYY-MM-DD')
    navigate()
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
</script>


<div use:outclickHandler on:outclick={()=>picker=false} class="date-navigator">
  <button class="arrow {type}" on:click={decrease}><Icon icon="ri:arrow-left-s-line" /></button>
  <button on:click={()=>picker=!picker} class="status">{dayjs(start, 'YYYY-MM-DD').format('MMM - YYYY')}</button>
  <button class="arrow {type}" on:click={increase}><Icon icon="ri:arrow-right-s-line" /></button>

  {#if picker}
  <div transition:fly={{ y: -20, duration: 100 }} class="picker">
    <div class="title">
      <button on:click={restart}>Select Current Month</button>
      <button class="close" on:click={()=>picker=false}>
        <Icon icon="ri:close-line" />
      </button>
    </div>
    <div class="year-picker">
      <button class="arrow" on:click={decreasePickerYear}><Icon icon="ri:arrow-left-s-line" /></button>
      <span>{pickerYear}</span>
      <button class="arrow" on:click={increasePickerYear}><Icon icon="ri:arrow-right-s-line" /></button>
    </div>
    <div class="months-picker">
      {#each months as month}
      <button on:click={()=>selectPickerDate(month)}>{month}</button>
      {/each}
    </div>
  </div>
  {/if}
</div>

<style>
  .picker {
    display: grid;
    gap: 5px;
    position: absolute;
    background-color: #fff;
    width: 100%;
    left: 0px;
    top: 55px;
    z-index: 6;
    padding: 5px;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    border: 1px solid var(--border);
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--secondary);
    color: white;
    border-radius: var(--radius);
    padding-right: 5px;
  }
  .title button {
    padding: 10px;
  }
  .close {
    display: flex;
    padding: 3px !important;
    font-size: 22px;
    /* border: 1px dashed white; */
  }
  .year-picker {
    padding: 5px;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    display: flex;
    align-items: center;
  }
  .year-picker span {
    flex: 1;
    text-align: center;
  }
  .months-picker {
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(4, 1fr);
  }
  .months-picker button {
    text-align: center;
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 8px 0;
  }
  .date-navigator {
    position: relative;
    flex: 1;
    display: flex;
    gap: 5px;
    border-radius: var(--radius);
    border: 1px solid var(--border);
    padding: 5px;
    margin-bottom: var(--mb, 30px);
  }
  .status {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .arrow {
    color: white;
    font-size: 26px;
    padding: 5px;
    display: flex;
    border-radius: var(--radius);
    background-color: var(--red);
    /* border: 1px solid var(--border); */
  }
  .secondary {
    background-color: var(--secondary);
  }
  .primary {
    background-color: var(--primary);
  }
  .red {
    background-color: var(--red);
  }
</style>