<script>
  export let siteMeta = {};
  const { name: siteTitle = "" } = siteMeta || {};

  export let title;
  export let description;
</script>

<svelte:head>
  <title>{title || ""} - {siteTitle}</title>
  <meta name="description" content={description} />
</svelte:head>
