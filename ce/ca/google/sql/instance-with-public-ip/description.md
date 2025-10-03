# Description

It is recommended to configure Second Generation Sql instance to use private IPs instead of public IPs.

## Rationale

To lower the organization's attack surface, Cloud SQL databases should not have public IPs. Private IPs provide improved network security and lower latency for your application.

## Impact

Removing the public IP address on SQL instances may break some applications that relied on it for database connectivity.

## Audit

### From Google Cloud Console

1. Go to the Cloud SQL Instances page in the Google Cloud Console: <https://console.cloud.google.com/sql/instances>
2. Ensure that every instance has a private IP address and no public IP address configured.

### From Google Cloud CLI

1. List all Cloud SQL database instances using the following command:

            gcloud sql instances list

2. For every instance of type `instanceType: CLOUD_SQL_INSTANCE` with `backendType: SECOND_GEN`, get detailed configuration. Ignore instances of type `READ_REPLICA_INSTANCE` because these instances inherit their settings from the primary instance. Also, note that first generation instances cannot be configured to have a private IP address.

            gcloud sql instances describe <INSTANCE_NAME>

3. Ensure that the setting `ipAddresses` has an IP address configured of `type: PRIVATE` and has no IP address of `type: PRIMARY`. PRIMARY IP addresses are public addresses. An instance can have both a private and public address at the same time. Note also that you cannot use private IP with First Generation instances.

## Prevention

To prevent new SQL instances from getting configured with public IP addresses, set up a `Restrict Public IP access on Cloud SQL instances` Organization policy at: <https://console.cloud.google.com/iam-admin/orgpolicies/sql-restrictPublicIp>.

## Default Value

By default, Cloud Sql instances have a public IP.

## References

1. <https://cloud.google.com/sql/docs/mysql/configure-private-ip>
2. <https://cloud.google.com/sql/docs/mysql/private-ip>
3. <https://cloud.google.com/resource-manager/docs/organization-policy/org-policy-constraints>
4. <https://console.cloud.google.com/iam-admin/orgpolicies/sql-restrictPublicIp>

## Additional Information

Replicas inherit their private IP status from their primary instance. You cannot configure a private IP directly on a replica.
