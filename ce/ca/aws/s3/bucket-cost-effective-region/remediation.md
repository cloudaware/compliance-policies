# Remediation

To reduce storage costs, migrate S3 buckets from higher-cost regions to more cost-efficient alternatives. Since S3 buckets cannot be moved directly between regions, the recommended approach is to replicate or copy objects into a new bucket in the desired region and then decommission the original bucket once migration is complete.

## From Command Line

1. Create a new bucket in a lower-cost region:

```sh
aws s3api create-bucket \
    --bucket {{new-bucket-name}} \
    --region {{target-region}} \
    --create-bucket-configuration LocationConstraint={{target-region}}
```

2. Synchronize objects from the existing bucket to the new bucket:

```sh
aws s3 sync s3://{{source-bucket}} s3://{{new-bucket-name}} \
    --source-region {{source-region}} \
    --region {{target-region}}
```

3. Update applications or services to use the new bucket.

4. Empty and decommission the old bucket once migration is validated:

```sh
aws s3 rm s3://{{source-bucket}} --recursive
```

```sh
aws s3 rb s3://{{source-bucket}} --force
```
