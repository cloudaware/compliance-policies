# Description

This policy identifies Azure Reservations that are set to expire within the next 60 days. Azure Reservations offer substantial cost savings compared to pay-as-you-go pricing by committing to one-year or three-year terms for various resources.

## Rationale

Tracking upcoming reservation expirations is essential for cost optimization. Allowing a reservation to expire without renewal may result in a sudden increase in expenses, as associated resources revert to on-demand pricing. Proactive monitoring ensures organizations continue to benefit from discounted rates while allowing sufficient time to assess current usage patterns and make informed decisions about renewing, modifying, or discontinuing reservations.

## Impact

If a reservation expires without renewal, the covered resources will automatically incur charges at the higher pay-as-you-go rate. This can cause unplanned budget overruns. For reservations that guarantee capacity, expiration may also affect resource availability during peak demand periods.

Organizations must carefully review reservation usage and align renewal or modification decisions with budget planning and future resource requirements.

## Audit

This policy flags an *Azure Reservation* is `INCOMPLIANT` if its `Expiry Date` falls within the **next 60 days**.

The *Reservation* is marked as `INAPPLICABLE` if its `Provisioning State` is **not** equal to **Succeeded** or the `Expiry Date` is **empty**.
