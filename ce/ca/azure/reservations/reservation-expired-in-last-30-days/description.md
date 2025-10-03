# Description

This policy identifies Azure Reservations that have expired within the last 30 days. It acts as a safeguard to verify that expirations were intentional and to alert teams to potential unplanned increases in cloud spending.

## Rationale

Although proactively monitoring upcoming expirations is the recommended best practice, this policy provides a reactive safety net. By identifying recently expired reservations, FinOps and cloud management teams can confirm whether the expiration was intentional or the result of an oversight. This enables timely evaluation of the financial impact of resources reverting to pay-as-you-go pricing and supports corrective action if necessary.

## Audit

This policy flags an *Azure Reservation* is `INCOMPLIANT` if its `Expiry Date` falls within the **last 30 days**.

The *Reservation* is marked as `INAPPLICABLE` if its `Provisioning State` is **not** equal to **Expired** or the `Expiry Date` is **empty**.
