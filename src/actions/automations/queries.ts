"use server";

import { client } from "@/lib/prisma";

export const createAutomation = async (clerkId: string, id?: string) => {
  return client.user.update({
    where: { clerkId },
    data: {
      automations: {
        create: { ...(id && { id }) },
      },
    },
  });
};

export const getAutomations = async (clerkId: string) => {
  return client.user.findUnique({
    where: { clerkId },
    select: {
      automations: {
        orderBy: { createdAt: "asc" },
        include: { keywords: true, listener: true },
      },
    },
  });
};

export const findAutomation = async (id: string) => {
  return client.automation.findUnique({
    where: { id },
    include: {
      keywords: true,
      trigger: true,
      posts: true,
      listener: true,
      User: { select: { subscription: true, integrations: true } },
    },
  });
};

export const updateAutomation = async (
  id: string,
  update: { name?: string; active?: boolean },
) => {
  return client.automation.update({
    where: { id },
    data: { name: update.name },
  });
};

export const addListener = async (
  automationId: string,
  listener: "MESSAGE" | "SMARTAI",
  prompt: string,
  reply?: string,
) => {
  return client.automation.update({
    where: { id: automationId },
    data: { listener: { create: { listener, prompt, commentReply: reply } } },
  });
};

export const addTrigger = async (automationId: string, triggers: string[]) => {
  if (triggers.length === 2) {
    return client.automation.update({
      where: { id: automationId },
      data: {
        trigger: {
          createMany: { data: [{ type: triggers[0] }, { type: triggers[1] }] },
        },
      },
    });
  }
  return client.automation.update({
    where: { id: automationId },
    data: { trigger: { create: { type: triggers[0] } } },
  });
};
