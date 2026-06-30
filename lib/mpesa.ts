// Safaricom Daraja (Lipa Na M-Pesa Online / STK Push) integration.
//
// Sandbox by default. To go live: get production Consumer Key/Secret +
// your real Paybill/Till shortcode + passkey from Safaricom (separate
// approval from sandbox access), then set MPESA_ENV=production and the
// four MPESA_* secrets below — no code changes needed.

const SANDBOX_BASE_URL = "https://sandbox.safaricom.co.ke";
const PRODUCTION_BASE_URL = "https://api.safaricom.co.ke";

// Safaricom's publicly documented sandbox test shortcode + passkey.
const SANDBOX_SHORTCODE = "174379";
const SANDBOX_PASSKEY =
  "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";

function isProduction() {
  return process.env.MPESA_ENV === "production";
}

function baseUrl() {
  return isProduction() ? PRODUCTION_BASE_URL : SANDBOX_BASE_URL;
}

function shortcode() {
  return process.env.MPESA_SHORTCODE || SANDBOX_SHORTCODE;
}

function passkey() {
  return process.env.MPESA_PASSKEY || SANDBOX_PASSKEY;
}

export function isMpesaConfigured() {
  return Boolean(
    process.env.MPESA_CONSUMER_KEY && process.env.MPESA_CONSUMER_SECRET
  );
}

function timestamp() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  );
}

async function getAccessToken(): Promise<string> {
  const key = process.env.MPESA_CONSUMER_KEY!;
  const secret = process.env.MPESA_CONSUMER_SECRET!;
  const credentials = Buffer.from(`${key}:${secret}`).toString("base64");

  const res = await fetch(
    `${baseUrl()}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: { Authorization: `Basic ${credentials}` },
    }
  );

  if (!res.ok) {
    throw new Error(`M-Pesa auth failed: ${res.status} ${await res.text()}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

// Kenyan local (07xx/01xx) or 254-prefixed numbers -> 2547xxxxxxxx / 2541xxxxxxxx
export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("254")) return digits;
  if (digits.startsWith("0")) return `254${digits.slice(1)}`;
  if (digits.startsWith("7") || digits.startsWith("1")) return `254${digits}`;
  return digits;
}

interface StkPushResult {
  merchantRequestId: string;
  checkoutRequestId: string;
}

export async function initiateStkPush(
  phone: string,
  amount: number,
  accountReference: string,
  callbackUrl: string
): Promise<StkPushResult> {
  const accessToken = await getAccessToken();
  const ts = timestamp();
  const password = Buffer.from(`${shortcode()}${passkey()}${ts}`).toString(
    "base64"
  );

  const res = await fetch(`${baseUrl()}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BusinessShortCode: shortcode(),
      Password: password,
      Timestamp: ts,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.round(amount),
      PartyA: normalizePhone(phone),
      PartyB: shortcode(),
      PhoneNumber: normalizePhone(phone),
      CallBackURL: callbackUrl,
      AccountReference: accountReference,
      TransactionDesc: "Daka Cosmetics order",
    }),
  });

  const data = await res.json();

  if (!res.ok || data.ResponseCode !== "0") {
    throw new Error(
      data.errorMessage || data.ResponseDescription || "STK push failed"
    );
  }

  return {
    merchantRequestId: data.MerchantRequestID,
    checkoutRequestId: data.CheckoutRequestID,
  };
}
