import React from "react";
import { useRouter } from "next/router";

import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
  Loader,
} from "../../components";
import { getPosts, getPostDetails } from "../../services";
 import { AdjacentPosts } from "../../sections";

const PostDetails = ({ post }) => { 
     const router = useRouter();

   if (router.isFallback) {
       return <Loader />;
   }
 
  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post.attributes} />
            <Author author={post.attributes.author} />
             <AdjacentPosts
              slug={post.attributes.slug}
              createdAt={post.attributes.createdAt}
            /> 
            <CommentsForm slug={post.attributes.slug} />
            <Comments slug={post.attributes.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget
                slug={post.attributes.slug}
                categories={post.attributes.categories.data.map(
                  (category) => category.attributes.slug
                )}
              />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostDetails;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug);
  return {
    props: {
      post: data[0],
    },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ attributes: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
