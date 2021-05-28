<script>
  import Page from "../layouts/Page.svelte";
  export let siteMeta = {};

  export let taxonomyPages = [];
  export let taxonomyNamePlurial = "";
  const meta = {
    title: `${taxonomyNamePlurial}`,
    description: `All the ${taxonomyNamePlurial} `,
  };
</script>

<Page {meta} {siteMeta}>
  <h1>{taxonomyNamePlurial}:</h1>
  <ul>
    {#each taxonomyPages as { slug, count, term }}
      <li><a href={slug}>{term} ({count} post{count === 1 ? "" : "s"})</a></li>
    {/each}
  </ul>
</Page>

<style>
  li {
    list-style: none;
  }
  ul {
    padding: 0;
  }
</style>
