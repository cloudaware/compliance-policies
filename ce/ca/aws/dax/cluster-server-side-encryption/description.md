# Description

Ensure that Amazon DynamoDB Accelerator (DAX) clusters have server-side encryption (SSE) enabled to protect data at rest.

## Rationale

Encrypting data at rest provides an additional layer of data protection that helps secure your data from unauthorized access to the underlying storage infrastructure. Many organizations are subject to regulatory or compliance mandates (such as HIPAA, PCI DSS, or GDPR) that require encryption of data at rest. Enabling SSE for DAX ensures alignment with these requirements and improves the overall security posture of cloud-hosted applications.

## Impact

Server-side encryption must be enabled at the time of cluster creation and cannot be modified afterward. To migrate an existing unencrypted cluster to use encryption at rest, you must create a new encrypted cluster and update your application to connect to the new cluster endpoint.

## Audit

This policy marks an *AWS DAX Cluster* as `INCOMPLIANT` if `Server-Side Encryption Status` is set to **DISABLED**.

Cluster using __dax.r3.*__ `Node Type` is flagged as `INAPPLICABLE`, as these instance types do not support encryption at rest.
