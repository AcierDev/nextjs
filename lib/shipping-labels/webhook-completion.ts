import type { FutureLabelTrackerUpdateResult } from "./webhook";
import type { Tracker } from "@/typings/types";
import { SHIPPED_TRACKER_STATUSES } from "./status";

export type TrackerCompletionDeps = {
  applyFutureLabelUpdate: (
    tracker: Tracker
  ) => Promise<FutureLabelTrackerUpdateResult>;
  evaluateFutureLabelCompletion: (
    orderId: string
  ) => Promise<boolean | null>;
  completeLegacyOrder: (orderId: string) => Promise<boolean>;
};

export async function processTrackerCompletion(
  tracker: Tracker,
  compatibilityOrderId: string | null,
  deps: TrackerCompletionDeps
): Promise<string | null> {
  const futureUpdate = await deps.applyFutureLabelUpdate(tracker);
  const orderId = futureUpdate.orderId ?? compatibilityOrderId;
  if (!orderId) return null;

  const futureCompletion = futureUpdate.orderId
    ? futureUpdate.completion
    : await deps.evaluateFutureLabelCompletion(orderId);

  if (futureCompletion !== null) {
    return futureCompletion ? orderId : null;
  }

  if (!SHIPPED_TRACKER_STATUSES.has(tracker.status)) return null;
  return (await deps.completeLegacyOrder(orderId)) ? orderId : null;
}
