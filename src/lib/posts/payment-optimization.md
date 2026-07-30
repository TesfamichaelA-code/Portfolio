---
title: 300ms or bust — notes from inside a payment gateway
date: '2025-11-20'
tags:
  - go
  - fintech
  - performance
summary: What I learned at Chapa rebuilding 70% of a payment gateway's screens in two weeks, and helping tune Go microservices until concurrent payments answered in 300ms.
readingTime: 7 min
related: chapa-events
---

For four months I worked as a frontend engineer at Chapa Financial Technologies — the payment gateway that a serious share of Ethiopian internet commerce runs through. I was hired to build interfaces. I ended up learning what "fast" actually costs.

## The sprint

Partway through my internship, the whole gateway underwent a redesign. Not a facelift — a redesign, while production traffic kept flowing. My senior developer and I rebuilt **70% of all screens in two weeks**: Next.js, TypeScript, Tailwind CSS, and a performance budget we were not allowed to negotiate with.

Two weeks is not enough time to do that carefully, so we got selective about *where* care went:

- **Route-level code splitting first.** A merchant checking today's settlements should never download the refund flow.
- **Less JavaScript beats faster JavaScript.** Dashboards are mostly reads; the fastest bundle is the one you never ship.
- **Skeletons over spinners.** Perceived latency is a UX number, not a network number. A layout that arrives instantly and fills in feels faster than a faster page that arrives all at once.

Alongside the rebuild I shipped two products end-to-end: an events platform where merchants sell tickets (live at [chapa.events](https://chapa.events)) and a donations platform ([chapa.link/donations](https://chapa.link/donations)) — both settling through the gateway itself. I wrote the API contracts on Confluence before either side wrote code, which turned out to be the highest-leverage documents of my internship: every argument we didn't have later was an argument the contract had already settled.

## Crossing the boundary

Because I was comfortable on the backend, I got pulled into the Go microservices that process payments. The target was aggressive: **300ms responses under simultaneous payment load**.

Payments have a property that makes performance work unforgiving: you cannot trade correctness for speed. A cache that's 50ms faster and occasionally double-charges someone is not an optimization, it's an incident. So the work split into two campaigns.

**First: eliminate the race conditions.** Concurrent payment processing means multiple goroutines touching shared state — balances, idempotency keys, transaction status. We leaned on Go's race detector in CI and a rule that's boring on purpose: shared state gets one owner, everything else sends messages.

```go
// One goroutine owns the idempotency map; everyone else asks.
type dedupeRequest struct {
	key   string
	reply chan bool // true = first time seen, safe to process
}

func dedupeOwner(requests <-chan dedupeRequest) {
	seen := make(map[string]struct{})
	for req := range requests {
		_, dup := seen[req.key]
		if !dup {
			seen[req.key] = struct{}{}
		}
		req.reply <- !dup
	}
}
```

A goroutine that *owns* the map cannot race on it. The channel is the lock, except it can't be forgotten in an early return.

**Second: make the happy path short.** Profiles, not intuition. `pprof` kept pointing at the same shape of problem — sequential I/O that had no ordering dependency. Fraud check, balance verification, and merchant-config lookup ran one after another; they became a fan-out with a shared deadline, and the p95 dropped accordingly.

The pattern that stuck with me: **latency budgets, allocated explicitly**. 300ms total means the fraud service gets 80ms, the ledger write gets 100ms, and everything else fights over the remainder — and any service that blows its budget fails fast instead of dragging the request past the deadline.

## What fintech taught me that tutorials couldn't

- **Idempotency is the whole game.** Networks retry. Users double-click. If your payment endpoint isn't safe to call twice, it isn't safe to call once.
- **The race detector is cheaper than the postmortem.** Every race we found in CI was an incident that never got a timeline document.
- **Contracts before code.** The Confluence API contracts did more for velocity than any framework choice.

I left Chapa with something better than a line on a CV: the knowledge that I can be handed a system where mistakes cost real money, and ship.
