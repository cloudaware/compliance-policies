# Description

This policy identifies AWS Accounts that use Shield Advanced but do not grant access for the SRT.

AWS Shield Advanced provides enhanced protections against Distributed Denial of Service (DDoS) attacks. The Shield Response Team (SRT) offers 24/7 support to help customers respond to and mitigate DDoS events. To allow the SRT to access your account and assist during an incident, you must create an IAM role with the `AWSShieldDRTAccessPolicy` managed policy.

## Rationale

Creating a dedicated IAM role for the SRT is a critical step in preparing for a DDoS attack. Without this role, the SRT cannot access your account to analyze traffic, apply mitigations, or assist in your response efforts. Proactively configuring this access ensures that if a DDoS event occurs, the SRT can engage immediately, minimizing downtime and potential impact on your applications.

## Audit

This policy flags an *AWS Account* as `INCOMPLIANT` if `Shield Advanced: State` is set to **ACTIVE** and `Shield Advanced: SRT Support Configured` is set to **No**.

The *Account* is marked as **INAPPLICABLE** if `Shield Advanced: State` is set to **INACTIVE** or the Account's `Role Status: Collector` is not **OK**.
