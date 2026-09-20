import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  description: z.string().min(10).max(2000),
  context: z.string().max(200),
});

export type TripIssueTriage = {
  category: string;
  urgency: "low" | "medium" | "high";
  summary: string;
  next_steps: string[];
  refund_likely: boolean;
  contact_support: boolean;
};

const jsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    category: {
      type: "string",
      enum: [
        "Late pickup",
        "Driver behaviour",
        "Wrong route or detour",
        "Overcharge or fare dispute",
        "Lost item",
        "Damaged or missing package",
        "Delivery not received",
        "Cancellation issue",
        "Safety concern",
        "Other",
      ],
    },
    urgency: { type: "string", enum: ["low", "medium", "high"] },
    summary: { type: "string" },
    next_steps: { type: "array", items: { type: "string" } },
    refund_likely: { type: "boolean" },
    contact_support: { type: "boolean" },
  },
  required: ["category", "urgency", "summary", "next_steps", "refund_likely", "contact_support"],
} as const;

const SYSTEM_PROMPT = `You are the Payroxa Mobility support assistant for rides, deliveries and logistics in Nigeria.
Read the user's issue, classify it, and give clear practical next steps.
Rules: summary max 30 words; 2 to 4 next steps, each max 18 words, written directly to the user;
set urgency high only for safety, theft or an ongoing emergency;
set contact_support true when a human agent is needed; never invent trip data or amounts.`;

export const triageTripIssue = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<TripIssueTriage> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI support is not configured yet.");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        stream: true,
        reasoning: { effort: "low", summary: "auto" },
        input: [
          { role: "system", content: [{ type: "input_text", text: SYSTEM_PROMPT }] },
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `Service context: ${data.context}\n\nIssue described by the user:\n${data.description}`,
              },
            ],
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "trip_issue_triage",
            strict: true,
            schema: jsonSchema,
          },
        },
      }),
    });

    if (!response.ok || !response.body) {
      const detail = await response.text().catch(() => "");
      if (response.status === 402 || response.status === 403) {
        throw new Error("AI support is temporarily unavailable. Please contact Payroxa support.");
      }
      throw new Error(`AI support failed (${response.status}). ${detail.slice(0, 200)}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let text = "";

    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      buffer += decoder.decode(chunk.value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const event = JSON.parse(payload) as {
            type?: string;
            delta?: string;
            response?: { output_text?: string };
          };
          if (event.type === "response.output_text.delta" && typeof event.delta === "string") {
            text += event.delta;
          } else if (event.type === "response.completed" && event.response?.output_text) {
            if (!text) text = event.response.output_text;
          }
        } catch {
          // ignore keep-alive / partial frames
        }
      }
    }

    if (!text.trim()) {
      throw new Error("The assistant could not read that. Please add a little more detail.");
    }

    return JSON.parse(text) as TripIssueTriage;
  });
