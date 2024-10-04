# Description

When **Secure Boot** and **vTPM** are enabled together, they provide a strong foundation for protecting your VM from boot attacks. For example, if an attacker attempts to replace the bootloader with a malicious version, Secure Boot will prevent the VM from booting. If the attacker is able to bypass Secure Boot and install a malicious bootloader, vTPM can be used to detect the intrusion and alert you.

## Rationale

Secure Boot and vTPM work together to protect your VM from a variety of boot attacks, including bootkits, rootkits, and firmware rootkits. Not enabling Trusted Launch in Azure VM can lead to increased vulnerability to rootkits and boot-level malware, reduced ability to detect and prevent unauthorized changes to the boot process, and a potential compromise of system integrity and data security.

## Impact

Secure Boot and vTPM are not currently supported for Azure Generation 1 VMs.

**IMPORTANT**: Before enabling Secure Boot and vTPM on a Generation 2 VM which does not already have both enabled, it is highly recommended to create a restore point of the VM prior to remediation.

## Audit

### From Azure Portal

1. Go to `Virtual Machines`.
2. For each VM, under `Settings`, click on `Configuration` on the left blade.
3. Under `Security Type`, make sure security type is not standard and if it is Trusted Launch Virtual Machines then make sure Enable Secure Boot & Enable vTPM are checked.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [97566dd7-78ae-4997-8b36-1c7bfe0d8121](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F97566dd7-78ae-4997-8b36-1c7bfe0d8121) - **Name**: `[Preview]: Secure Boot should be enabled on supported Windows virtual machines`

## Default Value

On Azure Generation 2 VMs, vTPM is enabled by default. Secure Boot is not enabled by default.

## References

1. <https://learn.microsoft.com/en-us/azure/virtual-machines/trusted-launch-existing-vm?tabs=portal>
2. <https://learn.microsoft.com/en-us/azure/virtual-machines/trusted-launch-existing-vm?tabs=portal#enable-trusted-launch-on-existing-vm>
3. <https://learn.microsoft.com/en-us/azure/virtual-machines/trusted-launch#secure-boot>
