# Remediation

Remove unrestricted inbound access to Windows Remote Management (WinRM) on TCP ports **5985** and **5986**. Where WinRM is required, restrict access to the approved administrative source IP addresses or CIDR ranges.

**Confirm a working alternative administrative path before changing a rule used by administrators or automation.** For example, establish a VPN or ExpressRoute connection to the virtual machine's private network. Record the existing rule configuration so you can roll back an unintended change.

## From Azure Portal

1. Go to **Network security groups** and select the affected NSG.
2. Under **Settings**, select **Inbound security rules**.
3. Identify **Allow** rules with protocol **TCP** or **Any** that permit traffic from **Any**, **Internet**, `0.0.0.0/0`, or `::/0` to ports **5985**, **5986**, **Any**, or a range containing either port. Review every entry in rules with multiple source prefixes or destination port ranges.
4. Delete a rule dedicated to WinRM if that access is no longer required.
5. If all traffic allowed by the rule can be restricted to administrative networks, set **Source** to **IP Addresses** and enter only the approved addresses or CIDR ranges in **Source IP addresses/CIDR ranges**.
6. For a shared rule that must continue allowing other public traffic, remove WinRM ports from **Destination port ranges**. Replace wildcard or broad ranges with explicit ports or ranges that preserve the required traffic and exclude **5985** and **5986**. Create a separate rule restricted to approved administrative sources if WinRM is still required.
7. Save each edited rule and repeat for all affected rules and NSGs.

## From Azure CLI

Select the intended subscription and replace the placeholders with the appropriate resource names and approved network ranges.

### Review the Rule

Retrieve and record the current rule settings before making changes.

```sh
az network nsg rule show \
    --resource-group "{{resource-group-name}}" \
    --nsg-name "{{nsg-name}}" \
    --name "{{rule-name}}" \
    --output json
```

### Restrict Required WinRM Access

Update the rule's source to an approved administrative address or CIDR range.

```sh
az network nsg rule update \
    --resource-group "{{resource-group-name}}" \
    --nsg-name "{{nsg-name}}" \
    --name "{{rule-name}}" \
    --source-address-prefixes "{{trusted-cidr}}"
```

For multiple approved sources, pass each as a separate argument to `--source-address-prefixes`. This replaces the rule's existing source selection and applies to every destination port allowed by that rule.

### Remove WinRM from a Shared Rule

If the rule must retain public access for other services, update its destination ports to exclude **5985** and **5986**.

**The destination port list replaces the existing selection. Include every port or range that must remain allowed.**

```sh
az network nsg rule update \
    --resource-group "{{resource-group-name}}" \
    --nsg-name "{{nsg-name}}" \
    --name "{{rule-name}}" \
    --destination-port-ranges "{{required-port-or-range}}"
```

Pass each additional required port or range as a separate argument to `--destination-port-ranges`. Configure any required WinRM access in a separate rule restricted to approved administrative sources.

### Delete an Unneeded WinRM Rule

Delete a dedicated WinRM rule when no workload or administrator requires it.

```sh
az network nsg rule delete \
    --resource-group "{{resource-group-name}}" \
    --nsg-name "{{nsg-name}}" \
    --name "{{rule-name}}"
```

## Verification

Review all inbound rules to confirm that no Allow rule still exposes TCP ports **5985** or **5986** to unrestricted public sources, including through wildcard ports, ranges, or multiple-prefix rules.

Test new WinRM connections from the approved administrative networks and confirm that required automation still works. Verify that new connections from unapproved networks are blocked. NSG rule changes can leave established connections active, so use new connections for these checks.

If a change unexpectedly interrupts required access, use the alternative administrative path and the recorded rule settings to roll back the affected change, then correct the source or port selection before retrying.
