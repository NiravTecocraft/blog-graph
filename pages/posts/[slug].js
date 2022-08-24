import { GraphQLClient, gql } from 'graphql-request';
import Link from 'next/link';

const graphcms = new GraphQLClient('https://api-ap-south-1.hygraph.com/v2/cl774tuse0q9801ungd0k1zzb/master');

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      coverPhoto {
        id
        url
      }
    }
  }
`;

const SLUGLIST = gql`
  {
    posts {
      slug
    }
  }
`;

export async function getStaticPaths() {
  const { posts } = await graphcms.request(SLUGLIST);
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await graphcms.request(QUERY, { slug });
  const post = data.post;
  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}

export default function BlogPost({ post }) {
  return (
    <main>
      <div>
        <img src={post.coverPhoto.url} className='w-100' />
      </div>
      <div className='container mt-5'>
        <div className='d-flex'>
          <div>
            <img src={post.author.avatar.url} alt='' style={{ width: 50, borderRadius: 10 }} />
          </div>
          <div className='mx-2'>
            <h6 style={{ fontSize: 20 }}>by {post.author.name}</h6>
            <p> {post.datePublished}</p>
          </div>
        </div>
        <h2>{post.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.content.html }} />
        <div className='mt-5'>
          <Link href={'/'} style={{ textAlign: 'center' }}>
            <h1 style={{ color: 'red', fontWeight: 'bold', cursor: 'pointer' }}>Back to Home</h1>
          </Link>
        </div>
      </div>
    </main>
  );
}
