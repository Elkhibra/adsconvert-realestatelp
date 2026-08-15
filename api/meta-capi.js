import crypto from "crypto";

// Hash helper for Meta CAPI privacy standards (SHA-256)
function hash(val) {
  if (!val) return undefined;
  return crypto
    .createHash("sha256")
    .update(val.trim().toLowerCase())
    .digest("hex");
}

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, role, propertyType, eventId, sourceUrl } =
    req.body;

  const pixelId = process.env.META_DATASET_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    return res
      .status(500)
      .json({ error: "Missing Meta credentials in environment variables." });
  }

  // Extract client IP and User Agent for accurate event matching
  const clientIp =
    req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];

  // Format phone number for hashing (strip spaces/dashes)
  const cleanPhone = phone ? phone.replace(/\D/g, "") : "";

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId, // Used by Meta to deduplicate with browser Pixel
        event_source_url: sourceUrl || req.headers.referer,
        action_source: "website",
        user_data: {
          em: email ? [hash(email)] : undefined,
          ph: cleanPhone ? [hash(cleanPhone)] : undefined,
          fn: name ? [hash(name.split(" ")[0])] : undefined,
          ln:
            name && name.split(" ").length > 1
              ? [hash(name.split(" ").slice(1).join(" "))]
              : undefined,
          client_ip_address: clientIp,
          client_user_agent: userAgent,
        },
        custom_data: {
          content_name: "Real Estate Consultation",
          status: role,
          content_category: propertyType,
          currency: "MAD",
        },
      },
    ],
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Meta CAPI Error:", err);
    return res.status(500).json({ error: "Failed to send event to Meta" });
  }
}
