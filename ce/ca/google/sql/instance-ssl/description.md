# Description

It is recommended to enforce all incoming connections to SQL database instance to use SSL.

## Rationale

SQL database connections if successfully trapped (MITM); can reveal sensitive data like credentials, database queries, query outputs etc. For security, it is recommended to always use SSL encryption when connecting to your instance. This recommendation is applicable for Postgresql, MySql generation 1, MySql generation 2 and SQL Server 2017 instances.

## Impact

After enforcing SSL requirement for connections, existing client will not be able to communicate with Cloud SQL database instance unless they use SSL encrypted connections to communicate to Cloud SQL database instance.

## Audit

This policy flags a *Google SQL Instance* as `INCOMPLIANT` if its `SSL Mode` is **not** set either to **ENCRYPTED_ONLY** or **TRUSTED_CLIENT_CERTIFICATE_REQUIRED**.

## Default Value

By default parameter `settings: ipConfiguration: sslMode` is not set which is equivalent to `sslMode:ALLOW_UNENCRYPTED_AND_ENCRYPTED`.

## References

1. <https://cloud.google.com/sql/docs/postgres/configure-ssl-instance/>

## Additional Information

By default `Settings: ipConfiguration` has no `authorizedNetworks` set/configured. In that case even if by default `sslMode` is not set, which is equivalent to `sslMode:ALLOW_UNENCRYPTED_AND_ENCRYPTED` there is no risk as instance cannot be accessed outside of the network unless `authorizedNetworks` are configured. However, If default for `sslMode` is not updated to `ENCRYPTED_ONLY` any `authorizedNetworks` created later on will not enforce SSL only connection.
