# Description

This policy identifies AWS S3 Multi-Region Access Points that are not configured to block all public access.

S3 Multi-Region Access Points provide a single global endpoint to access datasets replicated across multiple AWS Regions. Each multi-region access point has its own Block Public Access settings, which serve as a centralized control to prevent accidental data exposure across all associated buckets.

## Rationale

Enabling Block Public Access settings for S3 Multi-Region Access Points is essential because it governs access to data that spans multiple geographic regions. These settings ensure that the global endpoint cannot be used to bypass bucket-level permissions, thereby preventing inadvertent exposure of sensitive data to the public internet.

## Audit

This policy flags an *AWS S3 Multi-Region Access Point* as `INCOMPLIANT` if any of the following settings are not set to **Yes**:

- Block Public ACLs
- Block Public Policy
- Ignore Public ACLs
- Restrict Public Buckets
