# Remediation

1. Verify the live cluster's deployment type, current broker Kafka version, and state in the Amazon MSK console or with the `describe-cluster-v2` command in the Audit section. Refresh Cloudaware discovery if AWS already completed an automatic upgrade. Serverless versions are managed by AWS; do not apply the Provisioned upgrade procedure to a Serverless cluster.
2. Check the [current AWS support calendar](https://docs.aws.amazon.com/msk/latest/developerguide/supported-kafka-versions.html) and identify a supported target compatible with the cluster's broker type, metadata mode, and tiered-storage configuration. Kafka 4.2 currently requires Express brokers. Do not remove `.kraft` or `.tiered` from identifiers when selecting an upgrade path.
3. Review the available in-place upgrade targets:

   ```sh
   aws kafka get-compatible-kafka-versions \
       --region {{region-name}} \
       --cluster-arn {{cluster-arn}}
   ```

4. Test producer and consumer clients, Kafka Streams applications, connectors, authentication, custom broker configurations, and operational tooling against the target. Confirm replication health and sufficient capacity for rolling broker restarts. Review the metadata migration requirements when moving from ZooKeeper to KRaft; AWS supports in-place migration for eligible upgrade paths. Preserve the required custom configuration and select a compatible configuration revision if it must change.
5. When the cluster is **ACTIVE**, open its **Properties** tab, select **Upgrade** in **Apache Kafka version**, and choose a tested compatible target. Review configuration changes and initiate the upgrade during an approved maintenance window. If AWS offers no compatible in-place path, plan a replacement cluster and a validated data/client migration.
6. Monitor the cluster operation until completion. Verify the new broker version, client traffic, replication, and application health, then refresh Cloudaware discovery and reevaluate the policy.

**Version downgrades and reversal of a completed KRaft migration are not supported.** Prepare recovery before starting: validate retained or replicated data and the client cutover plan for a replacement cluster if in-place recovery is unavailable. For a replacement migration, verify topic configuration, access controls, consumer offsets, data completeness, and application health before retiring the original cluster. Broker restarts can interrupt individual client connections; test retry behavior and follow AWS's high-availability upgrade guidance.
