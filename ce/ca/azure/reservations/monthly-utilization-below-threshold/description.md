# Description

This policy identifies successfully provisioned Azure Reservations whose recent
monthly average utilization is below 80%. A utilization record is recent for 40
days from the first day of its **Year Month**.

## Rationale

Azure Reservations are paid commitments. Utilization below 80% indicates that a
material share of the reserved capacity did not receive matching usage during the
reported period. The threshold is a cost-review trigger rather than an Azure
compliance requirement; sustained low utilization can indicate a scope, SKU, or
quantity mismatch and an opportunity to improve future commitment coverage.

## Impact

Changing a Reservation's scope or exchanging or refunding an eligible Reservation
can alter discounts across workloads. Review multiple periods, seasonal demand,
the remaining term, and current Azure exchange and refund rules before acting.

## Audit

This policy evaluates an *Azure Reservation* and its related *Azure Reservation
Utilization* records.

The *Reservation* is marked as `INCOMPLIANT` if:

- `Provisioning State` is **Succeeded**.
- At least one complete related utilization record has a `Year Month` within the
  last 40 days and `Utilization Percentage, Avg` below 80%.
- No complete recent utilization record has `Utilization Percentage, Avg` at or
  above 80%.

The *Reservation* is marked as `INAPPLICABLE` if its `Provisioning State` is not
**Succeeded**.

The *Reservation* is marked as `UNDETERMINED` if:

- `Provisioning State` is empty.
- A related utilization record has missing or invalid required data.
- Recent utilization records occur on both sides of the 80% threshold.
- No complete utilization record is available within the last 40 days.

The *Reservation* is marked as `COMPLIANT` if at least one complete recent
utilization record meets or exceeds 80% and no complete recent record is below
80%. Disappeared Reservations and utilization records are excluded automatically.
