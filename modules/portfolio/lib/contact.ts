/** Shared by the contact Server Action and the form. Pure, so it runs anywhere. */

export type ContactField = "name" | "email" | "message";
export type ContactValues = Record<ContactField, string>;

export interface ContactState {
  status: "idle" | "success" | "error";
  /** Form-level message, e.g. when sending failed. */
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  /** Echoed back on error so the visitor never loses what they typed. */
  values?: ContactValues;
}

export const CONTACT_LIMITS = {
  name: { min: 1, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function readContactValues(formData: FormData): ContactValues {
  const get = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };

  return {
    // Names go into the email subject, so collapse any line breaks.
    name: get("name").replace(/\s+/g, " ").trim(),
    email: get("email").trim(),
    message: get("message").trim(),
  };
}

export function validateContact(
  values: ContactValues,
): Partial<Record<ContactField, string>> {
  const errors: Partial<Record<ContactField, string>> = {};
  const { name, email, message } = CONTACT_LIMITS;

  if (values.name.length < name.min) errors.name = "Please enter your name.";
  else if (values.name.length > name.max)
    errors.name = `Please keep your name under ${name.max} characters.`;

  if (!values.email) errors.email = "Please enter your email.";
  else if (values.email.length > email.max || !EMAIL_PATTERN.test(values.email))
    errors.email = "Please enter a valid email address.";

  if (values.message.length < message.min)
    errors.message = `Please write at least ${message.min} characters.`;
  else if (values.message.length > message.max)
    errors.message = `Please keep your message under ${message.max} characters.`;

  return errors;
}
