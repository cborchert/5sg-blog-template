<script context="module">
  export const deriveProps = ({ nodeMeta = {}, nodeData = { name: "" } }) => {
    // create sibling pages
    const blogPages = Object.values(nodeMeta)
      .filter((node) => node.publicPath.startsWith("blog/"))
      .sort((a, b) => {
        const dateA = (a.metadata && a.metadata.date) || "";
        const dateB = (b.metadata && b.metadata.date) || "";
        // newest first
        return dateA > dateB ? -1 : 1;
      });
    const currentIndex = blogPages.findIndex(
      (node) => node.publicPath === `${nodeData.publicPath}`
    );
    const prevPost = currentIndex > 0 && blogPages[currentIndex - 1];
    const nextPost =
      currentIndex < blogPages.length - 1 && blogPages[currentIndex + 1];

    // these will be injected into the component
    return {
      nextPost,
      prevPost,
    };
  };
</script>

<script>
  import Page from "./Page.svelte";
  export let metadata = {};

  const { title, date, cover, author } = metadata;

  // these props are injected thanks to deriveProps above
  export let nextPost;
  export let prevPost;

  const attribution = `${
    date ? `Written on ${new Date(date).toDateString()} ` : ""
  } ${author ? `by ${author} ` : ""}`.trim();

  // additional metadata
  /** @todo: handle categories and tags */
  const categories = [];
  const tags = [];
  const getCategorySlug = (a) => a;
  const getTagSlug = (a) => a;
</script>

<Page {...$$props}>
  <article>
    <header>
      {#if cover}
        <div><img class="cover" src={cover} alt={title} /></div>
      {/if}
      {#if title}
        <h1>{title}</h1>
      {/if}
      {#if attribution}
        <h3>{attribution}</h3>
      {/if}

      {#if categories && categories.length > 0}
        <div class="meta-attribute">
          <h4 class="meta-attribute__title">Categories:</h4>
          <ul class="meta-attribute__value">
            {#each categories as category}
              <li>
                <a href={`${getCategorySlug(category)}.dynamic`}>{category}</a>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
      {#if tags && tags.length > 0}
        <div class="meta-attribute">
          <h4 class="meta-attribute__title">Tags:</h4>
          <ul class="meta-attribute__value">
            {#each tags as tag}
              <li class="tag">
                <a href={`${getTagSlug(tag)}.dynamic`}>#{tag}</a>
              </li>
            {/each}
          </ul>
        </div>
      {/if}
    </header>
    <div>
      <slot />
    </div>
    <footer>
      <nav>
        <ul class="sibling-navigation">
          <li>
            {#if prevPost}<a href="/{prevPost.publicPath}"
                >← {prevPost.metadata.title}</a
              >{/if}
          </li>
          <li>
            {#if nextPost}<a href="/{nextPost.publicPath}"
                >{nextPost.metadata.title} →</a
              >{/if}
          </li>
        </ul>
      </nav>
    </footer>
  </article>
</Page>

<style>
  .cover {
    width: 100%;
    height: 400px;
    margin: 0 auto;
    object-fit: cover;
  }

  .sibling-navigation {
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
  }
  .sibling-navigation li {
    list-style: none;
    flex-grow: 1;
    padding: 12px 0;
  }

  header {
    margin-bottom: 64px;
  }

  header h1 {
    font-size: 3rem;
  }
  header h3,
  header {
    font-size: 0.9rem;
  }

  .meta-attribute {
    display: flex;
    justify-content: flex-start;
    margin: 4px 0;
  }

  .meta-attribute__title {
    flex: 0;
    margin: 0;
    padding: 4px 0 0;
  }

  .meta-attribute__value {
    flex: 1;
    margin: 0;
    padding: 0 0 0 8px;
  }

  .meta-attribute__value li {
    display: inline-block;
    padding: 0 0 0 8px;
  }

  li.tag {
    background: var(--bg-secondary);
    padding: 0px 8px;
    margin: 2px 4px;
  }

  footer {
    margin-top: 32px;
  }

  @media screen and (min-width: 600px) {
    .sibling-navigation {
      flex-direction: row;
    }
    .sibling-navigation li:last-child {
      text-align: right;
    }
  }
</style>
