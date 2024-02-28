import { z } from 'zod';

//* =============================================
//*                ZOD SCHEMAS                  =
//*==============================================
export const PostCategorySchema = z.enum(['articles', 'notes', 'snippets']);

export const PostTopicSchema = z.enum([
  'Accessibility',
  'AI',
  'Animation',
  'CSS',
  'Databases',
  'Git',
  'HTML',
  'JavaScript',
  'NextJS',
  'Performance',
  'React',
  'State',
  'Tailwind',
  'Testing',
  'TypeScript',
]);

const PostMetaSchema = z.object({
  slug: z.string().trim().min(1),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  created: z.string().trim().min(1),
  updated: z.string().trim().min(1),
  category: PostCategorySchema,
  topics: z.array(PostTopicSchema),
});

const PostSchema = z.object({
  content: z.string().trim().min(1),
  meta: PostMetaSchema,
});

const ProjectMetaSchema = z.object({
  slug: z.string().trim().min(1),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  created: z.string().trim().min(1),
  updated: z.string().trim().min(1),
  imgUrl: z.string().trim().min(1),
  imgAlt: z.string().trim().min(1),
  gradient: z.string().trim().min(1),
});

const ProjectSchema = z.object({
  content: z.string().trim().min(1),
  meta: ProjectMetaSchema,
});

//* =============================================
//*                   TYPES                     =
//*==============================================
export type PostCategory = z.infer<typeof PostCategorySchema>;

export type PostTopic = z.infer<typeof PostTopicSchema>;

export type PostMeta = z.infer<typeof PostMetaSchema>;

export type Post = z.infer<typeof PostSchema>;

export type ProjectMeta = z.infer<typeof ProjectMetaSchema>;

export type Project = z.infer<typeof ProjectSchema>;
