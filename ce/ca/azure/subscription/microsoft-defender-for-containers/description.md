# Description

Microsoft Defender for Containers helps improve, monitor, and maintain the security of containerized assets—including Kubernetes clusters, nodes, workloads, container registries, and images—across multi-cloud and on-premises environments.

By default, when enabling the plan through the Azure Portal, Microsoft Defender for Containers automatically configures the following components:

- **Agentless scanning for machines**
- **Defender sensor** for runtime protection
- **Azure Policy** for enforcing security best practices
- **K8S API access** for monitoring and threat detection
- **Registry access** for vulnerability assessment

**Note:** Microsoft Defender for Container Registries ('ContainerRegistry') is deprecated and has been replaced by Microsoft Defender for Containers ('Containers').

## Rationale

Enabling Microsoft Defender for Containers enhances defense-in-depth by providing advanced threat detection, vulnerability assessment, and security monitoring for containerized environments, leveraging insights from the Microsoft Security Response Center (MSRC).

## Impact

Microsoft Defender for Containers incurs a charge per vCore. Refer to <https://azure.microsoft.com/en-us/pricing/details/defender-for-cloud/> and <https://azure.microsoft.com/en-us/pricing/calculator/> to estimate potential costs.

## Audit

This policy flags an *Azure Subscription* as `INCOMPLIANT` if the related `Azure Defender Plan` for **Containers** meets any of the following conditions:

- The `Pricing Tier` field is set to **Free**
- The **ContainerRegistriesVulnerabilityAssessments** `Extension` is not **Enabled**
- The **AgentlessDiscoveryForKubernetes** `Extension` is not **Enabled**
- The **AgentlessVmScanning** `Extension` is not **Enabled**
- The **ContainerSensor** `Extension` is not **Enabled**

The *Subscription* is also marked as `INCOMPLIANT` if the *Azure Defender Plan* for **Container Registries** has the `Pricing Tier` set to **Free**, or if either the **Containers** or **Container Registries** **Defender Plan** does **not** exist in the CMDB.

## Default Value

The Microsoft Defender for Containers plan is disabled by default.

## References

1. <https://learn.microsoft.com/en-us/cli/azure/security/pricing>
2. <https://learn.microsoft.com/en-us/powershell/module/az.security/get-azsecuritypricing>
3. <https://learn.microsoft.com/en-us/powershell/module/az.security/set-azsecuritypricing>
4. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/defender-for-containers-introduction>
5. <https://learn.microsoft.com/en-us/azure/defender-for-cloud/tutorial-enable-containers-azure>
6. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-logging-threat-detection#lt-1-enable-threat-detection-capabilities>

## Additional Information

The Azure Policy 'Microsoft Defender for Containers should be enabled' checks only that the `pricingTier` for `Containers` is set to `Standard`. It does not check the status of the plan's components.
