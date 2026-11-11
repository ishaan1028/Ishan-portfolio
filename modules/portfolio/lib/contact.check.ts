// Self-check for contact validation. Run: npx tsx modules/portfolio/lib/contact.check.ts
import assert from "node:assert/strict";
import { readContactValues, validateContact } from "./contact";

const form = (fields: Record<string, string>) => {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.set(key, value);
  return data;
};

const good = {
  name: "Ada",
  email: "ada@example.com",
  message: "Hello there, nice portfolio!",
};

assert.deepEqual(validateContact(good), {});
assert.ok(validateContact({ ...good, name: "" }).name);
assert.ok(validateContact({ ...good, name: "x".repeat(101) }).name);
assert.ok(validateContact({ ...good, email: "" }).email);
assert.ok(validateContact({ ...good, email: "ada@example" }).email);
assert.ok(validateContact({ ...good, email: "ada example.com" }).email);
assert.ok(validateContact({ ...good, message: "too short" }).message);
assert.ok(validateContact({ ...good, message: "x".repeat(5001) }).message);

// Trims, collapses line breaks in the name (it goes into the subject), ignores non-strings.
assert.deepEqual(
  readContactValues(
    form({
      name: " Ada\r\nBcc: x ",
      email: " ada@example.com ",
      message: "  hi  ",
    }),
  ),
  { name: "Ada Bcc: x", email: "ada@example.com", message: "hi" },
);
assert.deepEqual(readContactValues(new FormData()), {
  name: "",
  email: "",
  message: "",
});

console.log("contact validation: ok");
