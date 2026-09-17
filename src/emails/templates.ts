/**
 * Payroxa email templates — table-based, inline-styled HTML for maximum
 * email-client compatibility. Hex values are intentional here: email clients
 * do not support CSS variables or modern color functions.
 */

export const brand = {
  primary: "#2563EB",
  primaryDark: "#1D4ED8",
  navy: "#0F172A",
  slate: "#64748B",
  border: "#E2E8F0",
  soft: "#F8FAFC",
  softBlue: "#EFF4FF",
  success: "#10B981",
  warning: "#F59E0B",
  danger: "#EF4444",
} as const;

const font =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Roboto,Helvetica,Arial,sans-serif";

function button(label: string, href: string) {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 8px;">
    <tr>
      <td align="center" bgcolor="${brand.primary}" style="border-radius:12px;">
        <a href="${href}" style="display:inline-block;padding:14px 30px;font-family:${font};font-size:15px;font-weight:600;color:#FFFFFF;text-decoration:none;border-radius:12px;">${label}</a>
      </td>
    </tr>
  </table>`;
}

function codeBlock(code: string) {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;">
    <tr>
      <td align="center" bgcolor="${brand.softBlue}" style="border-radius:16px;padding:22px 12px;">
        <div style="font-family:${font};font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:${brand.slate};font-weight:600;">Your verification code</div>
        <div style="font-family:${font};font-size:38px;letter-spacing:10px;font-weight:700;color:${brand.navy};padding-top:10px;">${code}</div>
      </td>
    </tr>
  </table>`;
}

function rows(items: [string, string][]) {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${brand.border};border-radius:16px;margin:24px 0;">
    ${items
      .map(
        ([k, v], i) => `
    <tr>
      <td style="padding:13px 18px;font-family:${font};font-size:13px;color:${brand.slate};${i ? `border-top:1px solid ${brand.border};` : ""}">${k}</td>
      <td align="right" style="padding:13px 18px;font-family:${font};font-size:13px;font-weight:600;color:${brand.navy};${i ? `border-top:1px solid ${brand.border};` : ""}">${v}</td>
    </tr>`,
      )
      .join("")}
  </table>`;
}

function note(text: string, tone: "info" | "warning" = "info") {
  const bg = tone === "warning" ? "#FEF6E7" : brand.soft;
  const bar = tone === "warning" ? brand.warning : brand.primary;
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 4px;">
    <tr>
      <td bgcolor="${bg}" style="border-left:3px solid ${bar};border-radius:10px;padding:14px 16px;font-family:${font};font-size:12.5px;line-height:1.6;color:${brand.slate};">${text}</td>
    </tr>
  </table>`;
}

function shell(opts: {
  preheader: string;
  eyebrow?: string;
  heading: string;
  body: string;
}) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="color-scheme" content="light" />
<title>${opts.heading}</title>
</head>
<body style="margin:0;padding:0;background:#F1F5F9;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${opts.preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F1F5F9;padding:32px 12px;">
  <tr>
    <td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <tr>
          <td style="background:linear-gradient(135deg,${brand.primary} 0%,#7C3AED 100%);border-radius:22px 22px 0 0;padding:26px 30px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="display:inline-block;width:34px;height:34px;line-height:34px;text-align:center;background:rgba(255,255,255,.18);border-radius:11px;font-family:${font};font-size:16px;font-weight:700;color:#FFFFFF;">P</span>
                  <span style="font-family:${font};font-size:17px;font-weight:700;color:#FFFFFF;padding-left:10px;vertical-align:middle;">Payroxa</span>
                </td>
                <td align="right" style="font-family:${font};font-size:10.5px;letter-spacing:1.1px;text-transform:uppercase;color:rgba(255,255,255,.72);">Payments. Powering Possibilities.</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td bgcolor="#FFFFFF" style="padding:34px 30px 30px;">
            ${
              opts.eyebrow
                ? `<div style="font-family:${font};font-size:11px;font-weight:700;letter-spacing:1.3px;text-transform:uppercase;color:${brand.primary};">${opts.eyebrow}</div>`
                : ""
            }
            <h1 style="margin:8px 0 12px;font-family:${font};font-size:24px;line-height:1.3;font-weight:700;color:${brand.navy};">${opts.heading}</h1>
            <div style="font-family:${font};font-size:14.5px;line-height:1.7;color:#475569;">${opts.body}</div>
          </td>
        </tr>

        <tr>
          <td bgcolor="#FFFFFF" style="border-radius:0 0 22px 22px;border-top:1px solid ${brand.border};padding:22px 30px;">
            <p style="margin:0 0 6px;font-family:${font};font-size:12px;color:${brand.slate};">Need help? Reach us at <a href="mailto:help@payroxa.com" style="color:${brand.primary};text-decoration:none;font-weight:600;">help@payroxa.com</a> or 0700 PAYROXA.</p>
            <p style="margin:0;font-family:${font};font-size:11px;color:#94A3B8;">Payroxa Technologies · Lagos, Nigeria<br/>You're receiving this because you have a Payroxa account.</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

export type EmailTemplate = {
  id: string;
  name: string;
  category: "Authentication" | "Transactional" | "Lifecycle";
  subject: string;
  preheader: string;
  html: string;
};

const link = "https://payroxa.lovable.app";

export const emailTemplates: EmailTemplate[] = [
  {
    id: "welcome",
    name: "Welcome",
    category: "Lifecycle",
    subject: "Welcome to Payroxa, Olamide 👋",
    preheader: "Your account is live — fund your wallet and send your first transfer.",
    html: shell({
      preheader: "Your account is live — fund your wallet and send your first transfer.",
      eyebrow: "Account created",
      heading: "Welcome to Payroxa",
      body: `<p style="margin:0 0 14px;">Hi Olamide, your wallet is ready. Payroxa gives you instant bank transfers, bills, virtual cards and crypto — in one place.</p>
      ${rows([
        ["Wallet ID", "PYX-8821-4423"],
        ["Tier", "Tier 1 · ₦50,000 daily"],
        ["Currency", "NGN"],
      ])}
      <p style="margin:0;">Complete KYC to unlock ₦5,000,000 daily limits and international transfers.</p>
      ${button("Complete verification", `${link}/auth/kyc`)}`,
    }),
  },
  {
    id: "confirm-signup",
    name: "Confirm signup",
    category: "Authentication",
    subject: "Confirm your Payroxa email",
    preheader: "One tap to verify your email and activate your wallet.",
    html: shell({
      preheader: "One tap to verify your email and activate your wallet.",
      eyebrow: "Verify email",
      heading: "Confirm your email address",
      body: `<p style="margin:0 0 6px;">Tap the button below to verify your email and finish creating your Payroxa account.</p>
      ${button("Verify my email", `${link}/auth/otp`)}
      ${note("This link expires in 60 minutes. If you didn't create a Payroxa account, you can safely ignore this email.")}`,
    }),
  },
  {
    id: "otp",
    name: "One-time code",
    category: "Authentication",
    subject: "Your Payroxa code is 482913",
    preheader: "Your one-time verification code expires in 10 minutes.",
    html: shell({
      preheader: "Your one-time verification code expires in 10 minutes.",
      eyebrow: "Security",
      heading: "Here's your one-time code",
      body: `<p style="margin:0;">Use this code to complete your sign-in. It expires in 10 minutes.</p>
      ${codeBlock("482913")}
      ${note("Payroxa staff will <b>never</b> ask you for this code. If you didn't request it, change your password immediately.", "warning")}`,
    }),
  },
  {
    id: "reset-password",
    name: "Password reset",
    category: "Authentication",
    subject: "Reset your Payroxa password",
    preheader: "A password reset was requested for your account.",
    html: shell({
      preheader: "A password reset was requested for your account.",
      eyebrow: "Password reset",
      heading: "Reset your password",
      body: `<p style="margin:0 0 6px;">We received a request to reset the password for <b>olamide@payroxa.com</b>. Choose a new one below.</p>
      ${button("Set a new password", `${link}/auth/forgot`)}
      ${note("Link valid for 30 minutes. Didn't request this? Your account is still secure — no action is needed.")}`,
    }),
  },
  {
    id: "magic-link",
    name: "Magic link",
    category: "Authentication",
    subject: "Your Payroxa sign-in link",
    preheader: "Sign in without a password — link valid for 15 minutes.",
    html: shell({
      preheader: "Sign in without a password — link valid for 15 minutes.",
      eyebrow: "Passwordless",
      heading: "Sign in to Payroxa",
      body: `<p style="margin:0 0 6px;">Tap below to sign in instantly. No password required.</p>
      ${button("Sign me in", `${link}/auth/login`)}
      ${note("For your security this link works once and expires in 15 minutes.")}`,
    }),
  },
  {
    id: "receipt",
    name: "Transfer receipt",
    category: "Transactional",
    subject: "Receipt · ₦12,500.00 sent to Ada Okafor",
    preheader: "Your transfer of ₦12,500.00 was successful.",
    html: shell({
      preheader: "Your transfer of ₦12,500.00 was successful.",
      eyebrow: "Transfer successful",
      heading: "₦12,500.00 sent",
      body: `<p style="margin:0 0 4px;">Your transfer to <b>Ada Okafor</b> went through. Here are the details.</p>
      ${rows([
        ["Amount", "₦12,500.00"],
        ["Recipient", "Ada Okafor"],
        ["Bank", "GTBank · 0123456789"],
        ["Reference", "PYX-892310-4421"],
        ["Fee", "₦0.00"],
        ["Date", "8 Jul 2026 · 20:33"],
        ["New balance", "₦248,320.55"],
      ])}
      ${button("View receipt", `${link}/receipt`)}`,
    }),
  },
  {
    id: "security-alert",
    name: "Security alert",
    category: "Transactional",
    subject: "New sign-in to your Payroxa account",
    preheader: "We noticed a sign-in from a new device.",
    html: shell({
      preheader: "We noticed a sign-in from a new device.",
      eyebrow: "Security alert",
      heading: "New device signed in",
      body: `<p style="margin:0 0 4px;">Your Payroxa account was accessed from a device we haven't seen before.</p>
      ${rows([
        ["Device", "iPhone 15 Pro · iOS 19"],
        ["Location", "Lagos, Nigeria"],
        ["IP address", "102.89.•••.44"],
        ["Time", "10 Aug 2026 · 07:04 WAT"],
      ])}
      ${note("If this wasn't you, secure your account now — we'll sign out every device.", "warning")}
      ${button("Secure my account", `${link}/settings`)}`,
    }),
  },
  {
    id: "kyc-approved",
    name: "KYC approved",
    category: "Lifecycle",
    subject: "You're verified — Tier 2 unlocked",
    preheader: "Higher limits and international transfers are now live on your account.",
    html: shell({
      preheader: "Higher limits and international transfers are now live on your account.",
      eyebrow: "Verification complete",
      heading: "Tier 2 unlocked 🎉",
      body: `<p style="margin:0 0 4px;">Your documents checked out. Your new limits are active immediately.</p>
      ${rows([
        ["Daily transfer limit", "₦5,000,000"],
        ["Single transaction", "₦2,000,000"],
        ["International transfers", "Enabled"],
        ["Virtual cards", "Enabled"],
      ])}
      ${button("Go to my wallet", `${link}/wallet`)}`,
    }),
  },
];

export const emailTemplateById = (id: string) =>
  emailTemplates.find((t) => t.id === id) ?? emailTemplates[0];
