"use client";

import { Button } from "@ui/components/button";
import { Input } from "@ui/components/input";
import { Textarea } from "@ui/components/textarea";
import { cn } from "@ui/lib";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { sendMessage } from "../actions/sendMessage";
import {
  CONTACT_LIMITS,
  type ContactField,
  type ContactState,
} from "../lib/contact";

const initialState: ContactState = { status: "idle" };

/** Contact form card. Remounting the inner form (via `key`) starts a fresh message. */
export function ContactForm({ className }: { className?: string }) {
  const [formKey, setFormKey] = useState(0);

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-background/70 p-5 text-left shadow-sm backdrop-blur sm:p-7",
        className,
      )}
    >
      <ContactFormBody
        key={formKey}
        onReset={() => setFormKey((key) => key + 1)}
      />
    </div>
  );
}

function ContactFormBody({ onReset }: { onReset: () => void }) {
  const [state, formAction] = useActionState(sendMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  // Move focus to what changed: the first invalid field, or the success message.
  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    if (state.errors) {
      const first = (["name", "email", "message"] as const).find(
        (field) => state.errors?.[field],
      );
      if (first)
        formRef.current
          ?.querySelector<HTMLElement>(`#contact-${first}`)
          ?.focus();
    }
  }, [state]);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center py-10 text-center"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h3
          ref={successRef}
          tabIndex={-1}
          className="mt-4 text-lg font-semibold tracking-tight focus:outline-none"
        >
          Message sent
        </h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
          Thanks for reaching out. I&apos;ll reply to your email soon.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={onReset}
        >
          Send another message
        </Button>
      </div>
    );
  }

  const errorFor = (field: ContactField) => state.errors?.[field];

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-5">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">Send a message</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          It goes straight to my inbox. I usually reply within a day.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errorFor("name")}>
          <Input
            id="contact-name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            maxLength={CONTACT_LIMITS.name.max}
            defaultValue={state.values?.name}
            aria-invalid={Boolean(errorFor("name"))}
            aria-describedby={
              errorFor("name") ? "contact-name-error" : undefined
            }
          />
        </Field>
        <Field id="email" label="Email" error={errorFor("email")}>
          <Input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            maxLength={CONTACT_LIMITS.email.max}
            defaultValue={state.values?.email}
            aria-invalid={Boolean(errorFor("email"))}
            aria-describedby={
              errorFor("email") ? "contact-email-error" : undefined
            }
          />
        </Field>
      </div>

      <Field id="message" label="Message" error={errorFor("message")}>
        <Textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="Tell me about the role, the project or the problem you're solving."
          maxLength={CONTACT_LIMITS.message.max}
          defaultValue={state.values?.message}
          aria-invalid={Boolean(errorFor("message"))}
          aria-describedby={
            errorFor("message") ? "contact-message-error" : undefined
          }
        />
      </Field>

      {/* Honeypot: invisible to people and screen readers; bots fill it in. */}
      <div
        aria-hidden
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-700 dark:text-red-300"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {state.message}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: ContactField;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={`contact-${id}`} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p
          id={`contact-${id}-error`}
          className="text-xs text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      aria-disabled={pending}
      className="group w-full"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending…
        </>
      ) : (
        <>
          Send message
          <Send className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </>
      )}
    </Button>
  );
}
