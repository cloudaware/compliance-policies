# Remediation

## Enable Boot Volume In-Transit Encryption

In-transit encryption for boot and block volumes is available only for virtual machine (VM) instances launched from platform images and for bare metal instances that use one of the following shapes:

- `BM.Standard.E3.128`
- `BM.Standard.E4.128`
- `BM.DenseIO.E4.128`

In-transit encryption is not supported on other bare metal instance shapes. If the affected instance does not support changing this setting in place, recreate the instance using a supported configuration and enable in-transit encryption during instance creation.

### **From Oracle Cloud Console**

If the **Use in-transit encryption** option is available for the affected instance, update the instance configuration:

1. Navigate to `https://cloud.oracle.com/compute/instances`.
2. Select the affected instance from the audit results.
3. Click **More actions** or **Actions**.
4. Click **Edit**.
5. Select **Show Advanced Options**.
6. Enable **Use in-transit encryption**.
7. Click **Save changes**.

If the **Use in-transit encryption** option is not available for the affected instance, recreate the instance with boot volume in-transit encryption enabled:

1. Navigate to `https://cloud.oracle.com/compute/instances`.
2. Select the affected instance from the audit results.
3. Click **Terminate**.
4. Determine whether to permanently delete the instance's attached boot volume.
5. Click **Terminate instance**.
6. Click **Create Instance**.
7. Fill in the instance details according to your requirements.
8. In the **Boot volume** section, ensure **Use in-transit encryption** is selected.
9. Fill in the remaining details according to your requirements.
10. Click **Create**.

After remediation, confirm that the updated instance shows boot volume in-transit encryption as enabled in Cloudaware after the next data collection cycle.
