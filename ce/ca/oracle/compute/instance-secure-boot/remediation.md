# Remediation

## Recreate the Instance with Secure Boot Enabled

Existing OCI compute instances cannot be converted in place to Shielded instances with Secure Boot enabled. To remediate this finding, replace the affected instance with a new compatible Shielded instance that has Secure Boot enabled at launch.

Before remediation, review workload compatibility and availability requirements:

- Secure Boot is not available for every instance shape or operating system image.
- Secure Boot can prevent startup if the image, bootloader, kernel modules, or drivers are not compatible with Secure Boot verification.
- Shielded instances with Secure Boot do not support live migration because the hardware TPM is not migratable.
- During OCI infrastructure maintenance, an instance that cannot live migrate might experience an outage instead of being moved to a healthy host with minimal disruption.

### **From Oracle Cloud Console**

1. Identify the affected instance, its image, shape, boot volume, attached block volumes, VNICs, network configuration, metadata, tags, and application dependencies.
2. Confirm that the target shape and operating system image support Shielded instances with Secure Boot.
3. Create a backup, custom image, or other approved recovery artifact for the workload.
4. Plan a maintenance window because remediation requires replacing the instance and may cause downtime.
5. Launch a new compatible instance with Shielded instance options enabled and Secure Boot turned on.
6. Reattach or recreate required storage, networking, IAM, monitoring, and application configuration.
7. Validate the workload on the replacement instance.
8. Move traffic to the replacement instance, then terminate the original non-compliant instance after rollback risk is accepted.
