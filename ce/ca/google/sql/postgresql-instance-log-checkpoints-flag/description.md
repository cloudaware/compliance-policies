# Description

Ensure that the `log_checkpoints` database flag for the Cloud SQL PostgreSQL instance is set to `on`.

## Rationale

Enabling `log_checkpoints` causes checkpoints and restart points to be logged in the server log. Some statistics are included in the log messages, including the number of buffers written and the time spent writing them. This parameter can only be set in the postgresql.conf file or on the server command line. This recommendation is applicable to PostgreSQL database instances.

## Audit

This policy flags a *Google SQL Instance* as `INCOMPLIANT` if the **log_checkpoints** `Database Flags` is not set to **on**.

The Instance is marked as `INAPPLICABLE` if its not a **PostgreSQL** instance.

## Default Value

By default `log_checkpoints` is `off`.

## References

1. <https://cloud.google.com/sql/docs/postgres/flags>
2. <https://www.postgresql.org/docs/9.6/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-WHAT>

## Additional Information

WARNING: This patch modifies database flag values, which may require your instance to be restarted. Check the list of supported flags - <https://cloud.google.com/sql/docs/postgres/flags> - to see if your instance will be restarted when this patch is submitted.

Note: some database flag settings can affect instance availability or stability and remove the instance from the Cloud SQL SLA. For information about these flags, see the Operational Guidelines.

Note: Configuring the above flag does not require restarting the Cloud SQL instance.
