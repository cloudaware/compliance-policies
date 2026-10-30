# Description

This policy checks whether the latest version of an AWS EC2 Launch Template is configured to require Instance Metadata Service Version 2 (IMDSv2).

## Rationale

IMDSv2 uses session-oriented authentication for instance metadata requests and helps reduce the risk of credential exposure through Server-Side Request Forgery (SSRF) and similar metadata-access attacks.

Launch templates evolve through versioning. If the latest version does not require IMDSv2, newly published template revisions can introduce or preserve weaker metadata access settings. Reviewing the latest version helps ensure the most recent launch template configuration maintains a secure metadata baseline.

## Impact

If the metadata options are left unspecified in the latest launch template version, the effective behavior can depend on inherited defaults rather than an explicit IMDSv2 requirement.

## Audit

This policy flags an *AWS EC2 Launch Template* as `INCOMPLIANT` when its `Latest Version` has:

- `Metadata HTTP Endpoint` set to **disabled**, or
- `Metadata HTTP Tokens` not set to **required**.

An empty `Metadata HTTP Endpoint` value is treated as **enabled**, and an empty `Metadata HTTP Tokens` value is treated as **optional**.

The *AWS EC2 Launch Template* is marked as `UNDETERMINED` when its `Latest Version` is missing from the CMDB.
