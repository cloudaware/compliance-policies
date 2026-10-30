# Description

This policy identifies successfully provisioned Azure Savings Plans with at least
one complete utilization record below 80% in the last 40 days.

## Rationale

Low utilization means part of the hourly commitment was not consumed by eligible
compute usage during a recent reporting period. Persistent underutilization can
indicate an oversized future commitment or a mismatch between the commitment and
eligible demand.

## Impact

Savings Plan commitments cannot be changed after purchase. A single historical
period is evidence for review, not proof that current or future demand is too low.

## Audit

The policy marks an *Azure Savings Plan* as `INCOMPLIANT` when its
`Provisioning State` is `Succeeded` and at least one related *Azure Savings Plan
Utilization* record has a `Usage Date` within the last 40 days and
`Utilization Percentage, Avg` below 80%.

A plan with a missing provisioning state is `UNDETERMINED`. A successfully
provisioned plan is also `UNDETERMINED` when a related utilization record has no
`Usage Date`, a record within the last 40 days has no
`Utilization Percentage, Avg`, or no complete utilization record is available
within that period.

A plan whose provisioning state is not `Succeeded` is `INAPPLICABLE`. All other
successfully provisioned plans with complete utilization records in the last 40
days are `COMPLIANT`. Disappeared plans and utilization records are excluded
automatically.
