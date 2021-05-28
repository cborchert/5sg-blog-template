<script>
  import Page from "../layouts/Page.svelte";
  import Hydrate from "5sg/Hydrate";
  import Count from "../components/Count.svelte";
  export const name = "world";
  export let siteMeta = {};

  const metadata = { title: "Home", description: "Home page" };
</script>

<Page {metadata} {siteMeta}>
  <div slot="beforeContent">
    <section>
      <div>
        <div class="intro">
          <h1>Hello, World!</h1>
          <h5>
            Welcome to the demo site for <a
              href="https://github.com/cborchert/5sg">5SG</a
            >
          </h5>
        </div>
        <p>
          5sg stands for <strong>s</strong>tupid <strong>s</strong>imple
          <strong>s</strong>velte <strong>s</strong>tatic
          <strong>s</strong>ite <strong>g</strong>enerator, an ssg in the making
          which focuses on ease of development, simplicity of structure, and
          speed of delivery. The name will probably change.
        </p>
        <p>This site took 30 seconds to build on netlify, including:</p>
        <ul>
          <li>
            <strong>1000</strong> interlinked blog pages with dynamically inserted
            sibling and category/tag navigation
          </li>
          <li>
            <strong>~ 220</strong> dynamically generated
            <a href="/blog">blogfeed</a>,
            <a href="/blog/categories">category</a>, and
            <a href="/blog/tags">tags</a> pages
          </li>
          <li>
            and the conversion of <strong>100</strong> high quality (but too large)
            images to sanely sized files.
          </li>
        </ul>
        <p>Take some time to explore, we'll see you again soon. 👋</p>
        -
        <p><em>P.S. there's even partial hydration. Check it out :</em></p>
        <Hydrate component={Count} props={{ name: "counter" }} />
      </div>
    </section>
  </div>
</Page>

<style>
  section {
    height: 80vh;
    display: grid;
    justify-content: center;
    align-items: center;
  }
  .intro {
    font-size: 2.5rem;
    margin-bottom: 64px;
  }
  h1 {
    line-height: 1;
    margin-bottom: 16px;
  }
</style>
