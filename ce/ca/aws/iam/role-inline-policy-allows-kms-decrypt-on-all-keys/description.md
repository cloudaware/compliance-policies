# Description

This policy checks whether an IAM role inline policy allows KMS decryption actions on all AWS KMS keys.

## Rationale

IAM role inline policies should follow least privilege and grant access only to the KMS keys that a workload, service, or automation path explicitly requires.

If a role inline policy allows `kms:Decrypt`, `kms:ReEncryptFrom`, or broader KMS decryption-related actions against `*` or wildcard KMS key ARNs, any principal that can assume the role can potentially decrypt data protected by keys outside its intended boundary. This increases the blast radius of role compromise, policy misconfiguration, and privilege escalation.

## Impact

Restricting wildcard KMS access can require updates to applications, automation, cross-service integrations, or delegated administration workflows that currently rely on broad permissions. Before tightening the policy, identify the exact KMS keys the role must use and validate the updated access in a non-production environment when possible.

## Audit

This policy flags an *AWS IAM Role Policy* as `INCOMPLIANT` when all of the following are true:

1. An `Allow` statement grants `kms:Decrypt`, `kms:ReEncryptFrom`, `kms:*`, or `kms:ReEncrypt*`.
2. The same statement applies to all KMS keys by using `*` or a wildcard KMS key ARN such as `arn:aws:kms:us-east-1:123456789012:key/*`.

This policy checks only the `Resource` element and does not take the `Condition` element into account.

## References

1. <https://docs.aws.amazon.com/securityhub/latest/userguide/kms-controls.html#kms-2>
2. <https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html>
3. <https://docs.aws.amazon.com/kms/latest/developerguide/cmks-in-iam-policies.html>
