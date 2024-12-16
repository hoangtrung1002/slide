"use server";

import { client } from "@/lib/prisma";

export const updateIntegration = async (
  token: string,
  expire: Date,
  id: string,
) => {
  return client.integrations.update({
    where: { id },
    data: { token, expiresAt: expire },
  });
};
