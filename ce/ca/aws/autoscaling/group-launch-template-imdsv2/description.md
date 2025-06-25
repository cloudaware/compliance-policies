# Description

Ensure that the AWS EC2 Auto Scaling Group uses a Launch Template which is configured to enforce the use of Instance Metadata Service Version 2 (IMDSv2).

IMDSv2 is a session-oriented metadata retrieval mechanism that issues time-limited tokens, significantly reducing the risk of unauthorized metadata and IAM credential exposure.

## Rationale

Enforcing IMDSv2 mitigates common attack vectors, such as Server-Side Request Forgery (SSRF) and improperly configured application firewalls, that could otherwise be exploited to steal instance metadata and associated IAM credentials. By requiring a session token, IMDSv2 ensures that metadata access is granted only to authenticated processes running on the instance.

## Impact

If you leave the metadata version unspecified, the configuration will be determined by the defaults of the account and AMI levels which might be without explicit IMDSv2 requirement.

## Audit

This policy flags an *AWS EC2 Auto Scaling Group* as `INCOMPLIANT` if the related `Launch Template` (or `Mixed Instances Launch Template`) has the `Latest Version` with:

- `Metadata HTTP Endpoint` field set to **disabled**, and
- `Metadata HTTP Tokens` field **NOT** set to **required**.

By default, an empty `Metadata HTTP Endpoint` field is an equivalent to **enabled**, and an empty `Metadata HTTP Tokens` field is an equivalent to **optional**.

The *AWS EC2 Auto Scaling Group* is marked as `INAPPLICABLE` if the ASG uses Launch Configurations instead of Launch Templates. AWS is phasing out support for Launch Configurations and migration to Launch Templates is recommended.

The *AWS EC2 Auto Scaling Group* is marked as `UNDETERMINED` if the ASG references an `AWS EC2 Launch Template` or its `AWS EC2 Launch Template Version` that is missing from the CMDB.
