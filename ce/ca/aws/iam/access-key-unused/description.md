# Description

Identify and remove unused IAM access keys to protect AWS resources from unauthorized access. An IAM user access key pair is considered unused if it has not been used for a specified period, in this case, 90 days.

# Rationale

IAM access keys provide programmatic access to AWS resources. Retaining active keys that are no longer in use increases the risk that lost or compromised credentials could be exploited. By evaluating access keys directly (rather than IAM users), security teams can precisely identify which credentials require revocation.

# Audit

This policy flags an *AWS IAM Access Key* as `INCOMPLIANT` if the `Last Used Date` field is **empty** or the date is beyond the past **90 days**.

**Inactive** *Access Keys* are marked as `INAPPLICABLE`.
