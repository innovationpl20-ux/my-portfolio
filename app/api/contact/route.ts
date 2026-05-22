import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  botcheck?: string;
};

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json(
      { success: false, message: "서버 설정 오류" },
      { status: 500 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { success: false, message: "잘못된 요청" },
      { status: 400 },
    );
  }

  if (payload.botcheck) {
    return NextResponse.json({ success: true });
  }

  const { name, email, message } = payload;
  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, message: "필수 항목 누락" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "minee Portfolio — Contact",
        from_name: "minee Portfolio",
        name,
        email,
        message,
      }),
    });

    const result = (await response.json()) as {
      success?: boolean;
      message?: string;
    };

    if (response.ok && result.success) {
      return NextResponse.json({ success: true });
    }

    console.error("[web3forms] failed", {
      status: response.status,
      result,
    });

    if (response.status === 429) {
      return NextResponse.json(
        {
          success: false,
          code: "rate_limited",
          message: "요청이 일시적으로 제한됐어요. 1시간 후 다시 시도해주세요",
        },
        { status: 429 },
      );
    }

    return NextResponse.json(
      { success: false, message: result.message ?? "전송 실패" },
      { status: 502 },
    );
  } catch (error) {
    console.error("[web3forms] network error", error);
    return NextResponse.json(
      { success: false, message: "네트워크 오류" },
      { status: 502 },
    );
  }
}
