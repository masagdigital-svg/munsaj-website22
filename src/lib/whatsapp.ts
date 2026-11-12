/**
 * Mansaj Digital — official WhatsApp contact.
 * Only this number is used across the whole site.
 */
export const WHATSAPP_NUMBER = "967770233292";
export const WHATSAPP_DISPLAY = "+967 770 233 292";
export const AGENCY_EMAIL = "masagdigital@gmail.com";

/** Build a wa.me link with a pre-filled first message. */
export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Generic WhatsApp greeting used by floating button & contact section. */
export const WA_GREETING_EN =
  "Hello Mansaj Digital 👋\nI visited your website and I want to discuss a project for my business.";
export const WA_GREETING_AR =
  "مرحبًا منسج الرقمية 👋\nزرت موقعكم وأريد أن أناقش مشروعًا لنشاطي التجاري.";
