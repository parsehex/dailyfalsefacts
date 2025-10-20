import { getCollection } from "astro:content";
import postFilter from "@/utils/postFilter";
import { getPath } from "@/utils/getPath";

export async function GET() {
  const posts = await getCollection("blog");
  const publishedPosts = posts.filter(postFilter);

  const postPaths = publishedPosts.map(post => getPath(post.id, post.filePath));

  return new Response(JSON.stringify(postPaths), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
