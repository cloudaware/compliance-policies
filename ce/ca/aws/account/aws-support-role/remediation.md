# Remediation

## From Command Line

1. Create an IAM role for managing incidents with AWS:
    - Create a trust relationship policy document that allows `<iam_user>` to manage AWS incidents, and save it locally as `/tmp/TrustPolicy.json`:

```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
            "Effect": "Allow",
            "Principal": { 
                "AWS": "<iam_user>"
            },
            "Action": "sts:AssumeRole"
            }
        ]
    }
```

2. Create the IAM role using the above trust policy:

```sh
aws iam create-role --role-name <aws_support_iam_role> --assume-role-policy-document file:///tmp/TrustPolicy.json
```

3. Attach `AWSSupportAccess` managed policy to the created IAM role:

```sh
aws iam attach-role-policy --policy-arn arn:aws:iam::aws:policy/AWSSupportAccess --role-name <aws_support_iam_role>
```
