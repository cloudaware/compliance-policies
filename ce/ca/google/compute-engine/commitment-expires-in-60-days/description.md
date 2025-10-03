# Description

This policy identifies Google GCE Commitments that are set to expire within the next 60 days. Commitments provide substantial cost savings compared to pay-as-you-go pricing by committing to one- or three-year terms for various resources.

## Rationale

Proactively tracking upcoming commitment expirations is essential for cost optimization. Allowing a commitment to expire  without renewal can result in a sudden increase in expenses, as associated resources revert to on-demand pricing. Monitoring expirations in advance enables you to continue benefiting from discounted rates while providing sufficient time to evaluate current usage patterns and make informed decisions regarding renewal, modification, or discontinuation of commitments.

## Impact

If a commitment expires without renewal, Covered resources automatically incur charges at the higher pay-as-you-go rate, potentially causing unplanned budget overruns.

Organizations must carefully review commitment usage and align renewal or modification decisions with budget planning and anticipated resource requirements.

## Audit

This policy flags a *Google GCE Commitment* is `INCOMPLIANT` if its `Status` is **ACTIVE** and its `End Timestamp` falls within the **next 60 days**.

The *Commitment* is marked as `INAPPLICABLE` if its `Status` is **not** equal to **ACTIVE**.
