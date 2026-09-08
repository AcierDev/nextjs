import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import React, { createElement } from "react";
import TestRenderer, {
  act,
  type ReactTestInstance,
  type ReactTestRenderer,
} from "react-test-renderer";

import type { ViewLabel as ViewLabelComponent } from "../components/shipping/ViewLabel";
import type { useShippingStore as ShippingStoreHook } from "../stores/useShippingStore";

const FUTURE_ORDER_ID = "future-order";
const EMPTY_ORDER_ID = "empty-order";
const ONE_LABEL = 1;
const ZERO_LABELS = 0;
const NOT_FOUND_INDEX = -1;

const originalFetch = globalThis.fetch;
let ViewLabel: typeof ViewLabelComponent;
let useShippingStore: typeof ShippingStoreHook;

function buttonByLabel(
  renderer: ReactTestRenderer,
  label: string
): ReactTestInstance {
  const button = renderer.root.findAllByType("button").find((candidate) =>
    candidate
      .findAllByType("span")
      .some((span) => span.children.join("") === label)
  );
  assert.ok(button, `Missing button label: ${label}`);
  return button;
}

before(async () => {
  globalThis.fetch = async (input) => {
    const url = String(input);
    const body = url.includes("/summary")
      ? { summaries: {} }
      : url.includes("/labels?")
        ? { labels: [] }
        : { files: [] };
    return new Response(JSON.stringify(body), {
      headers: { "Content-Type": "application/json" },
    });
  };
  (globalThis as typeof globalThis & { React: typeof React }).React = React;

  ({ ViewLabel } = await import("../components/shipping/ViewLabel"));
  ({ useShippingStore } = await import("../stores/useShippingStore"));
  useShippingStore.getState().stopPolling();
  await new Promise<void>((resolve) => setImmediate(resolve));
});

after(() => {
  useShippingStore.getState().stopPolling();
  globalThis.fetch = originalFetch;
});

test("future-only orders can open the label view without an empty warning", async () => {
  useShippingStore.setState({
    labels: {},
    futureSummaries: {
      [FUTURE_ORDER_ID]: {
        total: ONE_LABEL,
        unused: ZERO_LABELS,
        used: ONE_LABEL,
        issues: ZERO_LABELS,
      },
    },
    isLoading: false,
    fetchAllLabels: async () => undefined,
  });

  let renderer: ReactTestRenderer;
  await act(async () => {
    renderer = TestRenderer.create(
      createElement(ViewLabel, { orderId: FUTURE_ORDER_ID })
    );
  });

  assert.equal(buttonByLabel(renderer!, "View Labels").props.disabled, false);
  assert.equal(
    renderer!.root.findAll(
      (node) => node.children.indexOf("No Labels Found") !== NOT_FOUND_INDEX
    ).length,
    ZERO_LABELS
  );
  assert.equal(
    renderer!.root.findAll((node) => Boolean(node.props.style?.height)).length,
    ZERO_LABELS
  );
  act(() => renderer!.unmount());
});

test("orders without any labels keep the label view disabled", async () => {
  useShippingStore.setState({
    labels: {},
    futureSummaries: {},
    isLoading: false,
    fetchAllLabels: async () => undefined,
  });

  let renderer: ReactTestRenderer;
  await act(async () => {
    renderer = TestRenderer.create(
      createElement(ViewLabel, { orderId: EMPTY_ORDER_ID })
    );
  });

  assert.equal(buttonByLabel(renderer!, "View Labels").props.disabled, true);
  act(() => renderer!.unmount());
});
