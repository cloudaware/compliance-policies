# Remediation

## From Azure Portal

1. Go to `Virtual machines`.
2. For each virtual machine, go to `Settings`.
3. Click on `Extensions + applications`.
4. If there are unapproved extensions, uninstall them.

## From Azure CLI

From the audit command identify the unapproved extensions, and use the below CLI command to remove an unapproved extension attached to VM:

```sh
az vm extension delete --resource-group <resourceGroupName> --vm-name <vmName> --name <extensionName>
```

## From PowerShell

For each VM and each insecure extension from the Audit Procedure run the following command:

```ps
Remove-AzVMExtension -ResourceGroupName <ResourceGroupName> -Name <ExtensionName> -VMName <VirtualMachineName>
```
