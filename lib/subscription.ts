import { auth } from "@clerk/nextjs";

import prismadb from "./prismadb";
import { TRIAL_STORE_LIMIT, TRIAL_PRODUCT_LIMIT } from "@/config/subscription";

const DAY_IN_MS = 86_400_000;

export const checkRemainingTrialStores = async () => {
  const { userId } = auth();

  if (!userId) return false;

  const userTrial = await prismadb.userTrial.findUnique({
    where: { userId },
  });

  if (!userTrial) {
    await prismadb.userTrial.create({
      data: {
        userId,
        storesRemaining: TRIAL_STORE_LIMIT,
        productsRemaining: TRIAL_PRODUCT_LIMIT,
      },
    });

    return true;
  }

  const storesRemaining = userTrial.storesRemaining;

  const isValidTrial = storesRemaining > 0;

  return isValidTrial;
};

export const checkRemainingTrialProducts = async () => {
  const { userId } = auth();

  if (!userId) return false;

  const userTrial = await prismadb.userTrial.findUnique({
    where: { userId },
  });

  if (!userTrial) {
    await prismadb.userTrial.create({
      data: {
        userId,
        storesRemaining: TRIAL_STORE_LIMIT,
        productsRemaining: TRIAL_PRODUCT_LIMIT,
      },
    });

    return true;
  }

  const productsRemaining = userTrial.productsRemaining;

  const isValidTrial = productsRemaining > 0;

  return isValidTrial;
};

export const getRemainingTrialProducts = async (): Promise<number> => {
  const { userId } = auth();

  if (!userId) return 0;

  const userTrial = await prismadb.userTrial.findUnique({
    where: { userId },
  });

  if (!userTrial) {
    await prismadb.userTrial.create({
      data: {
        userId,
        storesRemaining: TRIAL_STORE_LIMIT,
        productsRemaining: TRIAL_PRODUCT_LIMIT,
      },
    });

    return TRIAL_PRODUCT_LIMIT;
  }

  const productsRemaining = userTrial.productsRemaining;

  return productsRemaining;
};

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) return false;

  const userSubscription = await prismadb.userSubscription.findUnique({
    where: { userId },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!userSubscription) return false;

  const isValidSubscription =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
      Date.now();

  return !!isValidSubscription;
};
