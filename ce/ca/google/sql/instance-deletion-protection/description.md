# Description

Enable deletion protection on Cloud SQL instances that store production or otherwise important data. Deletion protection requires the setting to be explicitly disabled before an instance can be deleted.

## Rationale

Cloud SQL instances without deletion protection can be deleted accidentally or by an actor with sufficient permissions. Requiring an explicit disable step reduces the risk of unintended data loss and improves resilience for critical databases.

## Impact

Deletion protection does not affect database performance or availability. Administrators must disable deletion protection before intentionally deleting an instance.

## Audit

### From Google Cloud CLI

1. List Cloud SQL instances and their deletion protection setting:

    ```sh
    gcloud sql instances list \
        --format="table(name,settings.deletionProtectionEnabled)"
    ```

2. For each instance, verify that deletion protection is enabled:

    ```sh
    gcloud sql instances describe {{instance-name}} \
        --format="value(settings.deletionProtectionEnabled)"
    ```

The command should return `True`.

## Default Value

Deletion protection is not guaranteed to be enabled by default for existing Cloud SQL instances.
