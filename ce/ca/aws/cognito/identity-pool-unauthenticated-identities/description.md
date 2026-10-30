# Description

This policy identifies Amazon Cognito identity pools that allow unauthenticated identities.

## Rationale

When unauthenticated identities are enabled, Amazon Cognito can issue temporary AWS credentials to guest users without requiring sign-in through a trusted identity provider. This expands the attack surface and can expose downstream AWS resources if the unauthenticated role is broader than intended or if the application relies on guest sessions more widely than expected.

Even when guest access is used for low-friction onboarding or public-facing features, it weakens identity assurance and reduces accountability for actions performed with the issued credentials. Disabling unauthenticated identities by default helps enforce authenticated access paths and keeps IAM permissions aligned with known, trusted users.

## Audit

This policy flags a *Cognito Identity Pool* as `INCOMPLIANT` when `Allow Unauthenticated Identities` is set to **true**.
