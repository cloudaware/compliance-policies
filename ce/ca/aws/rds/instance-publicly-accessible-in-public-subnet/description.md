# Description

Ensure and verify that RDS database instances provisioned in your AWS account do restrict unauthorized access in order to minimize security risks. To restrict access to any publicly accessible RDS database instance, you must disable the database Publicly Accessible flag and update the VPC security group associated with the instance.

## Rationale

Ensure that no public-facing RDS database instances are provisioned in your AWS account and restrict unauthorized access in order to minimize security risks. When the RDS instance allows unrestricted access (0.0.0.0/0), everyone and everything on the Internet can establish a connection to your database and this can increase the opportunity for malicious activities such as brute force attacks, PostgreSQL injections, or DoS/DDoS attacks.

## Audit

### From Console

1. Log in to the AWS management console and navigate to the RDS dashboard at <https://console.aws.amazon.com/rds/>.
2. Under the navigation panel, On RDS Dashboard, click `Databases`.
3. Select the RDS instance that you want to examine.
4. Click `Instance Name` from the dashboard, Under `Connectivity and Security`.
5. On the `Security`, check if the `Publicly Accessible` flag status is set to `Yes`.
6. Follow the below-mentioned steps to check database subnet access:

    - In the `networking` section, click the subnet link available under `Subnets`.
    - The link will redirect you to the VPC Subnets page.
    - Select the subnet listed on the page and click the `Route Table` tab from the dashboard bottom panel.
    - If the route table contains any entries with the destination CIDR block set to `0.0.0.0/0` and with an `Internet Gateway` attached, the selected RDS database instance was provisioned inside a public subnet, therefore is not running within a logically isolated environment and can be accessible from the Internet.

7. Repeat steps no. 4 and 5 to determine the type (public or private) and subnet for other RDS database instances provisioned in the current region.
8. Change the AWS region from the navigation bar and repeat the audit process for other regions.

### From Command Line

1. Run `describe-db-instances` command to list all RDS database names, available in the selected AWS region:

```sh
aws rds describe-db-instances --region <region-name> --query 'DBInstances[*].DBInstanceIdentifier'
```

2. The command output should return each database instance `identifier`.
3. Run again `describe-db-instances` command using the `PubliclyAccessible` parameter as query filter to reveal the database instance Publicly Accessible flag status:

```sh
aws rds describe-db-instances --region <region-name> --db-instance-identifier <db-instance-name> --query 'DBInstances[*].PubliclyAccessible'
```

4. Check for the Publicly Accessible parameter status, If the Publicly Accessible flag is set to `Yes`. Then selected RDS database instance is publicly accessible and insecure, follow the below-mentioned steps to check database subnet access
5. Run again `describe-db-instances` command using the RDS database instance identifier that you want to check and appropriate filtering to describe the VPC subnet(s) associated with the selected instance:

```sh
aws rds describe-db-instances --region <region-name> --db-instance-identifier <db-name> --query 'DBInstances[*].DBSubnetGroup.Subnets[]'
```

- The command output should list the subnets available in the selected database subnet group.

6. Run `describe-route-tables` command using the ID of the subnet returned at the previous step to describe the routes of the VPC route table associated with the selected subnet:

```sh
aws ec2 describe-route-tables --region <region-name> --filters "Name=association.subnet-id,Values=<SubnetID>" --query 'RouteTables[*].Routes[]'
```

- If the command returns the route table associated with database instance subnet ID. Check the `GatewayId` and `DestinationCidrBlock` attributes values returned in the output. If the route table contains any entries with the `GatewayId` value set to `igw-xxxxxxxx` and the `DestinationCidrBlock` value set to `0.0.0.0/0`, the selected RDS database instance was provisioned inside a public subnet.

    **OR**
- If the command returns empty results, the route table is implicitly associated with subnet, therefore the audit process continues with the next step

7. Run again `describe-db-instances` command using the RDS database instance identifier that you want to check and appropriate filtering to describe the VPC ID associated with the selected instance:

```sh
aws rds describe-db-instances --region <region-name> --db-instance-identifier <db-name> --query 'DBInstances[*].DBSubnetGroup.VpcId'
```

- The command output should show the VPC ID in the selected database subnet group.

8. Now run `describe-route-tables` command using the ID of the VPC returned at the previous step to describe the routes of the VPC main route table implicitly associated with the selected subnet:

```sh
aws ec2 describe-route-tables --region <region-name> --filters "Name=vpc-id,Values=<VPC-ID>" "Name=association.main,Values=true" --query 'RouteTables[*].Routes[]'
```

- The command output returns the VPC main route table implicitly associated with database instance subnet ID. Check the `GatewayId` and `DestinationCidrBlock` attributes values returned in the output. If the route table contains any entries with the `GatewayId` value set to `igw-xxxxxxxx` and the `DestinationCidrBlock` value set to `0.0.0.0/0`, the selected RDS database instance was provisioned inside a public subnet, therefore is not running within a logically isolated environment and does not adhere to AWS security best practices.

## References

1. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.html>
2. <https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Scenario2.html>
3. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html>
4. <https://aws.amazon.com/rds/faqs/>
