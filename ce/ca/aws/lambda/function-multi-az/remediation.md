# Remediation

## Configure Lambda Function Subnets Across Multiple AZs

Update the Lambda function’s VPC configuration to include subnets from at least two different Availability Zones. This ensures the Lambda service can continue executing the function if one AZ becomes unavailable.

### **From Command Line**

Use the `update-function-configuration` command and specify subnets from multiple AZs in the `--vpc-config` parameter:

```sh
aws lambda update-function-configuration \
    --function-name {{function-name}} \
    --vpc-config SubnetIds=subnet-id1,subnet-id2,SecurityGroupIds=sg-id
```

### **Notes**

- Ensure that the specified subnets reside in **different Availability Zones**.
- Select subnets with network access to required resources such as Amazon RDS, ElastiCache, or internal services.
- Verify that the associated **security group** allows the necessary inbound and outbound traffic.
- If the function requires outbound internet access, ensure the subnets are configured with a **NAT Gateway**.
