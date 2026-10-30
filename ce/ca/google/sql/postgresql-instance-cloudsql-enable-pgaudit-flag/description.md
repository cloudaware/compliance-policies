# Description

Ensure the `cloudsql.enable_pgaudit` database flag for a Cloud SQL PostgreSQL instance is set to `on` to allow centralized logging.

## Rationale

As numerous recommendations in this section involve enabling flags for logging purposes, your organization will need a way to manage these logs. You may have a solution already in place. If you do not, consider installing and enabling the open source pgAudit extension within PostgreSQL and enabling its corresponding flag `cloudsql.enable_pgaudit`. This flag and extension enable database auditing in PostgreSQL through the open-source pgAudit extension. The extension provides detailed session and object logging to comply with government, financial, and ISO standards, and provides auditing capabilities to mitigate threats by monitoring security events on the instance. Enabling the flag and settings later in this recommendation sends these logs to Google Logs Explorer so that you can access them in a central location. This recommendation is applicable only to PostgreSQL database instances.

## Impact

Enabling the pgAudit extension can lead to increased data storage requirements. To ensure durability of pgAudit log records in the event of unexpected storage issues, it is recommended to enable the `Enable automatic storage increases` setting on the instance. Enabling flags via the command line will also overwrite all existing flags, so you should apply all needed flags in the CLI command. Some flags may require a restart of the server to take effect or can break existing functionality, so update your servers during a period of low usage.

## Audit

Determine if the pgAudit flag is set to `on`.

### From Google Cloud Console

1. Go to <https://console.cloud.google.com/sql/instances>.
2. Select the instance to open its `Overview` page.
3. Click `Edit`.
4. Scroll down and expand `Flags`.
5. Ensure that `cloudsql.enable_pgaudit` flag is set to `on`.

### From Google Cloud CLI

Run the command by providing `{{instance-name}}`. Ensure the value of the flag is `on`.

```sh
gcloud sql instances describe {{instance-name}} \
    --format=json | jq '.settings.databaseFlags[] | select(.name=="cloudsql.enable_pgaudit") | .value'
```

Determine if the pgAudit extension is installed.

1. Connect to the server running PostgreSQL or use a SQL client of your choice.
2. Open the PostgreSQL shell by typing `psql`.
3. Run the following command:

    ```sql
    SELECT * FROM pg_extension;
    ```

4. If pgAudit is in this list, it is installed.

Determine if Data Access audit logs are enabled for your project and have sufficient privileges.

1. From the homepage, open the hamburger menu in the top left.
2. Scroll down to `IAM & Admin` and hover over it.
3. In the menu that opens, select `Audit Logs`.
4. In the search box next to `filter`, search for `Cloud Composer API`.
5. Select it, and ensure that both `Admin Read` and `Data Read` are checked.

Determine if logs are being sent to Logs Explorer.

1. From the Google Console home page, open the hamburger menu in the top left.
2. In the menu that pops open, scroll down to Logs Explorer under Operations.
3. In the query box, paste the following and search:

    ```txt
    resource.type="cloudsql_database" logName="projects/{{project-id}}/logs/cloudaudit.googleapis.com%2Fdata_access" protoPayload.request.@type="type.googleapis.com/google.cloud.sql.audit.v1.PgAuditEntry"
    ```

4. If it returns any log sources, they are correctly set up.

## Default Value

By default `cloudsql.enable_pgaudit` database flag is set to `off` and the extension is not enabled.

## References

1. <https://cloud.google.com/sql/docs/postgres/flags#list-flags-postgres>
2. <https://cloud.google.com/sql/docs/postgres/pg-audit#enable-auditing-flag>
3. <https://cloud.google.com/sql/docs/postgres/pg-audit#customizing-database-audit-logging>
4. <https://cloud.google.com/logging/docs/audit/configure-data-access#config-console-enable>

## Additional Information

WARNING: This patch modifies database flag values, which may require your instance to be restarted. Check the list of supported flags - <https://cloud.google.com/sql/docs/postgres/flags> - to see if your instance will be restarted when this patch is submitted.

Note: Configuring the 'cloudsql.enable_pgaudit' database flag requires restarting the Cloud SQL PostgreSQL instance.
