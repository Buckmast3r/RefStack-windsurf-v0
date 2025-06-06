// Placeholder for subscription utilities or types
// Add actual logic if needed by your business logic

export function isSubscriptionActive(subscription: { status: string }): boolean {
  return subscription?.status === 'active';
}

export interface Subscription {
  id: string;
  status: string;
  plan: string;
  // Add more fields as needed
}

// Stub for checkPlanFeature - replace with real logic
export async function checkPlanFeature(userId: string, feature: string): Promise<boolean> {
  // TODO: Implement real feature check logic
  return true;
}
