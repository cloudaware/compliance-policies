# Description

This policy identifies AWS KMS Keys whose key policies permit anonymous or unrestricted access.

Specifically, it evaluates key policy statements that grant permissions to all principals (using `*`) without sufficient restrictive conditions to limit access to trusted and authorized AWS identities.

## Rationale

A misconfigured KMS key policy that allows public access can expose sensitive data to unauthorized use. Attackers may be able to decrypt data stored in services such as Amazon S3, RDS, or EBS, or misuse the key to encrypt their own data, potentially associating the key with malicious activities.

Additionally, allowing unrestricted access to administrative actions (for example, `kms:PutKeyPolicy`) could enable an attacker to take full control of the key, modify its policy, and permanently lock out legitimate owners.

## Audit

This policy flags an *AWS KMS key* as `INCOMPLIANT` if its related *KMS Key Policy* allows the following **kms:** actions:

- `kms:Encrypt`
- `kms:Decrypt`
- `kms:ReEncryptFrom`
- `kms:ReEncryptTo`
- `kms:GenerateDataKey`
- `kms:CreateGrant`
- `kms:DescribeKey`
- `kms:EnableKey`
- `kms:PutKeyPolicy`
- `kms:GetKeyPolicy`
- `kms:ScheduleKeyDeletion`
- `kms:CancelKeyDeletion`
- `kms:RotateKeyOnDemand`

to **all principals** (that is, `*`) without appropriate access restrictions.
