# Description

It is recommended to enforce SSL for all incoming connections to SQL database instances.

## Rationale

SQL database connections that are successfully intercepted (MITM) can reveal sensitive data such as credentials, database queries, and query outputs. For security, it is recommended to always use SSL encryption when connecting to your instance. This recommendation is applicable to PostgreSQL, MySQL generation 1, MySQL generation 2, and SQL Server 2017 instances.

## Impact

After enforcing the SSL requirement, existing clients will not be able to communicate with a Cloud SQL database instance unless they use SSL-encrypted connections.

## Audit

This policy flags a *Google SQL Instance* as `INCOMPLIANT` if its `SSL Mode` is **not** set to **ENCRYPTED_ONLY** or **TRUSTED_CLIENT_CERTIFICATE_REQUIRED**.

## Default Value

By default, the parameter `settings: ipConfiguration: sslMode` is not set, which is equivalent to `sslMode:ALLOW_UNENCRYPTED_AND_ENCRYPTED`.

## References

1. <https://cloud.google.com/sql/docs/postgres/configure-ssl-instance/>

## Additional Information

By default, `Settings: ipConfiguration` has no `authorizedNetworks` configured. In that case, even if `sslMode` is not set (equivalent to `sslMode:ALLOW_UNENCRYPTED_AND_ENCRYPTED`), there is no risk because the instance cannot be accessed outside of the network unless `authorizedNetworks` are configured. However, if `sslMode` is not updated to `ENCRYPTED_ONLY`, any `authorizedNetworks` created later will not enforce SSL-only connections.
