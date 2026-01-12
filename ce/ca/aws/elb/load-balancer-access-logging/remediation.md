# Remediation

## Enable Access Logging

Enable access logging for Amazon Elastic Load Balancers to capture detailed request information and store it in Amazon S3 for analysis, auditing, and troubleshooting.

### **From Command Line**

#### 1. Create an Amazon S3 bucket for access logs

Create an S3 bucket to store load balancer access logs:

```sh
aws s3api create-bucket \
    --bucket {{access-logs-bucket-name}} \
    --region {{aws-region}}
```

#### 2. Configure the S3 bucket policy

Grant the load balancer permission to write access logs to the S3 bucket. Create a file named `access-logging-policy.json` and replace all placeholders with your own values:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ELBAccessLoggingPolicy",
      "Effect": "Allow",
      "Principal": {
        "Service": "logdelivery.elasticloadbalancing.amazonaws.com"
      },
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::{{access-logs-bucket-name}}/{{logging-prefix}}/AWSLogs/{{123456789012}}/*"
    }
  ]
}
```

Attach the policy to the S3 bucket:

```sh
aws s3api put-bucket-policy \
    --bucket {{access-logs-bucket-name}} \
    --policy file://access-logging-policy.json
```

#### 3. Enable access logging on the load balancer

Enable access logging based on the load balancer type.

**Application Load Balancers and Network Load Balancers:**

```sh
aws elbv2 modify-load-balancer-attributes \
    --load-balancer-arn {{load-balancer-arn}} \
    --attributes \
        Key=access_logs.s3.enabled,Value=true \
        Key=access_logs.s3.bucket,Value={{access-logs-bucket-name}} \
        Key=access_logs.s3.prefix,Value={{logging-prefix}}
```

**Classic Load Balancers:**

```sh
aws elb modify-load-balancer-attributes \
    --load-balancer-name {{load-balancer-name}} \
    --load-balancer-attributes AccessLog={ Enabled=true,S3BucketName={{access-logs-bucket-name}},EmitInterval={{60}},S3BucketPrefix={{logging-prefix}} }
```
