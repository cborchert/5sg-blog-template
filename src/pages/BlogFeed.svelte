<script>
  import Page from "../layouts/Page.svelte";
  import ArticlePreview from "../components/ArticlePreview.svelte";
  import Pagination from "../components/Pagination.svelte";

  // all the nodes on this page
  export let nodes = [];
  // the current page number, 0-indexed
  export let pageNumber = 0;
  // the total number of pages
  export let numPages = 0;
  // the list of all page slugs
  // to be used for linking to other pages
  export let pageSlugs = [];
</script>

<Page>
  <h1>Blog Feed</h1>
  page {pageNumber + 1} of {numPages}
  <ul>
    {#each nodes as node}
      <li>
        <ArticlePreview {node} />
      </li>
    {/each}
  </ul>
  <footer>
    <Pagination {pageNumber} {pageSlugs} />
  </footer>
</Page>

<style>
  li {
    list-style: none;
  }
  ul {
    padding: 0;
  }
</style>
