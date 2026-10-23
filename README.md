# lal-shared-display
Shared display prototype for LAL

## Mobile entry and room joining

Open `mobile/mobile.html` without a table parameter to see the shared house,
the Join → Focus → Furnish introduction, and the QR join button. Previously
saved tables do not join a room; each plain app entry requires a table QR.
A QR URL such as
`mobile/mobile.html?table=01` opens the joined room with its next actions.
Tables 01–06 map to the existing six rooms.
New users start with 0 Puzzle Pieces and earn them by completing focus sessions;
there is no free welcome Piece. Existing saved balances are preserved.

The in-app camera uses jsQR 1.4.0 from jsDelivr. Serve over HTTPS (or localhost)
and allow camera access. A pasted QR URL must point to the current page or
end in `/mobile/mobile.html`, with a valid table 01–06. Hosted QR links also
work in local previews; only the table is read, with no external navigation.
Relative links and `?table=01` are also accepted. Phone Camera app scanning remains
available when in-app scanning cannot run. Camera tracks stop on navigation,
successful joining, or when the browser tab becomes hidden.

Existing room QR links such as
`https://yujeong170.github.io/lal-shared-display/?room=balcony` also work
when scanned or pasted inside the mobile app. The `room` parameter maps to
the same six room IDs as the shared display. Mobile URLs can use either
`room` or `table`; contradictory parameters are rejected. The repository
root remains the shared display when opened directly.

Joining retains the existing browser-local prototype behavior; it does not
reserve a physical seat or track live participant counts. Room progress shows
occupied puzzle cells. The existing 3-second focus/break demo mode is labelled
on the focus screen; set `TEST_MODE` to false for normal sessions.

## Shared display completion animation

The display watches `house_snapshot` round generations and celebrates a new
completion for 2.8 seconds with centered, unboxed “PUZZLE COMPLETE !” text, a warm glow, sparkles,
and a furniture fade. Opening a display does not replay old completions.
Reduced-motion preferences disable movement and sparkles.

Re-run `supabase/atomic_placements.sql` before using this change. It preserves
the last completed furniture layout on each room row, including the final
placement, so the display can show it after the atomic reset. Without the
updated migration, the animation uses the last visible layout instead.

## Atomic placement setup

Before deploying the updated mobile app, run `supabase/atomic_placements.sql`
in this project's Supabase SQL Editor as the database owner. No database
management credential is included in this repository; the browser publishable
key cannot install SQL functions. Until this migration is installed, the new
mobile client intentionally cannot submit placements (there is no unsafe fallback).
Refresh all existing mobile clients after applying it.

The migration assumes the existing `furniture_placements` table has text
`room_id`, text `furniture_id`, and integer-array `cells` columns. Review the
live schema before running. It preserves existing placements and adds room
generations, request receipts, and two RPC functions. Direct browser writes
and deletes are revoked; the shared display can continue reading as before.

`confirm_placements` locks a persistent room row before checking the round
and occupied cells. Insertion and a completed room's reset share one transaction.
A competing last-cell submission sees the incremented generation and fails.
`house_snapshot` reads generations and furniture from the same snapshot.
RPC retries reuse a request UUID and receive the original result.

Run `supabase/test_atomic_placements.sql` on a test database after installing
the migration. It rolls back its fixtures and checks completion, stale rounds,
conflicts, batch atomicity, request replay, and browser write permissions.
For real concurrency validation, seed 23 balcony cells in a test database and
run last-cell calls with generation 0 and different UUIDs from two connections;
exactly one must return `ok`, the other `stale_round`.

Points and Pieces retain the existing browser-local prototype storage. The
migration guarantees placement concurrency; it does not add user accounts or
a server-side points ledger.
