# Description

Network Security Groups (NSGs) should be applied to Azure Databricks subnets to control both inbound and outbound network traffic and ensure that only authorized communication is permitted. NSGs operate on a rule-based model that supports explicit allow and deny rules, followed by an implicit deny rule at the end of the rule set. As a result, any traffic not explicitly allowed is automatically blocked.

To promote secure and predictable network behavior, NSGs should include explicit deny rules for known unwanted or non-essential traffic in addition to the default implicit deny. This enhances visibility into blocked traffic, improves auditability, and supports enforcement of the principle of least privilege, thereby reducing the risk of unauthorized access to Databricks resources.

## Rationale

Implementing NSGs with clearly defined allow and deny rules provides transparency and precise control over permitted and restricted network traffic. Although Azure NSGs implicitly deny traffic that is not explicitly allowed, defining explicit deny rules for known malicious or unnecessary sources improves readability of the security configuration, simplifies troubleshooting, and supports regulatory and compliance audits. This layered defense approach strengthens the overall security posture of Azure Databricks environments by limiting communication strictly to required endpoints.

## Impact

- NSGs require ongoing maintenance to ensure rule accuracy and alignment with evolving business and security requirements.
- Misconfigured NSGs, especially overly broad allow rules or missing explicit denies, can inadvertently expose Databricks resources or block legitimate traffic.
- Relying solely on implicit deny may obscure the intent behind traffic restrictions, making it harder to audit or troubleshoot network behavior.

## Audit

This policy flags an *Azure Databricks Workspace* as `INCOMPLAINT` if the Databricks' `Private and Public Network Subnets` and do not have *Network Security Groups (NSGs)* assigned.

## Default Value

By default, Databricks subnets do not have NSGs assigned.

## References

1. <https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/azure-databricks-security-baseline>
2. <https://learn.microsoft.com/en-us/azure/databricks/security/network/classic/vnet-inject#network-security-group-rules>
