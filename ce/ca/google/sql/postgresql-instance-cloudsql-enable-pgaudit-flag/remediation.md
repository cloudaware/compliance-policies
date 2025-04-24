# Remediation

## Initialize the pgAudit flag

### From Google Cloud Console

1. Go to <https://console.cloud.google.com/sql/instances>.
2. Select the instance to open its `Overview` page.
3. Click `Edit`.
4. Scroll down and expand `Flags`.
5. To set a flag that has not been set on the instance before, click `Add item`.
6. Enter `cloudsql.enable_pgaudit` for the flag name and set the flag to `on`.
7. Click `Done`.
8. Click `Save` to update the configuration.
9. Confirm your changes under `Flags` on the `Overview` page.

### From Google Cloud CLI

Run the below command by providing `<INSTANCE_NAME>` to enable `cloudsql.enable_pgaudit` flag.

            gcloud sql instances patch <INSTANCE_NAME> --database-flags cloudsql.enable_pgaudit=on

Note: `RESTART` is required to get this configuration in effect.

Creating the extension

1. Connect to the the server running PostgreSQL or through a SQL client of your choice.
2. If SSHing to the server in the command line open the PostgreSQL shell by typing `psql`
3. Run the following command as a superuser.

            CREATE EXTENSION pgaudit;

## Updating the previously created pgaudit.log flag for your Logging Needs

### From Console

Note: there are multiple options here. This command will enable logging for all databases on a server. Please see the customizing database audit logging reference for more flag options.

1. Go to <https://console.cloud.google.com/sql/instances>.
2. Select the instance to open its `Overview` page.
3. Click `Edit`.
4. Scroll down and expand `Flags`.
5. To set a flag that has not been set on the instance before, click `Add item`.
6. Enter `pgaudit.log=all` for the flag name and set the flag to on.
7. Click `Done`.
8. Click `Save` to update the configuration.
9. Confirm your changes under `Flags` on the `Overview` page.

### From Command Line

Run the command

            gcloud sql instances patch <INSTANCE_NAME> --database-flags \ cloudsql.enable_pgaudit=on,pgaudit.log=all

Determine if logs are being sent to Logs Explorer

1. From the Google Console home page, open the hamburger menu in the top left.
2. In the menu that pops open, scroll down to Logs Explorer under Operations.
3. In the query box, paste the following and search
resource.type="cloudsql_database" logName="projects//logs/cloudaudit.googleapis.com%2Fdata_access" protoPayload.request.@type="type.googleapis.com/google.cloud.sql.audit.v1.PgAuditEntry" If it returns any log sources, they are correctly setup.
