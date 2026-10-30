# Remediation

## Restrict public inbound access to the Redshift cluster port (TCP 5439)

Update the VPC security group(s) associated with the Redshift cluster to remove inbound rules that allow access from `0.0.0.0/0` and/or `::/0` to TCP port `5439`. Replace them with trusted CIDR ranges, or route access through approved private connectivity (VPN/Direct Connect/bastion).

### **From Command Line**

1. **Identify the cluster security groups:**

    ```sh
    aws redshift describe-clusters \
        --cluster-identifier {{cluster-id}} \
        --query 'Clusters[0].VpcSecurityGroups[].VpcSecurityGroupId' \
        --output text
    ```

2. **Review the inbound rules on each security group:**

    ```sh
    aws ec2 describe-security-groups \
        --group-ids {{sg-id}} \
        --query 'SecurityGroups[0].IpPermissions' \
        --output json
    ```

3. **Revoke unrestricted IPv4 ingress to TCP 5439:**

    ```sh
    aws ec2 revoke-security-group-ingress \
    --group-id {{sg-id}} \
    --ip-permissions '[
        {
        "IpProtocol": "tcp",
        "FromPort": 5439,
        "ToPort": 5439,
        "IpRanges": [{"CidrIp": "0.0.0.0/0"}]
        }
    ]'
    ```

4. **Revoke unrestricted IPv6 ingress to TCP 5439 (if present):**

    ```sh
        aws ec2 revoke-security-group-ingress \
            --group-id {{sg-id}} \
            --ip-permissions '[
                {
                "IpProtocol": "tcp",
                "FromPort": 5439,
                "ToPort": 5439,
                "Ipv6Ranges": [{"CidrIpv6": "::/0"}]
                }
            ]'
    ```

5. **Add a restricted ingress rule (example: trusted CIDR only):**

    ```sh
        aws ec2 authorize-security-group-ingress \
            --group-id {{sg-id}} \
            --ip-permissions '[
                {
                "IpProtocol": "tcp",
                "FromPort": 5439,
                "ToPort": 5439,
                "IpRanges": [{"CidrIp": "{{trusted-cidr}}/32"}]
                }
            ]'
    ```

### Considerations

- Prefer private connectivity (VPN/Direct Connect/VPC-based access) over opening database ports to the internet.
- If multiple client networks require access, explicitly enumerate their CIDRs rather than using broad ranges.
