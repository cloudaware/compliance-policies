# Remediation

## Plan the upgrade

1. Confirm the domain's current engine family and version, then check the [AWS engine support schedule](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html#what-is-support). Choose a target version within standard support that is available in the domain's AWS Region.
2. List the domain's eligible in-place upgrade targets using the following read-only command. Replace `REGION` and `DOMAIN_NAME` with the domain's values:

   ```sh
   aws opensearch get-compatible-versions \
     --region REGION \
     --domain-name DOMAIN_NAME
   ```

   An eligible target may itself be outside standard support. Check its lifecycle dates before selecting it.

3. Review the [AWS upgrade paths and prerequisites](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/version-migration.html), including breaking changes, clients, ingestion integrations, plugins, index compatibility, cross-cluster connections, and cluster health. Complete any configuration change or engine upgrade already in progress before starting another operation.

A service software or OpenSearch Dashboards update alone does not upgrade the domain's engine.

## Prepare for recovery

Take a manual snapshot and retain a usable pre-upgrade backup. Verify that the recovery plan is compatible with the source and target versions. Test representative queries, ingestion, applications, and monitoring on the target version.

**A completed engine upgrade cannot be downgraded in place.** Prepare and test recovery or migration to a separate domain before changing the production engine.

## Upgrade or migrate the domain

For a domain eligible for an in-place upgrade:

1. Open **Amazon OpenSearch Service > Domains**, select the domain, and choose **Actions > Upgrade**.
2. Run the compatibility check for the selected target and resolve all reported issues.
3. Perform the tested upgrade during an approved maintenance window. Upgrades can take hours, and OpenSearch Dashboards may be unavailable during the process.

Follow any required intermediate upgrades. Moving from OpenSearch 1.3 or 2.x to 3.x requires upgrading to OpenSearch 2.19 first and may require reindexing older indexes.

Elasticsearch 1.5 and 2.3 do not support in-place upgrades. Create a replacement domain running an engine within standard support, then migrate using a tested, compatible snapshot restore, reindexing, or application migration method.

**Verify data completeness and application cutover before deleting the source domain.**

## Verify the result

Confirm the resulting engine version, cluster health, ingestion, search results, application connectivity, and dashboards. Refresh CMDB collection and reevaluate this policy.

If an immediate upgrade is impractical while the engine remains within its published extended support window, document a temporary exception with an owner and migration deadline. Confirm the applicable AWS extended support charges. Once the final support cutoff has passed, verify the domain's actual state in AWS and prioritize migration.
