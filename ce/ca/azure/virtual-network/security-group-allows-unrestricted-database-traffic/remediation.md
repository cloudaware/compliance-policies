# Remediation

Remove unrestricted inbound access to databases hosted on virtual machines on ports **1433**, **1434**, **1521**, **3306**, **5432**, **6379**, and **27017**. Where database connectivity is required, restrict access to approved application and administrative source IP addresses or CIDR ranges.

**Identify application, monitoring, backup, replication, and administrative clients before changing their NSG rules.** Confirm that required clients can reach the database through an approved network path, such as the virtual network, a peered network, VPN, or ExpressRoute. Record the existing rule configuration and retain a working administrative path for rollback.

## From Azure Portal

1. Go to **Network security groups** and select the affected NSG.
2. Under **Settings**, select **Inbound security rules**.
3. Identify **Allow** rules with protocol **TCP**, **UDP**, or **Any** that permit traffic from **Any**, **Internet**, `0.0.0.0/0`, or `::/0` to any of the database ports listed above, **Any** port, or a range containing any of those ports. Review every entry in rules with multiple source prefixes or destination port ranges.
4. Delete a rule dedicated to database access if that access is no longer required.
5. If all traffic allowed by the rule can be restricted to approved client networks, set **Source** to **IP Addresses** and enter only the approved addresses or CIDR ranges in **Source IP addresses/CIDR ranges**.
6. For a shared rule that must continue allowing other public traffic, remove the database ports from **Destination port ranges**. Replace wildcard or broad ranges with explicit ports or ranges that preserve the required traffic and exclude all assessed database ports. Create separate rules restricted to approved client sources for any required database access.
7. Save each edited rule and repeat for all affected rules and NSGs.

## From Azure CLI

Select the intended subscription and replace the placeholders with the appropriate resource names and approved client network ranges.

### Review the Rule

Retrieve and record the current rule settings before making changes.

```sh
az network nsg rule show \
    --resource-group "{{resource-group-name}}" \
    --nsg-name "{{nsg-name}}" \
    --name "{{rule-name}}" \
    --output json
```

### Restrict Required Database Access

Update the rule's source to an approved application or administrative address or CIDR range.

```sh
az network nsg rule update \
    --resource-group "{{resource-group-name}}" \
    --nsg-name "{{nsg-name}}" \
    --name "{{rule-name}}" \
    --source-address-prefixes "{{trusted-cidr}}"
```

For multiple approved sources, pass each as a separate argument to `--source-address-prefixes`. This replaces the rule's existing source selection and applies to every destination port allowed by that rule.

### Remove Database Ports from a Shared Rule

If the rule must retain public access for other services, update its destination ports to exclude **1433**, **1434**, **1521**, **3306**, **5432**, **6379**, and **27017**.

**The destination port list replaces the existing selection. Include every port or range that must remain allowed.**

```sh
az network nsg rule update \
    --resource-group "{{resource-group-name}}" \
    --nsg-name "{{nsg-name}}" \
    --name "{{rule-name}}" \
    --destination-port-ranges "{{required-port-or-range}}"
```

Pass each additional required port or range as a separate argument to `--destination-port-ranges`. Configure any required database access in separate rules restricted to approved client sources.

### Delete an Unneeded Database Rule

Delete a dedicated database rule when no application, administrative tool, or supporting service requires it.

```sh
az network nsg rule delete \
    --resource-group "{{resource-group-name}}" \
    --nsg-name "{{nsg-name}}" \
    --name "{{rule-name}}"
```

## Verification

Review all inbound rules to confirm that no Allow rule with protocol TCP, UDP, or Any still exposes the assessed database ports to unrestricted public sources, including through wildcard ports, ranges, or multiple-prefix rules.

Test new database connections from approved client networks. Confirm that application health checks, monitoring, backups, and replication continue to work, and verify that new connections from unapproved networks are blocked. NSG rule changes can leave established connections active, so use new connections for these checks.

If a change unexpectedly interrupts required connectivity, use the retained administrative path and recorded rule settings to roll back the affected change, then correct the source or port selection before retrying.
