# Description

PostgreSQL can create a temporary file for actions such as sorting, hashing and temporary query results when these operations exceed `work_mem`. The `log_temp_files` flag controls logging names and the file size when it is deleted. Configuring `log_temp_files` to `0` causes all temporary file information to be logged, while positive values log only files whose size is greater than or equal to the specified number of kilobytes. A value of -1 disables temporary file information logging.

## Rationale

If all temporary files are not logged, it may be more difficult to identify potential performance issues that may be due to either poor application coding or deliberate resource starvation attempts.

## Audit

### From Google Cloud Console

This policy flags a *Google SQL Instance* as `INCOMPLIANT` if the **log_temp_files** `Database Flags` is not set to **0**.

The Instance is marked as `INAPPLICABLE` if its not a **PostgreSQL** instance.

## Default Value

By default `log_temp_files` is `-1`.

## References

1. <https://cloud.google.com/sql/docs/postgres/flags>
2. <https://www.postgresql.org/docs/9.6/runtime-config-logging.html#GUC-LOG-TEMP-FILES>

## Additional Information

WARNING: This patch modifies database flag values, which may require your instance to be restarted. Check the list of supported flags - <https://cloud.google.com/sql/docs/postgres/flags> - to see if your instance will be restarted when this patch is submitted.

Note: some database flag settings can affect instance availability or stability and remove the instance from the Cloud SQL SLA. For information about these flags, see the Operational Guidelines.

Note: Configuring the above flag does not require restarting the Cloud SQL instance.
