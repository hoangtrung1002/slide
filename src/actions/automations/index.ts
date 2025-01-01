"use server";

import { onCurrentUser } from "@/actions/user";
import {
  addKeyword,
  addListener,
  addPost,
  addTrigger,
  createAutomation,
  deleteKeywordQuery,
  findAutomation,
  getAutomations,
  updateAutomation,
} from "@/actions/automations/queries";
import { findUser } from "@/actions/user/queries";
import { PostType } from "@/constant/automation";

export const createAutomations = async (id?: string) => {
  const user = await onCurrentUser();
  try {
    const create = await createAutomation(user!.id, id);
    if (create) return { status: 200, data: "Automation created" };
    return { status: 404, data: "Oops! Something went wrong" };
  } catch (error) {
    return { status: 500, data: "Internal Server Error" };
  }
};

export const getAllAutomations = async () => {
  const user = await onCurrentUser();
  try {
    const automations = await getAutomations(user!.id);
    if (automations) return { status: 200, data: automations.automations };
    return { status: 404, data: [] };
  } catch (error) {
    return { status: 500, data: [] };
  }
};

export const getAutomationInfo = async (id: string) => {
  await onCurrentUser();
  try {
    const automation = await findAutomation(id);
    if (automation) return { status: 200, data: automation };
    return { status: 404 };
  } catch (error) {
    return { status: 500 };
  }
};

export const updateAutomationName = async (
  automationId: string,
  data: { name?: string; active?: boolean; automation?: string },
) => {
  await onCurrentUser();
  try {
    const update = await updateAutomation(automationId, data);
    if (update) return { status: 200, data: "Automation successfully updated" };
    return { status: 404, data: "Oops! Could not find automation" };
  } catch (error) {
    return { status: 500, data: "Oops! Something went wrong" };
  }
};

export const saveListener = async (
  automationId: string,
  listener: "MESSAGE" | "SMARTAI",
  prompt: string,
  reply?: string,
) => {
  await onCurrentUser();
  try {
    const create = await addListener(automationId, listener, prompt, reply);
    if (create) return { status: 200, data: "Listener created" };
    return { status: 404, data: "Can not save listener" };
  } catch (error) {
    return { status: 500, data: "Oops! Something went wrong" };
  }
};

export const saveTrigger = async (automationId: string, triggers: string[]) => {
  await onCurrentUser();
  try {
    const create = await addTrigger(automationId, triggers);
    if (create) return { status: 200, data: "Trigger saved" };
    return { status: 404, data: "Can not save trigger" };
  } catch (error) {
    return { status: 500, data: "Oops! Something went wrong" };
  }
};

export const saveKeyword = async (automationId: string, keyword: string) => {
  await onCurrentUser();
  try {
    const create = await addKeyword(automationId, keyword);
    if (create) return { status: 200, data: "Keyword added successfully" };
    return { status: 404, data: "Can not add this keyword" };
  } catch (error) {
    return { status: 500, data: "Oops! Something went wrong" };
  }
};

export const deleteKeyword = async (id: string) => {
  await onCurrentUser();
  try {
    const deleted = await deleteKeywordQuery(id);
    if (deleted) return { status: 200, data: "Keyword deleted" };
    return { status: 404, data: "Keyword not found" };
  } catch (error) {
    return { status: 500, data: "Oops! Something went wrong" };
  }
};

export const getProfilePosts = async () => {
  const user = await onCurrentUser();
  try {
    const profile = await findUser(user!.id);
    const posts = await fetch(
      `${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_url,media_type,timestamp&limit=10&access_token=${profile?.integrations[0].token}`,
    );
    const parsed = await posts.json();
    if (parsed) return { status: 200, data: parsed };
    console.log("🔴 Error in getting posts");
    return { status: 404 };
  } catch (error) {
    console.log("🔴 server side Error in getting posts ", error);
    return { status: 500 };
  }
};

export const savePosts = async (automationId: string, posts: PostType[]) => {
  await onCurrentUser();
  try {
    const create = await addPost(automationId, posts);

    if (create) return { status: 200, data: "Posts attached" };

    return { status: 404, data: "Automation not found" };
  } catch (error) {
    return { status: 500, data: "Oops! something went wrong" };
  }
};
