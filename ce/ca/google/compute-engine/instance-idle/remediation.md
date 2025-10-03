# Remediation

Before taking action, verify whether the instance is still required. Idle instances may serve non-critical purposes such as development, testing, or periodic workloads.

## Stop the Instance

Stop the instance if it is temporarily not needed but may be required later. This halts billing for compute resources, although storage charges for attached persistent disks will continue.

```sh
gcloud compute instances stop {{instance-name}} --zone={{zone}}
```

## Rightsize the Instance

If the instance is oversized for its workload, resize it to a smaller, more cost-effective machine type.

1. Stop the instance.

2. Change the machine type:

```sh
gcloud compute instances set-machine-type {{instance-name}} \
    --zone={{zone}} \
    --machine-type={{new-machine-type}}
```

3. Restart the instance:

```sh
gcloud compute instances start {{instance-name}} --zone={{zone}}
```

## Delete the Instance

If the instance is no longer required, delete it to eliminate all associated costs. This action is irreversible and will also remove any attached non-boot disks configured for auto-deletion.

```sh
gcloud compute instances delete {{instance-name}} --zone={{zone}}
```

## Considerations

- Create snapshots or images of any critical data before resizing or deleting an instance.
- Confirm that no applications or services depend on the instance before stopping or deleting it.
- Consider using scheduling or automation to stop non-production instances (e.g., development and test environments) outside of business hours.
