<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { setQuery } from "$lib/others/utils";
  import Icon from "@iconify/svelte";
  import dayjs from "dayjs";
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";

  let start, end

  const dispatch = createEventDispatcher()
  let pickerYear = dayjs($page.url.searchParams.get('start')? $page.url.searchParams.get('start') : dayjs()).format('YYYY')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  const restart = () => {
    start = dayjs().startOf('month').format('YYYY-MM-DD')
    end = dayjs().endOf('month').format('YYYY-MM-DD')
    navigate()
  }

  const decreaeYear = () => {
    pickerYear = dayjs(pickerYear, 'YYYY').subtract(1, 'year').format('YYYY')
  }

  const increaseYear = () => {
    pickerYear = dayjs(pickerYear, 'YYYY').add(1, 'year').format('YYYY')
  }

  const navigate = async () => {
    goto(setQuery({ start, end }, $page))
    dispatch('close')
  }

  const selectPickerDate = month => {
    start = dayjs(pickerYear + ' ' + month, 'YYYY MMM').startOf('month').format('YYYY-MM-DD')
    end = dayjs(pickerYear + ' ' + month, 'YYYY MMM').endOf('month').format('YYYY-MM-DD')
    navigate()
  }
  
</script>

<div transition:fly={{ y: -20, duration: 100 }} class="picker">
  <div class="title">
    <button on:click={restart}>Select Current Month</button>
    <button class="close" on:click={()=>dispatch('close')}>
      <Icon icon="ri:close-line" />
    </button>
  </div>
  <div class="year-picker">
    <button class="arrow" on:click={decreaeYear}><Icon icon="ri:arrow-left-s-line" /></button>
    <span>{pickerYear}</span>
    <button class="arrow" on:click={increaseYear}><Icon icon="ri:arrow-right-s-line" /></button>
  </div>
  <div class="months-picker">
    {#each months as month}
    <button on:click={()=>selectPickerDate(month)}>{month}</button>
    {/each}
  </div>
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
  .arrow {
    color: white;
    font-size: 26px;
    padding: 5px;
    display: flex;
    border-radius: var(--radius);
    background-color: var(--red);
  }
</style>