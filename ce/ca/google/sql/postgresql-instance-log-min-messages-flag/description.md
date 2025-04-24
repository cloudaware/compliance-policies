# Description

The `log_min_messages` flag defines the minimum message severity level that is considered as an error statement. Messages for error statements are logged with the SQL statement. Valid values include (from lowest to highest severity) `DEBUG5`, `DEBUG4`, `DEBUG3`, `DEBUG2`, `DEBUG1`, `INFO`, `NOTICE`, `WARNING`, `ERROR`, `LOG`, `FATAL`, and `PANIC`. Each severity level includes the subsequent levels mentioned above. WARNING is considered the best practice setting. Changes should only be made in accordance with the organization's logging policy.

## Rationale

Auditing helps in troubleshooting operational problems and also permits forensic analysis. If `log_min_messages` is not set to the correct value, messages may not be classified as error messages appropriately. An organization will need to decide their own threshold for logging `log_min_messages` flag.

This recommendation is applicable to PostgreSQL database instances.

## Impact

Setting the threshold too low will might result in increased log storage size and length, making it difficult to find actual errors. Setting the threshold to 'Warning' will log messages for the most needed error messages. Higher severity levels may cause errors needed to troubleshoot to not be logged.

Note: To effectively turn off logging failing statements, set this parameter to PANIC.

## Audit

### From Google Cloud Console

1. Go to the Cloud SQL Instances page in the Google Cloud Console by visiting <https://console.cloud.google.com/sql/instances>.
2. Select the instance to open its `Instance Overview` page.
3. Go to the `Configuration` card.
4. Under `Database flags`, check the value of `log_min_messages` flag is in accordance with the organization's logging policy.

### From Google Cloud CLI

1. Use the below command for every Cloud SQL PostgreSQL database instance to verify that the value of `log_min_messages` is in accordance with the organization's logging policy.

            gcloud sql instances describe [INSTANCE_NAME] --format=json | jq '.settings.databaseFlags[] | select(.name=="log_min_messages")|.value'

## Default Value

By default `log_min_messages` is `ERROR`.

## References

1. <https://cloud.google.com/sql/docs/postgres/flags>
2. <https://www.postgresql.org/docs/9.6/runtime-config-logging.html#RUNTIME-CONFIG-LOGGING-WHEN>

## Additional Information

WARNING: This patch modifies database flag values, which may require your instance to be restarted. Check the list of supported flags - <https://cloud.google.com/sql/docs/postgres/flags> - to see if your instance will be restarted when this patch is submitted.

Note: Some database flag settings can affect instance availability or stability and remove the instance from the Cloud SQL SLA. For information about these flags, see Operational Guidelines.

Note: Configuring the above flag does not require restarting the Cloud SQL instance.
