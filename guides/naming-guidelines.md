# Naming Guidelines

## Name

```text
[Resource Name] [Field Name/Feature Name (if applicable)] [issue to address]
```

## Description

1. What we expect to be done

2. Why this should be done

- Explain what problems are solved or benefits provided by addressing the issue

- Describe the potential negative outcomes if the issue is not addressed

- A brief description of the functionality or area that is being evaluated for issues (if applicable)

## description.md

```markdown
### Description

1. What we expect to be done
2. A brief description of the functionality or area that is being evaluated for issues (if applicable)

### Rational

1. Why this should be done

   - Explain what problems are solved or benefits provided by addressing the issue

2. Considerations in case this is a best practice

### Impact

- Describe the potential negative outcomes if the issue is not addressed

### Audit

- Explain the the results of the output. How they can be interpreted.
```

## Examples

1. Enable AWS S3 Bucket Lifecycle Configuration

    > **Name**: S3 Bucket Lifecycle Configuration is not set
    >
    > **Description**: Set up S3 Lifecycle Configuration to ensure that your objects are stored cost
    effectively throughout their lifecycle. S3 Lifecycle Configuration consists of rules that define
    actions, such as Transition and Expiration actions, which Amazon S3 applies to groups of objects.
    By configuring lifecycle policies, you can automate the management of object storage, transitioning
    of objects between storage classes based on their access patterns and lifecycle requirements.

2. Enable AWS S3 Bucket Versioning

    > **Name**: S3 Bucket Versioning is not enabled
    >
    > **Description**: Ensure that AWS S3 Bucket Versioning feature is enabled. Versioning allows users to
    retain multiple versions of objects within the same S3 bucket offering a reliable and scalable
    solution for data protection, recovery, and version control. By activating Versioning, you
    establish a robust mechanism for safeguarding against accidental deletions or modifications of
    objects.

3. Enable AWS S3 MFA Delete

    > **Name**: S3 Bucket MFA Delete is not configured
    >
    > **Description**: Consider enabling MFA Delete for buckets containing critical or sensitive objects.
    Amazon S3 offers the MFA Delete feature as an optional extra layer of security when deleting
    objects from your S3 buckets. This feature requires additional authentication via MFA before
    allowing the deletion of objects, thereby reducing the risk of accidental or unauthorized deletions.

4. Enable AWS S3 Object Lock

    > **Name**: S3 Bucket Object Lock is not configured
    >
    > **Description**: Consider enabling S3 Object Lock to add an additional layer of protection and
    prevent S3 objects from being deleted or overwritten for a fixed amount of time or indefinitely.
    Object Lock provides a mechanism to meet regulatory requirements, such as those mandating
    write-once-read-many (WORM) storage. By enabling Object Lock, you enhance data integrity and
    compliance by safeguarding objects against accidental or malicious alterations.

5. Enable AWS S3 Bucket Access Logging

    >**Name**: S3 Bucket Access Logging is not enabled
    >
    >**Description**: Ensure that S3 Server Access Logging is enabled to track and analyze requests made
    to S3 buckets. Activating this feature generates detailed records containing information such as
    the requester's IP address, the time of the request, the requested resource, and the response
    status. With Server Access Logging, you gain insights into access patterns and usage of your S3
    buckets. This data can be utilized for various purposes, including security auditing, compliance
    monitoring, and performance optimization.

6. AWS ACM Certificate Expired

    >**Name**: ACM Certificate is expired
    >
    >**Description**: Ensure that all the expired Secure SSL/TLS certificates managed by AWS Certificate
    Manager are removed in order to adhere to Amazon Security Best Practices. Regularly removing
    expired certificates from ACM ensures the maintenance of a clean and secure certificate inventory.
    Certificate Manager facilitates the easy provisioning, management, and deployment of SSL/TLS
    certificates for integration with various Amazon services such as Elastic Load Balancing and
    CloudFront.

7. AWS ACM Certificate Renewal (7 days before expiration)

    >**Name**: ACM Certificate expires in 7 days
    >
    >**Description**: Ensure that your SSL/TLS certificates managed by AWS ACM are renewed at least
    7 days before their validity period expires. Proactively renewing certificates ensures
    uninterrupted security coverage and prevents service disruptions due to expired certificates.
    Certificate Manager simplifies the provisioning, management, and deployment of SSL/TLS certificates
    for various AWS resources like Elastic Load Balancers, CloudFront distributions, or APIs on Amazon
    API Gateway.

8. AWS ACM Certificate with Wildcard Domain Name

    >**Name**: ACM Certificate Domain Name contains a wildcard name
    >
    >**Description**: Ensure that ACM single domain name certificates are used instead of wildcard
    certificates within your AWS account to adhere to security best practices and enhance protection for
    each domain or subdomain with its unique private key. While wildcard certificates match any
    first-level subdomain or hostname within a domain, such as `*.cloudaware.com` covering both
    `www.cloudaware.com` and `images.cloudaware.com`, they present a broader attack surface.

9. Enable AWS API Gateway REST API CloudWatch Logs

    >**Name**: API Gateway REST API CloudWatch Logs are not enabled
    >
    >**Description**: Ensure that AWS CloudWatch logs are enabled for all your APIs created with Amazon
    API Gateway service in order to monitor and analyze execution behavior at the API stage level. By
    leveraging CloudWatch logs, you gain insights into API performance, usage patterns, and errors,
    enabling proactive troubleshooting and optimization of your API-based applications.

10. AWS EC2 Auto Scaling Group And Load Balancer Inconsistent AZs

    >**Name**: EC2 Auto Scaling Group and Load Balancer AZs do not match
    >
    >**Description**: Ensure that the AWS Auto Scaling Groups and their associated Elastic Load
    Balancers are configured to share the same Availability Zones to optimize the
    performance of your auto-scaling environments. Aligning ASGs and ELBs with the same AZs leverages
    AWS's low-latency network links, enhancing the responsiveness and efficiency of your applications.

11. Enable AWS EC2 Instance Detailed Monitoring

    >**Name**: EC2 Instance Detailed Monitoring is not enabled
    >
    >**Description**: Ensure that detailed monitoring is enabled for your Amazon EC2 to gather sufficient
    monitoring data for informed decision-making in architecting and managing compute resources within
    your AWS account. By default, AWS CloudWatch enables basic monitoring for newly launched EC2
    instances, collecting monitoring data in 5-minute intervals. To enhance visibility and granularity,
    it's recommended to enable detailed monitoring, which provides data at 1-minute intervals. This
    enables more precise monitoring and facilitates quicker detection of performance anomalies or
    issues. Additionally, detailed monitoring allows aggregation of data across groups of similar EC2
    instances, offering comprehensive insights into resource utilization and performance trends.

12. AWS EC2 Instance Idle

    >**Name**: EC2 Instance is idle
    >
    >**Description**: Identify any AWS EC2 instances that appear to be idle and take action to stop or
    terminate them, thereby reducing the cost of your monthly AWS bill. By default, an EC2 instance is
    considered 'idle' when it satisfies the following criteria over the past 7 days: 1) Average CPU
    utilization has been below 2%; and 2) Average network I/O has been less than 5 MB.

13. AWS EC2 Instance Overutilized

    >**Name**: EC2 Instance is overutilized
    >
    >**Description**: Identify any AWS EC2 instances that appear to be overutilized and initiate upgrades
    (resizing) to optimize the performance of EC2-hosted applications and improve the response time. By
    default, an EC2 instance is considered "overutilized" when its average CPU utilization has exceeded
    90% over the past 7 days.

14. AWS EC2 Security Group Rule Count

    >**Name**: EC2 Security Group Rule count exceeds 50 rules
    >
    >**Description**: Identify AWS EC2 Security Groups with a large number of inbound and outbound rules
    and streamline their configurations by removing any redundant or unnecessary rules. By reducing the
    number of rules and eliminating overlaps, you optimize network traffic management and simplify
    security group maintenance. Cloudaware recommends a default maximum limit of 50 rules per security
    group. However, this value is adjustable to accommodate specific requirements.

15. Unrestricted AWS EC2 Security Group Inbound Access on Common Ports

    >**Name**: EC2 Security Group allows unrestricted inbound traffic on common ports
    >
    >**Description**: Identify AWS EC2 security groups containing inbound rules that allow unrestricted
    access (i.e. 0.0.0.0/0 or ::/0) to ports commonly used by popular services and restrict access to
    only the necessary IP addresses aligning with the principle of least privilege, mitigating the risk
    of security breaches. Implementing precise access controls ensures that only authorized entities
    can interact with the designated services.

16. AWS Root Account Credentials Usage

    >**Name**: AWS Account root user credentials were used is the last 30 days
    >
    >**Description**: Ensure that the AWS root account credentials have not been utilized to access your
    AWS account within the past 30 days (default threshold) to minimize root account usage.  Cloudaware
    strongly recommends locking down the usage of root account credentials and terminating their use
    for your everyday, or even the administrative tasks.

17. AWS RDS Aurora Cluster Accessibility Consistency

    >**Name**: RDS Aurora Cluster access is not consistent
    >
    >**Description**: Ensure uniform accessibility, either public or private, across all RDS instances
    within your Aurora clusters to align with AWS best practices. By standardizing accessibility, you
    mitigate the risk of unauthorized access and enhance data protection.

18. AWS RDS Instance Auto Minor Version Upgrade

    >**Name**: RDS Instance Auto Minor Version Upgrade is not enabled
    >
    >**Description**: Ensure that your RDS database instances have the Auto Minor Version Upgrade flag
    enabled to automatically receive minor engine upgrades within the specified maintenance window.
    Newer versions can include bug fixes, security enhancements, and other improvements for the database
    engine. Each version upgrade is only available after it is tested and approved by AWS.

19. AWS RDS Instance Default Port

    >**Name**: RDS Instance uses default endpoint port
    >
    >**Description**: Ensure that your Amazon RDS databases instances are not configured to use default
    endpoint ports (i.e. MySQL/Aurora port 3306, SQL Server port 1433, PostgreSQL port 5432, etc) to
    enhance security through port obfuscation. This practice adds an additional layer of defense
    against non-targeted attacks by customizing endpoint ports, reduces the risk of unauthorized
    access, and enhances the overall security posture of your database infrastructure.

20. Publicly Accessible AWS RDS Snapshot

    >**Name**: RDS Snapshot is publicly accessible
    >
    >**Description**: Ensure that your AWS RDS database snapshots are not publicly accessible (i.e.
    shared with all AWS accounts and users) to safeguard your private data. Exposing database snapshots
    to unauthorized users or accounts poses a significant security risk, potentially leading to data
    breaches or unauthorized access to sensitive information. By restricting access to RDS database
    snapshots, you maintain control over who can view or manipulate the data, enhancing data privacy
    and compliance with security best practices.
