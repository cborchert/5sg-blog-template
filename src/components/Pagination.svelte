<script>
  export let pageSlugs = [];
  export let pageNumber = 1;

  const pages = pageSlugs.reduce((prev, current, i) => {
    if (i === 0 || i === pageSlugs.length - 1 || (i >= pageNumber - 2 && i <= pageNumber + 2)) {
      // If index is the first page, last page, or the page between n-2 and n+2 (inclusive) return the page number with the link
      return [
        ...prev,
        {
          // no link if we're on the current page
          path: i === pageNumber ? '' : current,
          i,
          text: i + 1,
        },
      ];
    } else if (i === pageNumber - 3 || i === pageNumber + 3) {
      // If n-2 or n+2, return ...
      return [
        ...prev,
        {
          // no link for ellipses
          path: '',
          i,
          text: '&hellip;',
        },
      ];
    }

    // need a default return statement
    // we'll just return the previous array without modifications
    return prev;
  }, []);
</script>

{#if pageSlugs.length > 1}
  <h2>Pagination</h2>
  <ul>
    {#each pages as { path, text }}
      <li class="pagination-page">
        {#if path}
          <a href={`/${path}`}>{@html text}</a>
        {:else}
          {@html text}
        {/if}
      </li>
    {/each}
  </ul>
{/if}

<style>
  li {
    list-style: none;
  }
  ul {
    padding: 0;
  }

  .pagination-page {
    display: inline-block;
    padding: 0 4px;
  }
</style>
