# Remediation

## From Azure Portal

1. Go to `Microsoft Defender for Cloud`.
2. Under `Management`, select `Environment Settings`.
3. Click on the subscription name.
4. Under `Settings`, click `Defender plans`.
5. Under `Cloud Workload Protection (CWP)`, in the row for `Containers`, click `On` in the `Status` column.
6. If `Monitoring coverage` displays `Partial`, click `Settings` under `Partial`.
7. Set the status of each of the components to `On`.
8. Click `Continue`.
9. Click `Save`.
10. Repeat steps 1-9 for each subscription.

## From Azure CLI

**Note**: Microsoft Defender for Container Registries ('ContainerRegistry') is deprecated and has been replaced by Microsoft Defender for Containers ('Containers').

Run the below command to enable the Microsoft Defender for Containers plan and its components:

```sh
az security pricing create -n 'Containers' --tier 'standard' --extensions name=ContainerRegistriesVulnerabilityAssessments isEnabled=True --extensions name=AgentlessDiscoveryForKubernetes isEnabled=True --extensions name=AgentlessVmScanning isEnabled=True --extensions name=ContainerSensor isEnabled=True
```

## From PowerShell

**Note**: Microsoft Defender for Container Registries ('ContainerRegistry') is deprecated and has been replaced by Microsoft Defender for Containers ('Containers').

Run the below command to enable the Microsoft Defender for Containers plan and its components:

```ps
Set-AzSecurityPricing -Name 'Containers' -PricingTier 'Standard' -Extension '[{"name":"ContainerRegistriesVulnerabilityAssessments","isEnabled":"True"},{"name":"AgentlessDiscoveryForKubernetes","isEnabled":"True"},{"name":"AgentlessVmScanning","isEnabled":"True"},{"name":"ContainerSensor","isEnabled":"True"}]'
```
