# lal-shared-display
Shared display prototype for LAL

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
