# Remediation

## From Azure Portal

1. Go to `Virtual Machines`.
2. For each VM, under `Settings`, click on `Configuration` on the left blade.
3. Under `Security Type`, select `Trusted Launch Virtual Machines`.
4. Make sure `Enable Secure Boot` & `Enable vTPM` are checked.
5. Click on `Apply`.

**Note**: Trusted launch on existing virtual machines (VMs) is currently not supported for Azure Generation 1 VMs.
