import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Post } from "../domain/post.ts";
import { Posts } from "../resources/data.ts";

const getPosts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    length: Posts.length,
    data: Posts,
  };
};

const getPostById = (
  {
    params,
    response,
  }: {
    params: { id: string };
    response: any;
  },
) => {
  const selectedPost: Post | undefined = Posts.find((post) =>
    post.id === params.id
  );

  if (selectedPost) {
    response.status = 200;

    response.body = {
      success: true,
      data: selectedPost,
    };
  } else {
    response.status = 404;

    response.body = {
      success: false,
      msg: "Post Not Found !",
    };
  }
};

const addPost = async (
  {
    request,
    response,
  }: {
    request: any;
    response: any;
  },
) => {
  if (!request.hasBody) {
    response.status = 400;

    response.body = {
      success: false,
      msg: "No Data !",
    };
  } else {
    const { value : postBody } = await request.body();

    const post: Post = postBody;

    post.id = v4.generate();

    Posts.push(post);

    response.status = 201;

    response.body = {
      success: true,
      data: post,
    };
  }
};

const updatePost = async (
  {
    params,
    request,
    response,
  }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  const requestedPost: Post | undefined = Posts.find(
    (post: Post) => post.id === params.id,
  );

  if (requestedPost) {
    const { value : updatedPostBody } = await request.body();

    const updatedPosts: Array<Post> = Posts.map(
      (post: Post) => {
        if (post.id === params.id) {
          return {
            ...post,
            ...updatedPostBody,
          };
        } else {
          return post;
        }
      },
    );

    Posts.splice(0, Posts.length);

    Posts.push(...updatedPosts);

    response.status = 200;

    response.body = {
      success: true,
      msg: `Post ID ${params.id} Updated.`,
    };
  } else {
    response.status = 404;

    response.body = {
      success: false,
      msg: `Not Found !`,
    };
  }
};

const deletePost = (
  {
    params,
    response,
  }: {
    params: { id: string };
    response: any;
  },
) => {
  const filteredPosts: Array<Post> = Posts.filter(
    (post: Post) => (post.id !== params.id),
  );

  if (filteredPosts.length === Posts.length) {
    response.status = 404;
    response.body = {
      success: false,
      msg: "Not Found !",
    };
  } else {
    Posts.splice(0, Posts.length);

    Posts.push(...filteredPosts);

    response.status = 200;

    response.body = {
      success: true,
      msg: `Post With ID ${params.id} Has Been Deleted.`,
    };
  }
};

export {
  getPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
};
