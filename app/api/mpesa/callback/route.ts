import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface CallbackItem {
  Name: string;
  Value?: string | number;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const callback = body?.Body?.stkCallback;

  // Always acknowledge — Safaricom retries on non-2xx / unexpected bodies.
  if (!callback?.CheckoutRequestID) {
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
  }

  const success = callback.ResultCode === 0;
  const items: CallbackItem[] = callback.CallbackMetadata?.Item ?? [];
  const receipt = items.find((i) => i.Name === "MpesaReceiptNumber")?.Value;

  const supabase = createAdminClient();
  await supabase
    .from("mpesa_transactions")
    .update({
      status: success ? "success" : "failed",
      result_desc: callback.ResultDesc,
      mpesa_receipt_number: receipt ? String(receipt) : null,
      updated_at: new Date().toISOString(),
    })
    .eq("checkout_request_id", callback.CheckoutRequestID);

  return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
