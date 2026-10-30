# Description

Ensure that Azure Cosmos DB accounts using the MongoDB API run server version 4.2
or a later Azure-supported version. The setting determines the account's MongoDB API
storage format; it does not evaluate self-managed MongoDB servers or client drivers.

## Rationale

Azure reports lower query and storage costs for the MongoDB API 4.2 storage format.
Migrating an eligible workload can therefore reduce the cost of storing data and
executing queries. This policy identifies a configuration opportunity; it does not
calculate workload-specific savings.

## Impact

The migration creates a new account and moves data; it is not a routine in-place
configuration update. Applications that depend on version-specific behavior can fail
or behave differently after cutover. Plan compatibility testing, data validation,
downtime, rollback, and the temporary cost of running source and target accounts.

## Audit

This policy evaluates the `Kind` and `API Server Version` properties of each *Azure
Cosmos DB Account*.

- `INCOMPLIANT`: the account uses the MongoDB API and its server version is **3.2**,
  **3.6**, or **4.0**.
- `COMPLIANT`: the account uses the MongoDB API and its server version is **4.2**,
  **5.0**, or **6.0**.
- `INAPPLICABLE`: the account does not use the MongoDB API.
- `UNDETERMINED`: the account kind or API server version is unavailable, or the
  version is not yet recognized by this policy.

New Azure-supported versions are deliberately `UNDETERMINED` until this policy is
reviewed and updated, preventing an unfamiliar value from being treated as compliant.
