# Description

For added security, only install organization-approved extensions on VMs.

## Rationale

Azure virtual machine extensions are small applications that provide post-deployment configuration and automation tasks on Azure virtual machines. These extensions run with administrative privileges and could potentially access anything on a virtual machine. The Azure Portal and community provide several such extensions. Each organization should carefully evaluate these extensions and ensure that only those that are approved for use are actually implemented.

## Impact

Functionality by unsupported extensions will be disabled.

## Audit

### From Azure Portal

1. Go to `Virtual machines`.
2. For each virtual machine, click on the server name to select it go to.
3. In the new column menu, under `Settings` Click on `Extensions + applications`.
4. Ensure that all the listed extensions are approved by your organization for use.

### From Azure CLI

Use the below command to list the extensions attached to a VM, and ensure the listed extensions are approved for use:

```sh
az vm extension list --vm-name <vmName> --resource-group <sourceGroupName> --query [*].name
```

### From PowerShell

Get a list of VMs:

```ps
Get-AzVM
```

For each VM run the following command:

```ps
Get-AzVMExtension -ResourceGroupName <VM Resource Group> -VMName <VM Name>
```

Review each `Name`, `ExtensionType`, and `ProvisioningState` to make sure no unauthorized extensions are installed on any virtual machines.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [c0e996f8-39cf-4af9-9f45-83fbde810432](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fc0e996f8-39cf-4af9-9f45-83fbde810432) - **Name**: `Only approved VM extensions should be installed`

## Default Value

By default, no extensions are added to the virtual machines.

## References

1. <https://docs.microsoft.com/en-us/azure/virtual-machines/windows/extensions-features>
2. <https://docs.microsoft.com/en-us/powershell/module/az.compute/?view=azps-7.5.0#vm-extensions>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-asset-management#am-2-use-only-approved-services>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-asset-management#am-5-use-only-approved-applications-in-virtual-machine>
