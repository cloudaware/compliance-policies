# Description

Install endpoint protection for all virtual machines.

## Rationale

Installing endpoint protection systems (like anti-malware for Azure) provides for real-time protection capability that helps identify and remove viruses, spyware, and other malicious software. These also offer configurable alerts when known-malicious or unwanted software attempts to install itself or run on Azure systems.

## Impact

Endpoint protection will incur an additional cost to you.

## Audit

### From Azure Portal

1. Go to `Security Center`.
2. Click the `Recommendations` blade.
3. Ensure that there are no recommendations for `Endpoint Protection not installed on Azure VMs`.

### From Azure CLI

```sh
az vm show -g <MyResourceGroup> -n <MyVm> -d --query "resources[?type=='Microsoft.Compute/virtualMachines/extensions'].{ExtensionName:name}" -o table
```

If extensions are installed, it will list the installed extensions:

```
EndpointSecurity || TrendMicroDSA* || Antimalware || EndpointProtection || SCWPAgent || PortalProtectExtension* || FileSecurity*
```

Alternatively, you can employ your own endpoint protection tool for your OS.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [1f7c564c-0a90-4d44-b7e1-9d456cffaee8](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F1f7c564c-0a90-4d44-b7e1-9d456cffaee8) - **Name**: `Endpoint protection should be installed on your machines`

## Default Value

By default Endpoint Protection is disabled.

## References

1. <https://docs.microsoft.com/en-us/azure/security-center/security-center-install-endpoint-protection>
2. <https://docs.microsoft.com/en-us/azure/security/azure-security-antimalware>
3. <https://docs.microsoft.com/en-us/cli/azure/vm/extension?view=azure-cli-latest#az_vm_extension_list>
4. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-endpoint-security#es-1-use-endpoint-detection-and-response-edr>
