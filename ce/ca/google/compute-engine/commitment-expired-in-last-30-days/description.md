# Description

This policy identifies Google GCE Commitments that have expired within the last 30 days. It serves as a safeguard to confirm whether expirations were intentional and to alert teams of potential unplanned increases in cloud spending.

## Rationale

While proactively monitoring upcoming expirations is the recommended best practice, this policy provides a reactive safety net. By flagging recently expired commitments, FinOps and cloud management teams can validate whether the expiration was planned or accidental. This enables timely assessment of the financial impact of resources reverting to on-demand pricing and supports corrective action if required.

## Audit

This policy flags a *Google GCE Commitment* is `INCOMPLIANT` if its `Status` is **EXPIRED** and its `End Timestamp` falls within the **last 30 days**.

The *Commitment* is marked as `INAPPLICABLE` if its `Status` is **not** equal to **EXPIRED**.
