import { GraphQLClient, gql } from 'graphql-request';
import { useEffect, useState } from 'react';
import { getPostId } from '../../services';
import NextCors from 'nextjs-cors';
const graphqlAPI = process.env.NEXT_PUBLIC_ENDPOINT || "http://89.116.228.21:1337";
const token = process.env.NEXT_API_TOKEN

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
/** *************************************************************
* Any file inside the folder pages/api is mapped to /api/* and  *
* will be treated as an API endpoint instead of a page.         *
*************************************************************** */
//const [postId,setPostId] = useState("");

// useEffect(() => {
//   if (slug) {
//     getPostId(slug).then((result) => {
//       setPostId(result);
//     });
//   } else {
//     console.log("error");
//   }
// }, [slug]);

// export a default function for API route to work
export default async function asynchandler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
  console.log({token})
  const graphQLClient = new GraphQLClient(("http://89.116.228.21:1337"), {
    headers: {
      authorization: `Bearer ${token}`,
    },
    
  });

  const query = gql`
  mutation CreateComment(
    $name: String!
    $email: String!
    $comment: String!
    $slug: ID
  ) {
    createComment(
      data: { name: $name, email: $email, comment: $comment, post: $slug }
    ) {
     data{id}
    }
  }
  
  `;

  try{
    const result = await graphQLClient.request(query, {
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment,
      slug: req.body.slug,
    });
  
    return res.status(200).send(result);
  }catch(err){
    console.log(err)
    return res.status(500).send(err);
  }


  
}
 






// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
