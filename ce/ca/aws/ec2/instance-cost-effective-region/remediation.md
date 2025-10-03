# Remediation

Migrating an EC2 instance to a different region is a significant operation that requires careful planning to minimize downtime and ensure application functionality. Before proceeding, confirm whether the current region is required for business reasons such as latency, compliance, or data residency.

If the instance can be moved, follow this general process:

## Step 1: Create an Amazon Machine Image (AMI)

Create an AMI of the existing instance:

```sh
aws ec2 create-image \
    --instance-id {{instance-id}} \
    --name "{{ami-name}}" \
    --description "{{ami-description}}" \
    --no-reboot
```

The `--no-reboot` option avoids downtime during image creation but may result in filesystem inconsistencies. Omit this option if data consistency is critical.

## Step 2: Copy the AMI to the Target Region

Copy the AMI to a more cost-effective region (e.g., us-east-2, us-west-2):

```sh
aws ec2 copy-image \
    --source-image-id {{ami-id}} \
    --source-region {{ami-region}} \
    --region {{destination-region}} \
    --name "{{new-ami-name}}" \
    --description "{{new-ami-description}}"
```

The copy operation must be initiated in the destination Region.

## Step 3: Launch a New Instance from the Copied AMI

Once the AMI is available in the target region, launch a new instance:

```sh
aws ec2 run-instances \
    --image-id {{new-ami-id}} \
    --count 1 \
    --instance-type {{instance-type}} \
    --key-name {{key-pair-name}} \
    --security-group-ids {{security-group-ids}} \
    --subnet-id {{subnet-id}} \
```

Ensure security groups, IAM roles, and networking configurations match or are adapted from the original instance.

## Step 4: Finalize the Migration

1. If the original instance had an Elastic IP, allocate a new Elastic IP in the destination region and associate it with the new instance:

```sh
aws ec2 allocate-address --domain vpc --region {{destination-region}}
```

```sh
aws ec2 associate-address \
    --instance-id {{new-instance-id}} \
    --allocation-id {{allocation-id}} \
    --region {{destination-region}}
```

2. Update DNS records, load balancer target groups, or any configuration pointing to the old instance’s IP address or DNS name.
3. Validate application functionality in the new region to confirm successful migration.

## Step 5: Decommission the Old Instance

After verifying that the new instance is fully operational and serving traffic, terminate the original instance in the higher-cost region:

```sh
aws ec2 terminate-instances --instance-ids {{old-instance-id}}
```
