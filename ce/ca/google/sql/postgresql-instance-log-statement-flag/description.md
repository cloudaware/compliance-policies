# Description

The value of the `log_statement` flag determines the SQL statements that are logged. Valid values are:

- none
- ddl
- mod
- all

The value `ddl` logs all data definition statements. The value `mod` logs all DDL statements, plus data-modifying statements.

Statements are logged after basic parsing is done and the statement type is determined, so this does not log statements with errors. When using extended query protocol, logging occurs after an Execute message is received and values of the Bind parameters are included.

A value of `ddl` is recommended unless otherwise directed by your organization's logging policy.

## Rationale

Auditing helps in forensic analysis. If `log_statement` is not set to the correct value, too many statements may be logged leading to issues in finding the relevant information from the logs, or too few statements may be logged with relevant information missing from the logs. Setting log_statement to align with your organization's security and logging policies facilitates later auditing and review of database activities. This recommendation is applicable to PostgreSQL database instances.

## Impact

Turning on logging will increase the required storage over time. Mismanaged logs may cause your storage costs to increase. Setting custom flags via command line on certain instances will cause all omitted flags to be reset to defaults. This may cause you to lose custom flags and could result in unforeseen complications or instance restarts. Because of this, it is recommended you apply these flags changes during a period of low usage.

## Audit

### From Google Cloud Console

1. Go to the Cloud SQL Instances page in the Google Cloud Console by visiting <https://console.cloud.google.com/sql/instances>.
2. Select the instance to open its `Instance Overview` page.
3. Go to the `Configuration` card.
4. Under `Database flags`, check that the value of the `log_statement` flag is set appropriately.

### From Google Cloud CLI

1. Use the following command for every Cloud SQL PostgreSQL database instance to verify the value of `log_statement`:

    ```sh
    gcloud sql instances describe {{instance-name}} \
        --format=json | jq '.settings.databaseFlags[] | select(.name=="log_statement") | .value'
    ```

## References

1. <https://cloud.google.com/sql/docs/postgres/flags>
2. <https://www.postgresql.org/docs/current/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-WHAT>

## Additional Information

WARNING: This patch modifies database flag values, which may require your instance to be restarted. Check the list of supported flags - <https://cloud.google.com/sql/docs/postgres/flags> - to see if your instance will be restarted when this patch is submitted.

Note: some database flag settings can affect instance availability or stability and remove the instance from the Cloud SQL SLA. For information about these flags, see Operational Guidelines.

Note: Configuring the above flag does not require restarting the Cloud SQL instance.
