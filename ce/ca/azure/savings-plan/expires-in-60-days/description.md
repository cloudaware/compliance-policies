# Description

This policy identifies Azure Savings Plans that expire within the next 60 days.
Savings Plans provide discounted pricing for eligible compute usage in exchange
for an hourly spending commitment.

## Rationale

Reviewing upcoming expirations gives FinOps and workload owners time to assess
current usage and decide whether replacement coverage remains cost effective.
Without that review, eligible usage can revert to pay-as-you-go pricing when a
plan expires.

## Impact

An unplanned expiration can increase compute costs and reduce forecast
accuracy. Purchasing a replacement without validating current demand, scope,
and commitment can instead create unused spend. Each finding requires an owner
review; this policy does not recommend an automatic purchase.

## Audit

The policy marks an *Azure Savings Plan* as `INCOMPLIANT` when its
`Provisioning State` is `Succeeded` and its `Expiry Date Time` falls within
the next 60 days, including the current UTC day.

A plan with a missing provisioning state or expiry date is `UNDETERMINED`. A
plan whose provisioning state is not `Succeeded` is `INAPPLICABLE`. All other
successfully provisioned plans are `COMPLIANT`.
