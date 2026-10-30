# Remediation

## Prepare a supported upgrade

1. Open the broker in the Amazon MQ console in its AWS Region. Review the current engine version, pending changes, deployment mode, instance type, maintenance window, and any action-required codes.
2. Check the Amazon MQ support calendar for the broker's engine. List the available versions for its Region and instance type:

   ```bash
   aws mq describe-broker-instance-options \
     --region REGION \
     --engine-type ENGINE_TYPE \
     --host-instance-type INSTANCE_TYPE
   ```

   Replace `REGION` and `INSTANCE_TYPE` with the broker's values. Set `ENGINE_TYPE` to `ACTIVEMQ` or `RABBITMQ`.

3. Select an available, supported target version. Test producers, consumers, authentication, and broker configuration against it. For cross-Region replication pairs, coordinate both brokers' upgrades and verify replication health.
4. Follow the engine's supported upgrade sequence and complete its prerequisites.

### RabbitMQ upgrade requirements

- Minor upgrades cannot skip intermediate minor versions.
- RabbitMQ 3.13 can upgrade in place to 4.2, followed by 4.3. A direct upgrade from 3.13 to 4.3 is not supported.
- RabbitMQ 4 requires an `mq.m7g` instance type.
- Before upgrading to 4.2, complete AWS's prerequisites, including migrating classic mirrored queues and leaving Khepri disabled until the managed upgrade.

## Plan downtime and recovery

**Plan for service interruptions.** Single-instance brokers are unavailable during reboot. RabbitMQ 3-to-4 upgrades block all broker connections, including on clusters. High availability does not eliminate upgrade downtime.

Reduce queue depth, preserve broker configuration and queue definitions, and prepare a tested message migration and recovery plan. **Queue definitions do not back up messages.**

If an in-place upgrade is unavailable, plan a replacement broker and client cutover. Retain the source broker until message delivery and recovery are verified. Do not rely on an engine downgrade as a rollback strategy.

## Apply the upgrade

### Using the AWS Management Console

1. On the broker details page, choose **Edit**. Under **Specifications**, select the supported **Broker engine version**.
2. Enable automatic minor version upgrades. AWS requires this setting when upgrading to ActiveMQ 5.18 or later or RabbitMQ 3.13 or later.
3. Choose **Schedule modifications**. Select **After the next reboot** to apply the upgrade during the next scheduled maintenance window, or **Immediately** to reboot and upgrade during an approved interruption window.
4. Review all pending modifications, then choose **Apply**. A reboot can apply other pending changes as well.

### Using the AWS CLI

Replace `REGION`, `BROKER_ID`, and `SUPPORTED_VERSION` with the broker's Region, ID, and selected target version. Schedule the upgrade:

```bash
aws mq update-broker \
  --region REGION \
  --broker-id BROKER_ID \
  --engine-version SUPPORTED_VERSION \
  --auto-minor-version-upgrade
```

To apply pending modifications before the next maintenance window, reboot the broker during the planned interruption window:

```bash
aws mq reboot-broker \
  --region REGION \
  --broker-id BROKER_ID
```

## Verify the upgrade

After the upgrade completes, inspect the broker in the console or run:

```bash
aws mq describe-broker \
  --region REGION \
  --broker-id BROKER_ID
```

Confirm that the current engine version matches the supported target, the broker is in its expected state, and replication is healthy where applicable. Verify that clients reconnect and messages are delivered. A pending version alone does not complete remediation.

If an overdue broker cannot be upgraded, contact AWS Support to resolve the blocked upgrade.
