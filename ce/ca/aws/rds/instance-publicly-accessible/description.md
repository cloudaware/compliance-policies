# Description

Ensure that RDS database instances provisioned in your AWS account restrict unauthorized access to minimize security risks. To restrict access to any publicly accessible RDS database instance, disable the Publicly Accessible flag and update the VPC security group associated with the instance.

## Rationale

Ensure that no public-facing RDS database instances are provisioned in your AWS account to minimize security risks. When an RDS instance allows unrestricted access (0.0.0.0/0), anyone on the Internet can establish a connection to your database, increasing the likelihood of malicious activity such as brute force attacks, PostgreSQL injections, or DoS/DDoS attacks.

## Audit

### From Console

1. Log in to the AWS Management Console and navigate to the RDS dashboard at <https://console.aws.amazon.com/rds/>.
2. In the navigation panel, click `Databases`.
3. Select the RDS instance that you want to examine.
4. Click the instance name from the dashboard, then under `Connectivity and Security`.
5. In the `Security` section, check whether the `Publicly Accessible` flag status is set to `Yes`.
6. Follow these steps to check database subnet access:

    - In the `networking` section, click the subnet link available under `Subnets`.
    - The link will redirect you to the VPC Subnets page.
    - Select the subnet listed on the page and click the `Route Table` tab from the dashboard bottom panel.
    - If the route table contains any entries with the destination CIDR block set to `0.0.0.0/0` and with an `Internet Gateway` attached, the selected RDS database instance was provisioned inside a public subnet, therefore is not running within a logically isolated environment and can be accessible from the Internet.

7. Repeat steps 4 and 5 to determine the type (public or private) and subnet for other RDS database instances provisioned in the current region.
8. Change the AWS Region from the navigation bar and repeat the audit process for other regions.

### From Command Line

1. Run the `describe-db-instances` command to list all RDS database names available in the selected AWS Region:

    ```sh
    aws rds describe-db-instances --region {{region}}  --query 'DBInstances[*].DBInstanceIdentifier'
    ```

2. The command output should return each database instance `identifier`.
3. Run the `describe-db-instances` command again using the `PubliclyAccessible` parameter as a query filter to reveal the database instance Publicly Accessible flag status:

    ```sh
    aws rds describe-db-instances --region {{region}}  --db-instance-identifier {{db-instance-name}} --query 'DBInstances[*].PubliclyAccessible'
    ```

4. Check the Publicly Accessible parameter status. If the Publicly Accessible flag is set to `Yes`, the selected RDS database instance is publicly accessible and insecure. Follow these steps to check database subnet access.
5. Run the `describe-db-instances` command again using the RDS database instance identifier that you want to check and appropriate filtering to describe the VPC subnet(s) associated with the selected instance:

    ```sh
    aws rds describe-db-instances --region {{region}}  --db-instance-identifier {{db-name}} --query 'DBInstances[*].DBSubnetGroup.Subnets[]'
    ```

    - The command output should list the subnets available in the selected database subnet group.

6. Run the `describe-route-tables` command using the ID of the subnet returned in the previous step to describe the routes of the VPC route table associated with the selected subnet:

    ```sh
    aws ec2 describe-route-tables --region {{region}}  --filters "Name=association.subnet-id,Values={{subnet-id}}" --query 'RouteTables[*].Routes[]'
    ```

    - If the command returns the route table associated with the database instance subnet ID, check the `GatewayId` and `DestinationCidrBlock` attribute values returned in the output. If the route table contains any entries with the `GatewayId` value set to `igw-xxxxxxxx` and the `DestinationCidrBlock` value set to `0.0.0.0/0`, the selected RDS database instance was provisioned inside a public subnet.

        **OR**
    - If the command returns empty results, the route table is implicitly associated with the subnet, so the audit process continues with the next step

7. Run the `describe-db-instances` command again using the RDS database instance identifier that you want to check and appropriate filtering to describe the VPC ID associated with the selected instance:

    ```sh
    aws rds describe-db-instances --region {{region}}  --db-instance-identifier {{db-name}} --query 'DBInstances[*].DBSubnetGroup.VpcId'
    ```

    - The command output should show the VPC ID in the selected database subnet group.

8. Now run the `describe-route-tables` command using the ID of the VPC returned in the previous step to describe the routes of the VPC main route table implicitly associated with the selected subnet:

    ```sh
    aws ec2 describe-route-tables --region {{region}}  --filters "Name=vpc-id,Values={{vpc-id}}" "Name=association.main,Values=true" --query 'RouteTables[*].Routes[]'
    ```

    - The command output returns the VPC main route table implicitly associated with the database instance subnet ID. Check the `GatewayId` and `DestinationCidrBlock` attribute values returned in the output. If the route table contains any entries with the `GatewayId` value set to `igw-xxxxxxxx` and the `DestinationCidrBlock` value set to `0.0.0.0/0`, the selected RDS database instance was provisioned inside a public subnet, therefore it is not running within a logically isolated environment and does not adhere to AWS security best practices.

## References

1. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.html>
2. <https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Scenario2.html>
3. <https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html>
4. <https://aws.amazon.com/rds/faqs/>
