# Description

This policy identifies AWS S3 Access Points that are not configured to block all public access.

Amazon S3 Access Points simplify managing data access at scale for shared datasets stored in S3. Each access point has its own permissions and network controls, including Block Public Access settings. These settings provide an additional security layer to prevent accidental public exposure of data through the access point.

## Rationale

Keeping  Block Public Access settings enabled for S3 Access Points ensures that, regardless of the underlying bucket policies or object ACLs, the access point will reject all public requests. This helps prevent data leaks caused by misconfigurations and enforces a strict boundary against unauthorized public access.

## Audit

This policy flags an *AWS S3 Access Point* as `INCOMPLIANT` if any of the following settings are not set to **Yes**:

- Block Public ACLs
- Block Public Policy
- Ignore Public ACLs
- Restrict Public Buckets
