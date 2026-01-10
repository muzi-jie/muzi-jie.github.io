import type { CollectionEntry } from "astro:content";
import { SITE } from "@/config";

const CHINA_OFFSET = 8 * 60 * 60 * 1000;

const postFilter = ({ data }: CollectionEntry<"blog">) => {
  // 草稿永远不显示
  if (data.draft) return false;
  
  // 默认：不定时发布（立即显示）
  if (!data.scheduled) return true;
  
  const isPublishTimePassed =
    Date.now()+ CHINA_OFFSET >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export default postFilter;
