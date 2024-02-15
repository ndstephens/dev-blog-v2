import fs from 'fs/promises';
import fg from 'fast-glob';
import matter from 'gray-matter';
import { z } from 'zod';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import { notFound } from 'next/navigation';

import { components } from '@/components/mdxCustomComponents';

import nightOwl from '@/lib/code-themes/nightOwl.json';

import {
  PostCategory,
  PostCategorySchema,
  PostMeta,
  PostTopic,
  PostTopicSchema,
} from './types';

type PostType = 'blog' | 'project' | 'all';

const BLOG_PATH = 'posts/blog';
const PROJECT_PATH = 'posts/projects';

//* =============================================
//*               BLOG PREVIEW                  =
//*==============================================
// GET POST PREVIEWS
export const getPostPreviews = async (
  category: PostCategory | 'all',
  topic?: PostTopic,
) => {
  const postPreviews =
    category === 'all'
      ? await getAllPostPreviews()
      : await getPostPreviewsByCategory(category);
  if (topic) {
    return filterPostPreviewsByTopic(postPreviews, topic);
  }
  return postPreviews;
};

// GET ALL POST PREVIEWS
const getAllPostPreviews = async () => {
  const allPostPaths = await getAllPostPaths('blog');
  const allPostPreviews = await getPostPreviewsFromPathList(allPostPaths);
  const allPostPreviewsSorted = allPostPreviews.sort(sortPreviewsByDate);
  return allPostPreviewsSorted;
};

// GET POST PREVIEWS BY CATEGORY
const getPostPreviewsByCategory = async (category: PostCategory) => {
  const postPathsByCategory = await getPostPathsByPostCategory(category);
  const postPreviewsByCategory =
    await getPostPreviewsFromPathList(postPathsByCategory);
  const postPreviewsByCategorySorted =
    postPreviewsByCategory.sort(sortPreviewsByDate);
  return postPreviewsByCategorySorted;
};

// GET POST PREVIEWS FROM PATH LIST
const getPostPreviewsFromPathList = async (pathList: string[]) => {
  const postPreviews = await Promise.all(pathList.map(getPostPreviewFromPath));
  return postPreviews;
};

// GET POST PREVIEW FROM PATH
const getPostPreviewFromPath = async (postPath: string) => {
  const slug = getSlugFromPath(postPath);
  const source = await fs.readFile(postPath, 'utf-8');
  const { frontmatter } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
    },
  });

  try {
    return parsePostFrontmatter(frontmatter, slug);
  } catch (err) {
    throw err;
  }
};

// SORT PREVIEWS BY DATE - RECENT FIRST
const sortPreviewsByDate = (
  a: Pick<PostMeta, 'created'>,
  b: Pick<PostMeta, 'created'>,
) => {
  if (a.created < b.created) return 1;
  if (a.created > b.created) return -1;
  return 0;
};

// GET ALL POST TOPICS IN USE
export const getAllPostTopicsInUse = async (category: PostCategory | 'all') => {
  const postPreviews =
    category === 'all'
      ? await getAllPostPreviews()
      : await getPostPreviewsByCategory(category);

  return [
    ...new Set<PostTopic>(
      postPreviews.map((postMeta) => postMeta.topics).flat(),
    ),
  ].sort();
};

// FILTER POSTS BY TOPIC
export const filterPostPreviewsByTopic = (
  postPreviews: PostMeta[],
  topic: PostTopic,
) => postPreviews.filter((postPreview) => postPreview.topics.includes(topic));

//* =============================================
//*              PROJECT PREVIEW                =
//*==============================================
// GET ALL PROJECT PREVIEWS
export const getAllProjectPreviews = async () => {
  const allProjectPaths = await getAllPostPaths('project');
  const allProjectPreviews =
    await getProjectPreviewsFromPathList(allProjectPaths);
  const allProjectPreviewsSorted = allProjectPreviews.sort(sortPreviewsByDate);
  return allProjectPreviewsSorted;
};

// GET PROJECT PREVIEWS FROM PATH LIST
const getProjectPreviewsFromPathList = async (pathList: string[]) => {
  const projectPreviews = await Promise.all(
    pathList.map(getProjectPreviewFromPath),
  );
  return projectPreviews;
};

// GET PROJECT PREVIEW FROM PATH
const getProjectPreviewFromPath = async (projectPath: string) => {
  const slug = getSlugFromPath(projectPath);
  const source = await fs.readFile(projectPath, 'utf-8');
  // const projectData = matter(source);
  const { frontmatter } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
    },
  });

  try {
    // return parsePost(postData, slug).meta;
    return parseProjectFrontmatter(frontmatter, slug);
  } catch (err) {
    throw err;
  }
};

//* =============================================
//*                 BLOG POST                   =
//*==============================================
// GET BLOG FROM SLUG
export const getPostFromSlug = async (slug: string) => {
  const allBlogPaths = await getAllPostPaths('blog');
  const blogPath = allBlogPaths.find((path) => path.endsWith(`${slug}.mdx`));
  if (!blogPath) {
    return notFound();
  }
  const blog = await getPostFromPath(blogPath);
  return blog;
};

// GET BLOG FROM PATH
const getPostFromPath = async (blogPath: string) => {
  const slug = getSlugFromPath(blogPath);
  const source = await fs.readFile(blogPath, 'utf-8');
  const { content: contentString, data } = matter(source);
  const { content, frontmatter } = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: true,
      scope: parsePostFrontmatter(data, slug),
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
          [
            rehypePrettyCode,
            {
              theme: nightOwl,
              // theme: {
              //   dark: nightOwl,
              //   light: lightOwl,
              // },
              // keepBackground: true,
              onVisitHighlightedLine(node: any) {
                node.properties.className.push('line--highlighted');
              },
              onVisitHighlightedWord(node: any) {
                node.properties.className = ['word'];
              },
            },
          ],
          rehypeAccessibleEmojis,
        ],
      },
    },
  });

  try {
    return {
      contentString,
      content,
      meta: parsePostFrontmatter(frontmatter, slug),
    };
  } catch (err) {
    throw err;
  }
};

//* =============================================
//*               PROJECT POST                  =
//*==============================================
// GET PROJECT FROM SLUG
export const getProjectFromSlug = async (slug: string) => {
  const allProjectPaths = await getAllPostPaths('project');
  const projectPath = allProjectPaths.find((path) =>
    path.endsWith(`${slug}.mdx`),
  );
  if (!projectPath) {
    return notFound();
  }
  const project = await getProjectFromPath(projectPath);
  return project;
};

// GET PROJECT FROM PATH
const getProjectFromPath = async (projectPath: string) => {
  const slug = getSlugFromPath(projectPath);
  const source = await fs.readFile(projectPath, 'utf-8');
  const { content, frontmatter } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      // mdxOptions: {
      //   remarkPlugins: [remarkGfm],
      // },
    },
  });

  try {
    return {
      content,
      meta: parseProjectFrontmatter(frontmatter, slug),
    };
  } catch (err) {
    throw err;
  }
};

//* =============================================
//*                POST PATH                    =
//*==============================================
// GET ALL POST PATHS
const getAllPostPaths = async (postType: PostType) => {
  if (postType === 'blog') {
    return fg(`${BLOG_PATH}/**/*.mdx`);
  }
  if (postType === 'project') {
    return fg(`${PROJECT_PATH}/**/*.mdx`);
  }
  const allPaths = await Promise.all([
    fg(`${BLOG_PATH}/**/*.mdx`),
    fg(`${PROJECT_PATH}/**/*.mdx`),
  ]);
  return allPaths.flat();
};

// GET BLOG POST PATHS BY CATEGORY
const getPostPathsByPostCategory = async (category: PostCategory) => {
  const pathList = await fg(`${BLOG_PATH}/${category}/**/*.mdx`);
  return pathList;
};

//* =============================================
//*                POST SLUG                    =
//*==============================================
// GET SLUG FROM PATH
const getSlugFromPath = (postPath: string) => {
  const pathParts = postPath.split('/');
  const fileName = pathParts[pathParts.length - 1];
  const slug = fileName.split('.')[0];
  return slug;
};

// GET ALL SLUGS
export const getAllSlugs = async (postType: PostType) => {
  const allPostPaths = await getAllPostPaths(postType);
  const slugs = allPostPaths.map((postPath) => getSlugFromPath(postPath));
  return slugs;
};

//* =============================================
//*               POST FRONTMATTER              =
//*==============================================
const RawPostFrontmatter = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  created: z.date().transform((date) => date.toISOString()),
  updated: z.date().transform((date) => date.toISOString()),
  category: PostCategorySchema,
  topics: z.array(PostTopicSchema).min(1),
});

const parsePostFrontmatter = (rawFrontmatter: unknown, slug: string) => {
  const frontmatter = RawPostFrontmatter.parse(rawFrontmatter);
  return {
    slug,
    ...frontmatter,
  };
};

//* =============================================
//*             PROJECT FRONTMATTER             =
//*==============================================
const RawProjectFrontmatter = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  created: z.date().transform((date) => date.toISOString()),
  updated: z.date().transform((date) => date.toISOString()),
  imgUrl: z.string().trim().min(1),
  imgAlt: z.string().trim().min(1),
  gradient: z.string().trim().min(1),
});

const parseProjectFrontmatter = (rawFrontmatter: unknown, slug: string) => {
  const frontmatter = RawProjectFrontmatter.parse(rawFrontmatter);
  return {
    slug,
    ...frontmatter,
  };
};
