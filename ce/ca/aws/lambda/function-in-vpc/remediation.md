# Remediation

## Attach a Lambda Function to a VPC

Configure the Lambda function to run within a Virtual Private Cloud (VPC) by associating it with appropriate subnets and security groups. Ensure the selected subnets have network connectivity to the required resources.

### **From Command Line**

Use the `update-function-configuration` command with the `--vpc-config` parameter:

```sh
aws lambda update-function-configuration \
    --function-name {{function-name}} \
    --vpc-config SubnetIds=subnet-id1,subnet-id2,SecurityGroupIds=sg-id
```

### **Notes**

- Select **private subnets** that provide access to required resources such as Amazon RDS, ElastiCache, or internal services.
- Ensure the associated **security group** allows the necessary inbound and outbound traffic.
- If the function requires outbound internet access, configure a **NAT Gateway** in the VPC.
