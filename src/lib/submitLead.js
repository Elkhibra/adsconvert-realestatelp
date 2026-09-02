import { supabase } from "./supabaseClient";

/* Generates a Meta dedup event ID, saves the lead to Supabase, then fires
   the browser Pixel event and the server-side Conversions API call. */
export async function submitLead({ formData, language, f }) {
  const eventId =
    "lead_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7);

  const urlParams = new URLSearchParams(window.location.search);
  const utm = {
    source: urlParams.get("utm_source") || "",
    campaign: urlParams.get("utm_campaign") || "",
  };

  const formattedPropertyType =
    formData.propertyType === f.otherType && formData.propertyTypeOther
      ? `${f.otherType}: ${formData.propertyTypeOther}`
      : formData.propertyType;

  const formattedGoal =
    formData.goal === f.otherGoal && formData.goalOther
      ? `${f.otherGoal}: ${formData.goalOther}`
      : formData.goal;

  try {
    const { error } = await supabase.from("leads").insert([
      {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        role: formData.role,
        property_type: formattedPropertyType,
        has_advertising: formData.hasAdvertising,
        goal: formattedGoal,
        inventory: formData.inventory,
        budget: formData.budget,
        urgency: formData.urgency,
        language,
        utm: utm.source || utm.campaign ? utm : null,
        status: "New Lead",
      },
    ]);
    if (error) console.error("Error saving to Supabase:", error);
  } catch (err) {
    console.error("Supabase request failed:", err);
  }

  if (typeof window.fbq === "function") {
    window.fbq(
      "track",
      "Lead",
      {
        content_name: "Real Estate Consultation",
        status: formData.role,
        content_category: formattedPropertyType,
      },
      { eventID: eventId },
    );
  }

  fetch("/api/meta-capi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...formData,
      propertyType: formattedPropertyType,
      eventId,
      sourceUrl: window.location.href,
    }),
  }).catch((err) => console.error("CAPI trigger error:", err));
}
