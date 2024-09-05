# Remediation

## From Command Line

### Modify the Endpoint Port

For each incompliant RDS instance, modify the endpoint port to a non-default value. Ensure the new port is within the allowed range and does not conflict with other services.

Run the following command to modify the port of a specific RDS instance:

```sh
aws rds modify-db-instance 
--db-instance-identifier {{db-instance-identifier}}
--port {{new-port}} 
--apply-immediately
```

Replace `{{db-instance-identifier}}` with the ID of your RDS instance and `{{new-port}}` with the new port number.

To apply changes immediately rather than in the next maintenance window, use the `--apply-immediately` parameter when calling the AWS CLI.

### Update Security Groups

Ensure that the security groups associated with your RDS instances allow inbound traffic on the new port.

Run the following command to update the security group:

```sh
aws ec2 authorize-security-group-ingress 
--group-id {{security-group-id}} 
--protocol tcp 
--port {{new-port}} 
--cidr {{your-cidr-block}}
```

Replace `{{security-group-id}}` with the ID of your security group, `{{new-port}}` with the new port number, and `{{your-cidr-block}}` with your IP range.

### Test Connectivity

After making changes, test the connectivity to your RDS instance using the new port to ensure that applications and users can still connect.
