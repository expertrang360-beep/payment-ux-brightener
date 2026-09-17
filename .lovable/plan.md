# Improve Payroxa payments, bills, history, and receipts

## Goal
Create one clean, trustworthy financial experience across the customer payment journey while preserving existing payment logic and navigation.

## What will change
- Refresh the payments hub with clearer service categories, a working service search, recent/favourite billers, and stronger unavailable states.
- Improve bill-payment screens with a consistent step flow, clearer provider/account/amount hierarchy, validation feedback, review summaries, loading states, and success or failure outcomes.
- Redesign transaction history for faster scanning with working search and status/type filters, clearer debit/credit treatment, informative empty states, and accessible transaction details.
- Upgrade receipts with a stronger success summary, better-aligned transaction details, a clear reference section, and working copy/share/download feedback.
- Keep layouts compact and comfortable on mobile while retaining polished wider-screen behavior.

## Visual direction
- Clean financial style using bright neutral surfaces, deep navy text, Payroxa blue actions, and green success states.
- Sora for headings and Manrope for body text.
- Crisp dividers, restrained shadows, compact controls, and semantic status colors; no decorative clutter.

## Technical details
- Reuse the existing TanStack routes, app shell, navigation, and business logic.
- Consolidate repeated payment and status presentation into focused shared UI where it reduces inconsistency.
- Add local interaction state only where needed for search, filters, copy/share/download feedback, and payment progress; do not change APIs or financial processing.
- Preserve existing design tokens and expand them semantically rather than hardcoding visual values in screens.
- Add complete page metadata for each changed customer-facing route.
- Verify the main payment flow, history filters, receipt actions, and mobile layout.

## Scope boundary
- Customer-facing payments, bill payments, transaction history, and receipts only.
- No changes to admin transaction tools, provider integrations, database structure, or payment-processing rules.
