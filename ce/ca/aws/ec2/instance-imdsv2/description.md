# Description

When enabling the Metadata Service on AWS EC2 instances, users have the option of using either Instance Metadata Service Version 1 (IMDSv1; a request/response method) or Instance Metadata Service Version 2 (IMDSv2; a session-oriented method).

## Rationale

Instance metadata is data about your instance that you can use to configure or manage the running instance. Instance metadata is divided into [categories](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html), for example, host name, events, and security groups.

When enabling the Metadata Service on AWS EC2 instances, users have the option of using either Instance Metadata Service Version 1 (IMDSv1; a request/response method) or Instance Metadata Service Version 2 (IMDSv2; a session-oriented method). With IMDSv2, every request is now protected by session authentication. A session begins and ends a series of requests that software running on an EC2 instance uses to access the locally-stored EC2 instance metadata and credentials.

Allowing Version 1 of the service may open EC2 instances to Server-Side Request Forgery (SSRF) attacks, so Amazon recommends utilizing Version 2 for better instance security.

## Audit

### From Console

1. Sign in to the AWS Management Console and navigate to the EC2 dashboard at <https://console.aws.amazon.com/ec2/>.
2. In the left navigation panel, under the `INSTANCES` section, choose `Instances`.
3. Select the EC2 instance that you want to examine.
4. Check for the `IMDSv2` status, and ensure that it is set to `Required`.

### From Command Line

1. Run the `describe-instances` command using appropriate filtering to list the IDs of all the existing EC2 instances currently available in the selected region:

```sh
aws ec2 describe-instances --region <region-name> --output table --query "Reservations[*].Instances[*].InstanceId"
```

2. The command output should return a table with the requested instance IDs.
3. Now run the `describe-instances` command using an instance ID returned at the previous step and custom filtering to determine whether the selected instance has IMDSv2:

```sh
aws ec2 describe-instances --region <region-name> --instance-ids <instance-id> --query "Reservations[*].Instances[*].MetadataOptions" --output table
```

4. Ensure for all ec2 instances `HttpTokens` is set to `required` and `State` is set to `applied`.
5. Repeat steps no. 3 and 4 to verify other EC2 instances provisioned within the current region.
6. Repeat steps no. 1 – 5 to perform the audit process for other AWS regions.

## References

1. <https://aws.amazon.com/blogs/security/defense-in-depth-open-firewalls-reverse-proxies-ssrf-vulnerabilities-ec2-instance-metadata-service/>
2. <https://docs.aws.amazon.com/cli/latest/reference/ec2/describe-instances.html>
