# Remediation

If a snapshot is no longer required for operational use consider deleting it. If it must be retained for compliance or archival purposes, you can archive it to Amazon S3.

## Delete the Snapshot

### From Command Line

```sh
aws rds delete-db-snapshot \
    --db-snapshot-identifier {{db-snapshot-id}}
```

## Archive the Snapshot to Amazon S3

### Prerequisites

#### **From Command Line**

1. Before exporting DB snapshot data to Amazon S3, you must grant the snapshot export task write access to the target bucket. Create an IAM Policy that grants the required permissions:

```sh
aws iam create-policy  --policy-name {{export-policy}} --policy-document '{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "ExportPolicy",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject*",
                "s3:ListBucket",
                "s3:GetObject*",
                "s3:DeleteObject*",
                "s3:GetBucketLocation"
            ],
            "Resource": [
                "arn:aws:s3:::{{bucket-name}}",
                "arn:aws:s3:::{{bucket-name}}/*"
            ]
        }
    ]
}'
```

2. Create an IAM role, so that Amazon RDS can assume this IAM role on your behalf to access your Amazon S3 buckets:

```sh
aws iam create-role  --role-name {{rds-s3-role-name}}  --assume-role-policy-document '{
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
            "Service": "export.rds.amazonaws.com"
          },
         "Action": "sts:AssumeRole"
       }
     ] 
   }'
```

3. Attach the IAM policy that you created to the IAM role that you created.

```sh
aws iam attach-role-policy  --policy-arn {{export-policy-arn}}  --role-name {{rds-s3-role-name}}
```

---

### Start Export Task

#### **From Command Line**

```sh
aws rds start-export-task \
    --export-task-identifier {{export-task-name}} \
    --source-arn {{snapshot-arn}} \
    --s3-bucket-name {{s3-bucket-name}} \
    --iam-role-arn {{iam-role-arn-with-s3-permissions}} \
    --kms-key-id {{kms-key-arn}}
```

- `--kms-key-id` - The caller of this operation must be authorized to run the following operations:
  - `kms:CreateGrant`
  - `kms:DescribeKey`
