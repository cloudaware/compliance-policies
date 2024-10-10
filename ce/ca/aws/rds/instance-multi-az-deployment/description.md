# Description

Amazon RDS offers Multi-AZ deployments that provide enhanced availability and
durability for your databases, using synchronous replication to replicate data to a
standby instance in a different Availability Zone (AZ). In the event of an infrastructure
failure, Amazon RDS automatically fails over to the standby to minimize downtime and
ensure business continuity.

## Rationale

Database availability is crucial for maintaining service uptime, particularly for
applications that are critical to the business. Implementing Multi-AZ deployments with
Amazon RDS ensures that your databases are protected against unplanned outages
due to hardware failures, network issues, or other disruptions. This configuration
enhances both the availability and durability of your database, making it a highly
recommended practice for production environments.

## Impact

Multi-AZ deployments may increase costs due to the additional resources required to
maintain a standby instance; however, the benefits of increased availability and reduced
risk of downtime outweigh these costs for critical applications.

## Audit

### From Console

1. Login to the AWS Management Console and open the RDS dashboard.
2. In the navigation pane, under `Databases`, select the RDS instance you want to examine.
3. Click the `Instance Name` to see details, then navigate to the `Configuration` tab.
4. Under the `Availability & Durability` section, check the `Multi-AZ` status.
    - If Multi-AZ deployment is enabled, it will display `Yes`.
    - If it is disabled, the status will display `No`.
5. Repeat steps 2-4 to verify the Multi-AZ status of other RDS instances in the same region.
6. Change the region from the top of the navigation bar and repeat the audit for other regions.

### From Command Line

1. Run the following command to list all RDS instances in the selected AWS region:

```sh
aws rds describe-db-instances --region <region-name> --query
'DBInstances[*].DBInstanceIdentifier'
```

2. Run the following command using the instance identifier returned earlier to check the Multi-AZ status:

```sh
aws rds describe-db-instances --region <region-name> --db-instanceidentifier
<db-name> --query 'DBInstances[*].MultiAZ'
```

- If the output is True, Multi-AZ is enabled.
- If the output is False, Multi-AZ is not enabled.

3. Repeat steps 1 and 2 to audit each RDS instance, and change regions to verify in other regions.
