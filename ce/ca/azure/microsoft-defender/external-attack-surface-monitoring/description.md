# Description

An organization's attack surface is the collection of assets with a public network identifier or URI that an external threat actor can see or access from outside your cloud. It is the set of points on the boundary of a system, a system element, system component, or an environment where an attacker can try to enter, cause an effect on, or extract data from, that system, system element, system component, or environment. The larger the attack surface, the harder it is to protect.

This tool can be configured to scan your organization's online infrastructure such as specified domains, hosts, CIDR blocks, and SSL certificates, and store them in an Inventory. Inventory items can be added, reviewed, approved, and removed, and may contain enrichments ("insights") and additional information collected from the tool's different scan engines and open-source intelligence sources.

A Defender EASM workspace will generate an Inventory of publicly exposed assets by crawling and scanning the internet using Seeds you provide when setting up the tool. Seeds can be FQDNs, IP CIDR blocks, and WHOIS records.

Defender EASM will generate Insights within 24-48 hours after Seeds are provided, and these insights include vulnerability data (CVEs), ports and protocols, and weak or expired SSL certificates that could be used by an attacker for reconnaissance or exploitation.

Results are classified High/Medium/Low and some of them include proposed mitigations.

## Rationale

This tool can monitor the externally exposed resources of an organization, provide valuable insights, and export these findings in a variety of formats (including CSV) for use in vulnerability management operations and red/purple team exercises.

## Impact

Microsoft Defender EASM workspaces are currently available as Azure Resources with a 30-day free trial period but can quickly accrue significant charges. The costs are calculated daily as (Number of "billable" inventory items) x (item cost per day; approximately: $0.017).

Estimated cost is not provided within the tool, and users are strongly advised to contact their Microsoft sales representative for pricing and set a calendar reminder for the end of the trial period.

For an EASM workspace having an Inventory of 5k-10k billable items (IP addresses, hostnames, SSL certificates, etc) a typical cost might be approximately $85-170 per day or $2500-5000 USD/month at the time of publication.

If the workspace is deleted by the last day of a free trial period, no charges are billed.

## Audit

To view Defender EASM workspaces created for your Subscriptions, search for EASM in the Azure Portal using the search box.

## Default Value

Microsoft Defender EASM is an optional, paid Azure Resource that must be created and configured inside a Subscription and Resource Group.

## References

1. <https://learn.microsoft.com/en-us/azure/external-attack-surface-management/>
2. <https://learn.microsoft.com/en-us/azure/external-attack-surface-management/deploying-the-defender-easm-azure-resource?source=recommendations>
3. <https://www.microsoft.com/en-us/security/blog/2022/08/02/microsoft-announces-new-solutions-for-threat-intelligence-and-attack-surface-management/>

## Additional Information

Microsoft added its Defender for External Attack Surface management (EASM) offering to Azure following its 2022 acquisition of EASM SaaS tool company RiskIQ.
