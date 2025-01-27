# Remediation

**IMPORTANT**: Before taking any action, ensure critical data and configurations are backed up. Carefully evaluate idle instances to avoid disrupting essential workloads or losing valuable resources.

## From Command Line

### Stop Idle Instances

#### **Prerequisites**

- Verify that the root device of the instance is an EBS volume. You can't stop instances with instance store root device.

- **Warning**: When you stop an instance, the data on any instance store volumes is erased. Before you stop an instance, verify that you've copied any data that you need from the instance store volumes to persistent storage, such as Amazon EBS or Amazon S3.

Stop idle instances to retain their configurations for potential future use:

```sh
aws ec2 stop-instances --instance-ids {{instance-id}}
```

If applicable, initiate hibernation using the `--hibernate` flag for On-Demand or Spot Instances. Hibernation is supported only for EBS-backed instances that are enabled for hibernation and meet the prerequisites. Hibernation saves the contents of the RAM to the Amazon EBS root volume.

### Terminate Idle Instances (If No Longer Needed)

If an instance is no longer needed, terminate it to free up resources and reduce costs. Use the following command:

```sh
aws ec2 terminate-instances --instance-ids {{instance-id}}
```

#### **Data Preservation Considerations**

- **Instance Store Volumes**: Data on instance store volumes is not retained after instance termination. If you need this data, manually copy it to persistent storage, such as an Amazon EBS volume, Amazon S3 bucket, or Amazon EFS file system, before termination.
- **Amazon EBS Volumes**:
  - Amazon EC2 uses the `DeleteOnTermination` attribute to determine whether to delete or retain EBS volumes attached to the instance.
  - To preserve EBS data, ensure the `DeleteOnTermination` attribute is set to false for the desired volumes.
