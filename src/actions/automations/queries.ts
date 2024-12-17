"use server";

import { client } from "@/lib/prisma";

export const createAutomation = async (clerkId: string) => {
  return client.user.update({
    where: { clerkId },
    data: { automations: { create: {} } },
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
