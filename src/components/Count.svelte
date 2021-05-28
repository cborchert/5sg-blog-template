<script>
  export let name = "count";
  let count = 0;
</script>

<h2>Hello, {name}: {count}</h2>
<button on:click={() => count++}>MORE!</button>
