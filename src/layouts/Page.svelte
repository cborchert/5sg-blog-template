<script>
  import Globals from "../components/Globals.svelte";
  import Header from "../components/Header.svelte";
  import Meta from "../components/Meta.svelte";

  export let excludeHeader = false;
  export let metadata = {};
  export let siteMeta = {};
  const metavalues = { ...metadata, siteMeta };
</script>

<Meta {...metavalues} />

<body>
  {#if !excludeHeader}
    <Header />
  {/if}
  <slot name="beforeMain" />
  <main>
    <slot name="beforeContent" />
    <slot />
    <slot name="afterContent" />
  </main>
  <slot name="afterMain" />
</body>

<Globals />

<style>
  main {
    max-width: 1024px;
    margin: 0 auto;
    padding: 16px 32px 64px;
  }
</style>
