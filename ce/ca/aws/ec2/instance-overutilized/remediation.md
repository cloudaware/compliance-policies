# Remediation

## Right-Size Overutilized Instances

### Change the Instance Type

#### **Key Requirements**

You can only change the instance type of an EC2 instance if:

- It is an EBS-backed instance.
- Its configuration is compatible with the new instance type.

#### **Steps From Command Line**

1. Stop the EC2 Instance

    Before changing the instance type, the instance must be stopped. Use the following command:

    ```sh
    aws ec2 stop-instances --instance-ids {{instance-id}}
    ```

    Replace `{{instance-id}}` with the actual EC2 instance ID.

2. Modify the Instance Type

    After stopping the instance, use the command below to change its type:

    ```sh
    aws ec2 modify-instance-attribute --instance-id {{instance-id}} --instance-type "{\"Value\": \"{{new-instance-type}}\"}"
    ```

    Replace `{{new-instance-type}}` with the desired instance type.

### Migrate to a New Instance Type

If your instance's configuration is incompatible with the new instance type, or if it is an instance store-backed instance, consider these migration steps:

#### **Migration Process Overview**

1. Backup critical data from the original instance.

2. Create a new instance compatible with the desired instance type, and attach any EBS volumes that were attached to your original instance.

3. Install your application on your new instance.

4. Restore any data.

5. If the original instance has an Elastic IP address, you must associate it with your new instance to ensure that your users can continue to use your application without interruption.

## Usage-Based Rightsizing

Identify usage patterns to select the most cost-effective options:

- **Steady-State Usage** – The load remains at a relatively constant level over time, and you can accurately forecast the likely compute load. For this usage pattern, you might consider ***Reserved Instances***, which can provide significant savings.

- **Variable but Predictable Usage** – The load changes, but on a predictable schedule. ***Amazon EC2 Auto Scaling*** is well suited for applications that have stable demand patterns with hourly, daily, or weekly variability in usage. You can use this feature to scale Amazon EC2 capacity up or down when you experience spiky traffic or predictable fluctuations in traffic.
