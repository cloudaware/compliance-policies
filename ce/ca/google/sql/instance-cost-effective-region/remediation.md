# Remediation

## Migrate a Google Cloud SQL Instance to Another Region

The following procedure outlines how to migrate a Cloud SQL instance from one region to another by creating a cross-region replica and promoting it to a standalone instance.

### 1. Verify Primary Instance Status

Check whether the instance is already a replica and confirm that backups are enabled:

```sh
gcloud sql instances describe {{primary-instance-name}}
```

* If `databaseReplicationEnabled: true`, the instance is a replica — you cannot create a replica of a replica.

### 2. Create a Cross-Region Replica

```sh
gcloud sql instances create {{replica-instance-name}} \
  --master-instance-name={{primary-instance-name}} \
  --region={{target-region}}
```

### 3. Prepare for Promotion

Before promoting the replica:

* Stop all writes to the primary.
* Verify the replica is replicating and wait for replication lag to reach **0** (`Seconds_Behind_Master = 0`).

### 4. Promote the Replica

```sh
gcloud sql instances promote-replica {{replica-instance-name}}
```

The replica is now an independent Cloud SQL instance in the target region.

### 5. Post-Migration Tasks

* Enable high availability (HA) on the promoted instance if required.
* Reconfigure networking, IAM policies, and failover settings.
* Update applications and connection strings to use the new instance endpoint.
