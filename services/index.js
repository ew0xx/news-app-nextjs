import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:1337/graphql"
export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        data {
          attributes {
            name
            slug
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.categories.data;
};
export const getPosts = async () => {
  const query = gql`
    query GetPosts {
      posts {
        data {
          attributes {
            author {
              data {
                attributes {
                  name
                  bio
                  photo {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
            featuredImage {
              data {
                attributes {
                  url
                }
              }
            }
            title
            excerpt
            content
            slug
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query);
  return result.posts.data;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      posts(filters: { slug: { eq: $slug } }) {
        data {
          attributes {
            author {
              data {
                attributes {
                  name
                  bio
                  photo {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
            slug
            title
            content
            createdAt
            excerpt
            featuredImage {
              data {
                attributes {
                  url
                }
              }
            }
            categories {
              data {
                attributes {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, {
    slug,
  });
  return result.posts.data;
};
export const getCategoryPost = async (slug) => {
  const query = gql`
  query GetCategoryPost($slug: String!) {
    posts(filters: {categories: {slug: {eq:$slug}}}) {
      data {
        attributes {
          author {
            data{attributes{
            bio
            name
            photo {
              data{attributes{
              url
              }}}
            }}}
          createdAt
          slug
          title
          excerpt
          featuredImage {data{attributes{
            url
          }}}
          categories {
            data{attributes{
            name
            slug
            }}}
        }
      }
    }
  }`
  const result = await request(graphqlAPI, query, { slug });

  return result.posts.data;
 } ;
export const getFeaturedPosts = async (slug) => {
  const query = gql`
    query GetCategoryPost {
      posts(filters: { featuredPost: { eq: true} }) {
        data {
          attributes {
            author {
              data {
                attributes {
                  name
                  bio
                  photo {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                }
              }
            }
            slug
            title
            createdAt
            featuredImage {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;
  const result = await request(graphqlAPI, query, {
    slug,
  });
  return result.posts.data;
};
export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
  query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
    next: posts(
      sort: "createdAt:asc"
      filters: { slug: { ne: $slug }, and: { createdAt: { gte: $createdAt } } }
    ) {
      data {
        attributes {
          title
          featuredImage {
            data{attributes{
            url
          }}}
          createdAt
          slug
        }
      }
    }
    previous: posts(
      sort: "createdAt:desc"
      filters: { slug:{ne: $slug}, and: { createdAt:{lte: $createdAt} } }
    ) {
      data {
        attributes {
          title
          featuredImage {
            data{attributes{
            url
          }}}
          createdAt
          slug
        }
      }
    }
  }
  `;

  const result = await request(graphqlAPI, query, { slug, createdAt });

  return { next: result.next.data[0], previous: result.previous.data[0] };
};

export const getRecentPosts = async () => {
  const query = gql`
  query GetPostDetails {
    posts(sort: "createdAt:asc",pagination:{limit:3}) {
      data {
        attributes {
          title
          createdAt
          slug
          featuredImage {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
  `;
  const result = await request(graphqlAPI, query);
  return result.posts.data;
};
export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
  query($slug: String!, $categories: [String!]) {
    posts(
      pagination: { limit: 3 }
      filters: {
        slug: { ne: $slug }
        and: { categories: { slug: { in: $categories } } }
      }
    ) {
      data {
        attributes {
          title
          featuredImage {
            data {
              attributes {
                url
              }
            }
          }
          createdAt
          slug
        }
      }
    }
  }
  
  `;
  const result = await request(graphqlAPI, query, {
    categories,
    slug,
  });
  return result.posts.data;
};

export const submitComment = async (obj) => {
  const result = await fetch("/api/comments",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"},
    body:JSON.stringify(obj)
  })
  return result.json();
}

export const getComments = async (slug) => {
  const query = gql`
  query GetComments($slug: String!) {
    comments(filters: {
       post: { slug: { eq: $slug } } 
    }) {
      data {
        attributes {
          name
          createdAt
          comment
        }
      }
    }
  }
  `;
  const result = await request(graphqlAPI, query,{slug});
  return result.comments.data;
};

export const getPostId = async (slug) => {
  const query = gql`
  query GetId($slug: String!) {
    posts(filters: { slug: { eq: $slug } }) {
      data {
      id
      }
    }
  }
  `;
  const result = await request(graphqlAPI, query,{slug});
  return result.posts.data;
};

