import {
  filterByNodePath,
  sortByNodeDate,
  paginateNodeCollection,
  groupByFrontmatterTerms,
} from "5sg/helpers";

/**
 * Given the nodeMeta, returns the information necessary to render some dynamic pages
 * @param {Array<NodeMetaEntry>} nodes
 * @returns {Array<RenderablePage>}
 */
const getDynamicNodes = (nodes = []) => {
  // filter, sort, and map/transform nodes to get the posts
  const blogPostNodes = nodes
    .filter(filterByNodePath("blog/"))
    .sort(sortByNodeDate);

  // get the paginated blog page nodes
  const blogPageNodes = paginateNodeCollection(blogPostNodes, {
    component: "src/pages/BlogFeed.svelte",
    slugify: (i) =>
      i === 0 ? `blog/index.dynamic` : `blog/page-${i + 1}.dynamic`,
  });

  // group blog posts by categories
  // gives an object like
  // { foo: [node1, node2], bar: [node1, node3, node5] }
  const blogCategories = groupByFrontmatterTerms(blogPostNodes, "category");

  // for each category, create a page
  /** @type {Array<RenderablePage>} */
  const blogCategoryPages = Object.entries(blogCategories).map(
    ([categoryName, nodes]) => ({
      props: {
        nodes,
        taxonomyHomeSlug: "/blog/categories/index.dynamic",
        taxonomyName: "category",
        taxonomyNamePlurial: "categories",
        term: categoryName,
      },
      slug: `/blog/categories/${categoryName
        .toLowerCase()
        .replace(" ", "-")}.dynamic`,
      component: "src/pages/TaxonomySingle.svelte",
    })
  );

  // create a home page for all categories
  /** @type {Array<RenderablePage>} */
  const categoryHomePage = {
    props: {
      taxonomyName: "category",
      taxonomyNamePlurial: "categories",
      taxonomyPages: blogCategoryPages.map(({ props, slug }) => {
        return { slug, count: props.nodes.length, term: props.term };
      }),
    },
    slug: `/blog/categories/index.dynamic`,
    component: "src/pages/TaxonomyHome.svelte",
  };

  // group blog posts by tag
  // gives an object like
  // { foo: [node1, node2], bar: [node1, node3, node5] }
  const blogTags = groupByFrontmatterTerms(blogPostNodes, "tags");

  // for each tag, create a page
  /** @type {Array<RenderablePage>} */
  const blogTagPages = Object.entries(blogTags).map(([tagName, nodes]) => ({
    props: {
      nodes,
      taxonomyHomeSlug: "/blog/tags/index.dynamic",
      taxonomyName: "tag",
      taxonomyNamePlurial: "tags",
      term: tagName,
    },
    slug: `/blog/tags/${tagName.toLowerCase().replace(" ", "-")}.dynamic`,
    component: "src/pages/TaxonomySingle.svelte",
  }));

  // create a home page for all categories
  /** @type {Array<RenderablePage>} */
  const tagHomePage = {
    props: {
      taxonomyName: "tag",
      taxonomyNamePlurial: "tags",
      taxonomyPages: blogTagPages.map(({ props, slug }) => {
        return { slug, count: props.nodes.length, term: props.term };
      }),
    },
    slug: `/blog/tags/index.dynamic`,
    component: "src/pages/TaxonomyHome.svelte",
  };

  return [
    ...blogPageNodes,
    ...blogCategoryPages,
    categoryHomePage,
    ...blogTagPages,
    tagHomePage,
  ];
};

export default {
  getDynamicNodes,
  siteMeta: {
    name: "",
    short_name: "",
    description: "",
    icons: [
      {
        src: "/static/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/static/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#ff0000",
    background_color: "#ff0000",
    display: "standalone",
  },
  layouts: { blog: `src/layouts/Blog.svelte`, _: `src/layouts/Page.svelte` },
};
