# Remediation

## OpenSearch Domain Migration: Public to VPC

### Prerequisites

- **Existing snapshot repository** registered and functional
- **IAM roles & permissions** already configured for snapshot operations  
- **S3 bucket** with appropriate access policies
- **VPC infrastructure** prepared (subnets, security groups, route tables)
- **Application team** engaged for coordinated cutover

### Migration Steps

#### 1. Create a Snapshot

Take a manual snapshot from the existing public domain:

```sh
curl -XPUT -u {{master-username}}:{{password}} \
"https://{{public-endpoint}}/_snapshot/{{existing-repository}}/migration-$(date +%Y%m%d-%H%M)" \
?wait_for_completion=true
```

**Verification:**

```sh
curl -XGET -u {{master-username}}:{{password}} \
"https://{{public-endpoint}}/_snapshot/{{existing-repository}}/_all"
```

#### 2. Provision VPC Domain

Create the new domain with the same configuration:

```sh
aws opensearch create-domain \
    --domain-name {{new-domain-name}} \
    --vpc-options SubnetIds={{subnet-ids}},SecurityGroupIds={{security-group-ids}} \
    --engine-version {{current-version}} \
    --cluster-config {{cluster-config}} \
    --ebs-options {{ebs-config}} \
    --encryption-at-rest-options {{Enabled=true,KmsKeyId={{key-id}}}} \
    --node-to-node-encryption-options Enabled=true
```

**Wait for domain to become active:**

```sh
aws opensearch describe-domain \
    --domain-name {{new-domain-name}} \
    --query "DomainStatus.Processing"
```

#### 3. Register Existing Repository in New Domain

Use the same repository configuration:

```sh
curl -XPUT -u {{master-username}}:{{password}} \
  "https://{{new-vpc-endpoint}}/_snapshot/{{existing-repository}}" \
  -H 'Content-Type: application/json' -d '{
    "type": "s3",
    "settings": {
      "bucket": "{{existing-bucket}}",
      "region": "{{region}}",
      "role_arn": "{{existing-role-arn}}"
    }
  }'
```

#### 4. Restore Snapshot to VPC Domain

```sh
curl -XPOST -u {{master-username}}:{{password}} \
  "https://{{new-vpc-endpoint}}/_snapshot/{{existing-repository}}/{{snapshot-name}}/_restore"
```

Monitor restoration progress:

```sh
curl -XGET -u {{master-username}}:{{password}} \
  "https://{{new-vpc-endpoint}}/_cat/recovery"
```

#### 5. Validate VPC Configuration

Confirm the domain is properly configured within in VPC:

```sh
aws opensearch describe-domain \
    --domain-name {{new-domain-name}} \
    --query "DomainStatus.Endpoints"
```

#### 6. Application Cutover

- Update application configurations to use the new VPC endpoint
- Execute planned cutover during maintenance window
- Validate data integrity and performance

#### 7. Decommission Old Domain

After successful migration and verification:

```sh
aws opensearch delete-domain --domain-name {{old-public-domain}}
```
