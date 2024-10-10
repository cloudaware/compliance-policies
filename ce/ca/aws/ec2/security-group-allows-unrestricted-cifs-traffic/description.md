# Description

Common Internet File System (CIFS) is a network file-sharing protocol that allows
systems to share files over a network. However, unrestricted CIFS access can expose
your data to unauthorized users, leading to potential security risks. It is important to
restrict CIFS access to only trusted networks and users to prevent unauthorized access
and data breaches.

## Rationale

Allowing unrestricted CIFS access can lead to significant security vulnerabilities, as it
may allow unauthorized users to access sensitive files and data. By restricting CIFS
access to known and trusted networks, you can minimize the risk of unauthorized
access and protect sensitive data from exposure to potential attackers. Implementing
proper network access controls and permissions is essential for maintaining the security
and integrity of your file-sharing systems.

## Impact

Restricting CIFS access may require additional configuration and management effort.
However, the benefits of enhanced security and reduced risk of unauthorized access to
sensitive data far outweigh the potential challenges.

## Audit

### From Console

1. Login to the AWS Management Console.
2. Navigate to the EC2 Dashboard and select the Security Groups section under Network & Security.
3. Identify the security groups associated with instances or resources that may be using CIFS.
4. Review the inbound rules of each security group to check for rules that allow unrestricted access on port 445 (the port used by CIFS).
   - Specifically, look for inbound rules that allow access from 0.0.0.0/0 or
   ::/0 on port 445.
5. Document any instances where unrestricted access is allowed and verify whether it is necessary for the specific use case.

### From Command Line

1. Run the following command to list all security groups and identify those
associated with CIFS:

```sh
aws ec2 describe-security-groups --region <region-name> --query 'SecurityGroups[*].GroupId'
```

2. Check for any inbound rules that allow unrestricted access on port 445 using the
following command:

```sh
aws ec2 describe-security-groups --region <region-name> --group-ids <security-group-id> --query 'SecurityGroups[*].IpPermissions[?FromPort==`445`].{CIDR:IpRanges[*].CidrIp,Port:FromPort}'
```

- Look for `0.0.0.0/0` or `::/0` in the output, which indicates unrestricted
access.

3. Repeat the audit for other regions and security groups as necessary.
