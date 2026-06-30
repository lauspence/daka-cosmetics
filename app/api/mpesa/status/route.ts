import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(request: NextRequest) {
  const checkoutRequestId = request.nextUrl.searchParams.get("checkoutRequestId");
  if (!checkoutRequestId) {
    return NextResponse.json({ error: "Missing checkoutRequestId" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("mpesa_transactions")
    .select("status, result_desc, mpesa_receipt_number")
    .eq("checkout_request_id", checkoutRequestId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
  }

  return NextResponse.json({
    status: data.status,
    resultDesc: data.result_desc,
    receiptNumber: data.mpesa_receipt_number,
  });
}
