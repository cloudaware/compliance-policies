# Remediation

If an instance was launched from a PV AMI, it cannot be directly changed to an HVM-only instance type. Migration to a new instance based on an HVM AMI is required.

## Migration Process Overview

1. Backup critical data from the original instance.
2. Create a new instance using an HVM-compatible AMI that supports the desired instance type, and attach any EBS volumes that were attached to your original instance.
3. Install your application on your new instance.
4. Restore any data.
5. If the original instance has an Elastic IP address, you must associate it with your new instance to ensure that your users can continue to use your application without interruption.

### Data Preservation Considerations

- **Instance Store Volumes**
  - Data stored on instance store volumes is lost when the instance is stopped or terminated.
  - To retain this data, copy it to persistent storage before decommissioning the PV instance.
- Amazon EBS Volumes
  - Amazon EC2 uses the `DeleteOnTermination` attribute to determine whether to delete or retain EBS volumes attached to the instance.
  - To preserve EBS data, ensure the `DeleteOnTermination` attribute is set to false for the desired volumes.
