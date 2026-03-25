import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const submissions = new Map<string, number[]>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissions.get(ip) ?? []).filter(
    (t) => now - t < RATE_WINDOW_MS
  );
  submissions.set(ip, timestamps);
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  return false;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface ContactFormData {
  name: string;
  company: string;
  industry: string;
  email: string;
  phone?: string;
  serviceInterest?: string;
  description: string;
  website?: string;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const contactEmail = process.env.CONTACT_EMAIL;
  if (!apiKey || !contactEmail) {
    console.error("Missing required env vars: RESEND_API_KEY or CONTACT_EMAIL");
    return NextResponse.json(
      { error: "伺服器設定錯誤，請直接聯繫我們" },
      { status: 500 }
    );
  }

  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "提交次數過多，請稍後再試" },
      { status: 429 }
    );
  }

  try {
    const body: ContactFormData = await request.json();

    if (body.website) {
      return NextResponse.json({ success: true });
    }

    if (!body.name || !body.company || !body.industry || !body.email || !body.description) {
      return NextResponse.json(
        { error: "請填寫所有必填欄位" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "請輸入有效的電子郵件地址" },
        { status: 400 }
      );
    }

    if (body.description.length > 1000) {
      return NextResponse.json(
        { error: "需求描述不得超過 1000 字" },
        { status: 400 }
      );
    }

    const safe = {
      name: escapeHtml(body.name),
      company: escapeHtml(body.company),
      industry: escapeHtml(body.industry),
      email: escapeHtml(body.email),
      phone: escapeHtml(body.phone ?? "未提供"),
      serviceInterest: escapeHtml(body.serviceInterest ?? "未選擇"),
      description: escapeHtml(body.description),
    };

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "noreply@synchrotech.com",
      to: contactEmail,
      subject: `[網站諮詢] ${safe.company} - ${safe.name}`,
      html: `
        <h2>新的客戶諮詢</h2>
        <p><strong>姓名：</strong>${safe.name}</p>
        <p><strong>公司：</strong>${safe.company}</p>
        <p><strong>產業：</strong>${safe.industry}</p>
        <p><strong>Email：</strong>${safe.email}</p>
        <p><strong>電話：</strong>${safe.phone}</p>
        <p><strong>感興趣的服務：</strong>${safe.serviceInterest}</p>
        <p><strong>需求描述：</strong></p>
        <p>${safe.description}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "送出失敗，請稍後再試或直接聯繫我們" },
      { status: 500 }
    );
  }
}
