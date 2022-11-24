<script>
  import dayjs from 'dayjs';

  /** @type {import('./\types').PageServerData} */
  export let data
</script>

<div class="profile">

  <div class="part">
    <div class="property">Name</div>
    <div class="value">{data.profile.name}</div> 
  </div>
  <div class="part">
    <div class="property">Email</div>
    <div class="value">{data.profile.email}</div> 
  </div>
  <div class="part">
    <div class="property">Joined</div>
    <div class="value">{dayjs(data.profile.created).format('MMM DD, YYYY - hh:mm a')}</div> 
  </div>

</div>

<style>
  .profile {
    display: grid;
    /* gap: 20px; */
    margin-bottom: 30px;
    border: 1px solid var(--border);
  }
  .part {
    display: grid;
    gap: 5px;
    border-bottom: 1px solid var(--border);
    /* border-radius: var(--radius); */
    padding: 10px 15px;
  }
  .part:last-child {
    border-bottom: none;
  }
  .property {
    /* border: 1px dashed red; */
    text-transform: capitalize;
    font-weight: bold;
  }
</style>