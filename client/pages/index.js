export default function Index() {
  return (
    <div>Test3</div>
  )
}

export async function getStaticProps() {
  return {
    redirect: {
      destination: '/articles',
      permanent: false
    }
  }
}
