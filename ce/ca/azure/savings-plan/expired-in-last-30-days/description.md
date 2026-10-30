# Description

Review Azure Savings Plans that expired during the previous 30 days to confirm
that the expiration was intentional and that the covered compute usage has an
appropriate pricing commitment.

## Rationale

Azure Savings Plans provide discounted pricing in exchange for a commitment to
an hourly spend on eligible compute services. When a plan expires, eligible
usage reverts to pay-as-you-go pricing unless another commitment applies.
Reviewing recent expirations helps FinOps and workload owners identify missed
renewals and decide whether replacement coverage remains cost effective.

## Impact

An unintended expiration can increase compute costs and reduce forecast
accuracy. Purchasing a replacement without reviewing current usage, scope, and
term can instead create unused commitment. This policy does not recommend an
automatic purchase; each result requires an owner review.

## Audit

The policy marks an *Azure Savings Plan* as `INCOMPLIANT` when its
`Provisioning State` is `Succeeded`, its `Expiry Date Time` is before the
current UTC day, and that date falls within the preceding 30 days.

A plan with a missing provisioning state or expiry date is `UNDETERMINED`. A
plan whose provisioning state is not `Succeeded` is `INAPPLICABLE`. All other
successfully provisioned plans are `COMPLIANT`.
