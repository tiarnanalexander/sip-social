"use client";

import { useActionState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { submitEnquiry, type EnquiryState } from "@/app/enquire/actions";
import { Field, TextInput, TextArea, Select } from "./Field";
import { Turnstile } from "./Turnstile";
import { WavyRule } from "@/components/ui/WavyRule";

const initialState: EnquiryState = { status: "idle" };

export function EnquiryForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const params = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);

  const prefilledPackage = params.get("package") ?? "";
  const prefilledEvent = params.get("event") ?? "";
  const eventFromSlug: Record<string, string> = {
    "wedding-coffee-cart": "wedding",
    "corporate-coffee-cart": "corporate",
    "product-launch-coffee-cart": "product-launch",
    "private-party-coffee-cart": "private-party",
  };

  const errors = state.status === "error" ? state.fieldErrors ?? {} : {};

  useEffect(() => {
    if (state.status === "success" && formRef.current) {
      formRef.current.reset();
    }
    if (state.status === "error") {
      document.getElementById("enquiry-status")?.focus();
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-[1.75rem] border border-cream-edge bg-cream-deep p-10 text-center sm:p-14"
      >
        <h2 className="font-display text-3xl sm:text-4xl">Got it — thank you.</h2>
        <WavyRule className="mx-auto mt-5 h-[6px] w-28 text-bronze" />
        <p className="measure-s mx-auto mt-5 text-stone">
          Your enquiry is on its way to us. Check your inbox for a confirmation,
          and we&apos;ll follow up with a tailored quote shortly.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-10">
      {state.status === "error" && (
        <p
          id="enquiry-status"
          role="alert"
          tabIndex={-1}
          className="rounded-xl border-2 border-red-700/30 bg-red-50 px-5 py-4 text-sm font-medium text-red-800"
        >
          {state.message}
        </p>
      )}

      {/* honeypot — hidden from real visitors, irresistible to bots */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="grid gap-6 sm:grid-cols-2">
        <legend className="col-span-full font-display text-2xl">Your details</legend>
        <Field label="Your name" name="name" required error={errors.name}>
          <TextInput id="name" name="name" type="text" autoComplete="name" required />
        </Field>
        <Field label="Email" name="email" required error={errors.email}>
          <TextInput id="email" name="email" type="email" autoComplete="email" required />
        </Field>
        <Field label="Phone" name="phone" error={errors.phone}>
          <TextInput id="phone" name="phone" type="tel" autoComplete="tel" />
        </Field>
      </fieldset>

      <fieldset className="grid gap-6 sm:grid-cols-2">
        <legend className="col-span-full font-display text-2xl">Your event</legend>

        <Field label="Event type" name="eventType" required error={errors.eventType}>
          <Select
            id="eventType"
            name="eventType"
            required
            defaultValue={eventFromSlug[prefilledEvent] ?? ""}
          >
            <option value="" disabled>Choose one</option>
            <option value="wedding">Wedding</option>
            <option value="corporate">Corporate event</option>
            <option value="product-launch">Product launch / brand activation</option>
            <option value="private-party">Private party</option>
            <option value="community-popup">Community event / pop-up</option>
            <option value="other">Other</option>
          </Select>
        </Field>

        <Field label="Package you're interested in" name="packageInterest" required error={errors.packageInterest}>
          <Select
            id="packageInterest"
            name="packageInterest"
            required
            defaultValue={prefilledPackage || "unsure"}
          >
            <option value="unsure">Not sure yet</option>
            <option value="pay-as-you-go">Pay as you go</option>
            <option value="all-inclusive">All-inclusive package</option>
            <option value="branded-experience">Branded experience</option>
          </Select>
        </Field>

        <Field label="Event date" name="eventDate" required hint="Your best estimate is fine" error={errors.eventDate}>
          <TextInput id="eventDate" name="eventDate" type="date" required />
        </Field>

        <div className="flex items-end pb-3.5">
          <label className="flex items-center gap-2.5 text-sm">
            <input type="checkbox" name="flexibleDate" className="h-4 w-4 accent-ink" />
            My date is flexible
          </label>
        </div>

        <Field label="Location or postcode" name="location" required error={errors.location}>
          <TextInput id="location" name="location" type="text" required placeholder="e.g. venue name or postcode" />
        </Field>

        <Field label="Approximate guest count" name="guestCount" required error={errors.guestCount}>
          <TextInput id="guestCount" name="guestCount" type="text" required placeholder="e.g. 80" />
        </Field>

        <Field label="How long do you need us for?" name="duration" required error={errors.duration}>
          <TextInput id="duration" name="duration" type="text" required placeholder="e.g. 3 hours" />
        </Field>

        <Field label="Indoor or outdoor?" name="indoorOutdoor">
          <Select id="indoorOutdoor" name="indoorOutdoor" defaultValue="unsure">
            <option value="unsure">Not sure yet</option>
            <option value="indoor">Indoor</option>
            <option value="outdoor">Outdoor</option>
            <option value="both">Both</option>
          </Select>
        </Field>

        <Field label="Power available on site?" name="powerAvailable">
          <Select id="powerAvailable" name="powerAvailable" defaultValue="unsure">
            <option value="unsure">Not sure yet</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </Field>

        <div className="flex items-end pb-3.5">
          <label className="flex items-center gap-2.5 text-sm">
            <input type="checkbox" name="branding" className="h-4 w-4 accent-ink" />
            I&apos;d like branded cups / cart
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-display text-2xl">Anything else?</legend>
        <div className="mt-6">
          <Field label="Message" name="message" error={errors.message}>
            <TextArea
              id="message"
              name="message"
              rows={4}
              placeholder="Anything that'll help us quote accurately — dietary needs, timings, venue access, that sort of thing."
            />
          </Field>
        </div>
      </fieldset>

      <Turnstile />

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-base font-semibold text-cream transition-all hover:bg-bronze disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
