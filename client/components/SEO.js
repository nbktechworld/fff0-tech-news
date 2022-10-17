import Head from 'next/head';

export default function SEO(props) {
  const metaTitle = props.title || 'Tech News';
  const metaDescription = props.description || "Technology news from all over the world.";
  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="robots" content="index,follow" key="metaRobots" />
      <meta name="description" content={metaDescription} key="metaDescription" />
      <meta name="twitter:card" content="summary_large_image" key="twitterCard" />
      <meta name="twitter:title" content={metaTitle} key="twitterTitle" />
      <meta name="twitter:description" content={metaDescription} key="twitterDescription" />
      {props.image && <meta name="twitter:image" content={props.image} key="twitterImage" />}

      <meta property="og:type" content={props.type || 'website'} key="ogType" />
      <meta property="og:title" content={metaTitle} key="ogTitle" />
      <meta property="og:description" content={metaDescription} key="ogDescription" />
      {props.image && <meta property="og:image" content={props.image} key="ogImage" />}
      <meta property="og:url" content={props.url || process.env.clientUrl} key="ogUrl" />
    </Head>
  );
}
