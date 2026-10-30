# Remediation

Verify the entity inventory directly in Azure before changing or deleting the
namespace.

## Verify the Finding

### Azure portal

1. Open **Service Bus namespaces** and select the affected namespace.
2. Under **Entities**, confirm that both **Queues** and **Topics** are empty.

### Azure CLI

List the queues and topics currently reported by Azure:

```sh
az servicebus queue list \
  --namespace-name {{namespace-name}} \
  --resource-group {{resource-group-name}} \
  --subscription {{subscription-id}} \
  --query "[].name" \
  --output tsv

az servicebus topic list \
  --namespace-name {{namespace-name}} \
  --resource-group {{resource-group-name}} \
  --subscription {{subscription-id}} \
  --query "[].name" \
  --output tsv
```

No output from either command confirms that Azure currently reports no queues or
topics. If Azure contains entities that are absent from Cloudaware CMDB, resolve
collection permissions or synchronization before proceeding.

## Review Dependencies

Before remediation:

1. Confirm the namespace owner and whether a deployment is planned.
2. Review geo-disaster-recovery aliases, authorization rules, private endpoints,
   network rules, managed identities, diagnostic settings, resource locks, private
   DNS records, and infrastructure-as-code references.
3. Confirm that applications and automation do not reference the namespace or
   expect to create entities in it.

## Remediate

If the namespace is unused, delete it through the approved change process:

```sh
az servicebus namespace delete \
  --name {{namespace-name}} \
  --resource-group {{resource-group-name}} \
  --subscription {{subscription-id}}
```

If messaging is still required, deploy the required entities or migrate the
workload to an appropriately tiered namespace. Azure Service Bus does not support
an in-place downgrade from Premium, so moving to a lower tier requires a separate
namespace and workload migration.

If the empty Premium namespace is intentionally reserved, document its owner,
business justification, and next review date as an exception.

Deletion is irreversible. Before deleting or migrating, document recovery steps;
afterward, validate message flow, authentication, networking, DNS, monitoring, and
automation.
