<script>
  import Page from "../layouts/Page.svelte";
  import ArticlePreview from "../components/ArticlePreview.svelte";

  export let siteMeta = {};
  export let nodes = [];
  export let term = "";
  export let taxonomyHomeSlug = "";
  export let taxonomyName = "";
  export let taxonomyNamePlurial = "";
  const meta = {
    title: `${taxonomyName}: ${term}`,
    description: `All the blog posts with the ${taxonomyName} of ${term} `,
  };
</script>

<Page {meta} {siteMeta}>
  <h1>{taxonomyName}: {term}</h1>
  <h2>Posts</h2>
  <ul>
    {#each nodes as node}
      <li>
        <ArticlePreview {node} />
      </li>
    {/each}
  </ul>

  <h2>Check out another {taxonomyName}:</h2>
  <ul>
    <li><a href={taxonomyHomeSlug}>All {taxonomyNamePlurial}</a></li>
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
