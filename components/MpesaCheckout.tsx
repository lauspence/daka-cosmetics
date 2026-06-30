"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Smartphone, CheckCircle2, XCircle } from "lucide-react";
import { useCart, type CartItem } from "@/components/CartProvider";

interface MpesaCheckoutProps {
  items: CartItem[];
  totalPrice: number;
}

type Stage = "idle" | "submitting" | "pending" | "success" | "failed" | "error";

const POLL_INTERVAL_MS = 3000;
const POLL_TIMEOUT_MS = 90_000;

export default function MpesaCheckout({ items, totalPrice }: MpesaCheckoutProps) {
  const { clear } = useCart();
  const [phone, setPhone] = useState("");
  const [stage, setStage] = useState<Stage>("idle");
  const [message, setMessage] = useState("");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  function stopPolling() {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }

  function pollStatus(checkoutRequestId: string) {
    const startedAt = Date.now();
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(
          `/api/mpesa/status?checkoutRequestId=${encodeURIComponent(checkoutRequestId)}`
        );
        const data = await res.json();

        if (data.status === "success") {
          stopPolling();
          setStage("success");
          setMessage(
            data.receiptNumber ? `Receipt: ${data.receiptNumber}` : "Payment received."
          );
          clear();
        } else if (data.status === "failed") {
          stopPolling();
          setStage("failed");
          setMessage(data.resultDesc || "Payment was not completed.");
        } else if (Date.now() - startedAt > POLL_TIMEOUT_MS) {
          stopPolling();
          setStage("error");
          setMessage("Didn't get confirmation in time. Check your phone, or try again.");
        }
      } catch {
        // transient network hiccup — keep polling until the timeout above
      }
    }, POLL_INTERVAL_MS);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStage("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/mpesa/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          amount: totalPrice,
          items: items.map((i) => ({
            productId: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
          })),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStage("error");
        setMessage(data.error || "Couldn't start the payment. Please try again.");
        return;
      }

      setStage("pending");
      pollStatus(data.checkoutRequestId);
    } catch {
      setStage("error");
      setMessage("Couldn't reach the payment service. Please try again.");
    }
  }

  if (stage === "success") {
    return (
      <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
        <CheckCircle2 size={18} />
        <span>Payment received! {message}</span>
      </div>
    );
  }

  const busy = stage === "submitting" || stage === "pending";

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
      <label className="text-xs font-semibold uppercase tracking-widest text-outline">
        Pay with M-Pesa
      </label>
      <div className="flex flex-wrap gap-2">
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="07XX XXX XXX"
          disabled={busy}
          className="flex-1 rounded-lg border border-primary/20 bg-white px-4 py-3 text-ink focus:border-primary focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white shadow transition hover:opacity-90 disabled:opacity-60"
        >
          {busy && <Loader2 size={16} className="animate-spin" />}
          {stage === "pending"
            ? "Check your phone"
            : stage === "submitting"
              ? "Sending..."
              : "Pay Now"}
        </button>
      </div>
      {stage === "pending" && (
        <p className="flex items-center gap-2 text-sm text-outline">
          <Smartphone size={14} />
          Enter your M-Pesa PIN on your phone to complete the payment.
        </p>
      )}
      {(stage === "failed" || stage === "error") && (
        <p className="flex items-center gap-2 text-sm text-red-600">
          <XCircle size={14} />
          {message}
        </p>
      )}
    </form>
  );
}
