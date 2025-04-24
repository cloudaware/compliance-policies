# Description

Enabling the `log_disconnections` setting logs the end of each session, including the session duration.

## Rationale

PostgreSQL does not log session details such as duration and session end by default. Enabling the `log_disconnections` setting will create log entries at the end of each session which can be useful in troubleshooting issues and determine any unusual activity across a time period. The `log_disconnections` and `log_connections` work hand in hand and generally, the pair would be enabled/disabled together. This recommendation is applicable to PostgreSQL database instances.

## Impact

Turning on logging will increase the required storage over time. Mismanaged logs may cause your storage costs to increase. Setting custom flags via command line on certain instances will cause all omitted flags to be reset to defaults. This may cause you to lose custom flags and could result in unforeseen complications or instance restarts. Because of this, it is recommended you apply these flags changes during a period of low usage.

## Audit

### From Google Cloud Console

1. Go to the Cloud SQL Instances page in the Google Cloud Console by visiting <https://console.cloud.google.com/sql/instances>.
2. Select the instance to open its `Instance Overview` page
3. Go to the `Configuration` card.
4. Under `Database flags`, check the value of `log_disconnections` flag is configured as expected.

### From Google Cloud CLI

1. Ensure the below command returns `on` for every Cloud SQL PostgreSQL database instance:

            gcloud sql instances list --format=json | jq '.[].settings.databaseFlags[] | select(.name=="log_disconnections")|.value'

## Default Value

By default `log_disconnections` is off.

## References

1. <https://cloud.google.com/sql/docs/postgres/flags>
2. <https://www.postgresql.org/docs/9.6/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-WHAT>

## Additional Information

WARNING: This patch modifies database flag values, which may require your instance to be restarted. Check the list of supported flags - <https://cloud.google.com/sql/docs/postgres/flags> - to see if your instance will be restarted when this patch is submitted.

Note: some database flag settings can affect instance availability or stability and remove the instance from the Cloud SQL SLA. For information about these flags, see Operational Guidelines.

Note: Configuring the above flag does not require restarting the Cloud SQL instance.
