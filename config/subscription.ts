const TRIAL_STORE_LIMIT: number = 1;
const TRIAL_PRODUCT_LIMIT: number = 50;

export { TRIAL_STORE_LIMIT, TRIAL_PRODUCT_LIMIT };

export const subscriptionPlans: { plan: string; data: {} }[] = [
  {
    plan: "yearly",
    data: {
      price_data: {
        currency: "usd",
        product_data: {
          name: "Profit Tracker Pro",
          description:
            "Create up to 3 stores, add unlimited products, and get access to all new features.",
        },
        unit_amount: 9795,
        recurring: {
          interval: "year",
        },
      },
      quantity: 1,
    },
  },
  {
    plan: "monthly",
    data: {
      price_data: {
        currency: "usd",
        product_data: {
          name: "Profit Tracker Pro",
          description:
            "Create up to 3 stores, add unlimited products, and get access to all new features.",
        },
        unit_amount: 997,
        recurring: {
          interval: "month",
        },
      },
      quantity: 1,
    },
  },
];
