import type {
  ShippingLabelCategory,
  ShippingLabelRecord,
} from "@/types/shipping-labels";
import type { TrackerStatus } from "@/typings/types";

// Only positive shipping statuses prove the carrier has the package.
// A newly created tracker may be unknown until carrier data arrives.
export const SHIPPED_TRACKER_STATUSES: ReadonlySet<TrackerStatus> = new Set([
  "in_transit",
  "out_for_delivery",
  "delivered",
  "available_for_pickup",
]);

type ClassifiableShippingLabel = Pick<
  ShippingLabelRecord,
  "processingStatus" | "tracker"
>;

export function classifyShippingLabel(
  record: ClassifiableShippingLabel
): ShippingLabelCategory {
  if (record.processingStatus !== "ready" || !record.tracker) {
    return "issues";
  }

  if (record.tracker.status === "pre_transit") return "unused";
  return SHIPPED_TRACKER_STATUSES.has(record.tracker.status) ? "used" : "issues";
}

export function canCompleteFutureLabelOrder(
  records: ClassifiableShippingLabel[]
): boolean {
  return (
    records.length > 0 &&
    records.every((record) => classifyShippingLabel(record) === "used")
  );
}

export function isShippingLabelPrintable(
  record: ClassifiableShippingLabel
): boolean {
  const category = classifyShippingLabel(record);
  return category === "unused" || category === "used";
}
