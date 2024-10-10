# Remediation

## From Console

1. Login to the AWS Management Console and open the RDS dashboard.
2. In the left navigation pane, click on `Databases`.
3. Select the database instance that needs Multi-AZ deployment to be enabled.
4. Click the `Modify` button at the top right.
5. Scroll down to the `Availability & Durability` section.
6. Under `Multi-AZ deployment`, select `Yes` to enable.
7. Review the changes and click `Continue`.
8. On the `Review` page, choose `Apply immediately` to make the change without
waiting for the next maintenance window, or `Apply during the next scheduled maintenance window`.
9. Click `Modify DB Instance` to apply the changes.

## From Command Line

1. Run the following command to modify the RDS instance and enable Multi-AZ:.

```sh
aws rds modify-db-instance --region <region-name> --db-instanceidentifier
<db-name> --multi-az --apply-immediately
```

2. Confirm that the Multi-AZ deployment is enabled by running the following
command:

```sh
aws rds describe-db-instances --region <region-name> --db-instanceidentifier
<db-name> --query 'DBInstances[*].MultiAZ'
```

- The output should return `True`, indicating that Multi-AZ is enabled.

3. Repeat the procedure for other instances as necessary.
