import { NextRequest, NextResponse } from "next/server";
import { initiateStkPush, isMpesaConfigured } from "@/lib/mpesa";
import { createAdminClient } from "@/lib/supabase/admin";

interface InitiateBody {
  phone: string;
  amount: number;
  items: { productId: string; name: string; price: number; quantity: number }[];
}

export async function POST(request: NextRequest) {
  if (!isMpesaConfigured()) {
    return NextResponse.json(
      { error: "M-Pesa is not configured yet." },
      { status: 503 }
    );
  }

  const body: InitiateBody = await request.json();
  const { phone, amount, items } = body;

  if (!phone || !amount || amount <= 0 || !items?.length) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const callbackUrl = `${request.nextUrl.origin}/api/mpesa/callback`;
  const accountReference = `DAKA${Date.now().toString().slice(-8)}`;

  try {
    const { checkoutRequestId, merchantRequestId } = await initiateStkPush(
      phone,
      amount,
      accountReference,
      callbackUrl
    );

    const supabase = createAdminClient();
    await supabase.from("mpesa_transactions").insert({
      checkout_request_id: checkoutRequestId,
      merchant_request_id: merchantRequestId,
      phone,
      amount,
      items,
      status: "pending",
    });

    return NextResponse.json({ checkoutRequestId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "STK push failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
