# Remediation

## Enable Audit Logging

To enable audit logging for an Amazon Redshift cluster, update the cluster configuration to export database audit logs to Amazon S3 or Amazon CloudWatch Logs. Audit logging captures connection activity and user actions, supporting security monitoring, compliance, and operational troubleshooting.

### **From the AWS Management Console**

1. Sign in to the AWS Management Console and open the Amazon Redshift console.
2. From the navigation pane, choose **Clusters**, then select the Redshift cluster you want to modify.
3. Choose the **Properties** tab.
4. In the **Database configurations** section, choose **Edit**, then select **Edit audit logging**.
5. On the **Edit audit logging** page:

   - Choose **Turn on**.
   - Select a log destination:

     - **Amazon S3**, or
     - **Amazon CloudWatch Logs** (recommended for centralized logging, simplified administration, and log analysis).
   - Select the log types to export.
6. Choose **Save changes** to apply the configuration.

### **From the Command Line**

#### **Enable Audit Logging to Amazon S3**

Run the following AWS CLI command to enable audit logging and configure an Amazon S3 bucket as the log destination:

```sh
aws redshift enable-logging \
  --region {{region}} \
  --cluster-identifier {{cluster-id}} \
  --bucket-name {{bucket-name}}
```

Ensure that the specified S3 bucket exists and that Amazon Redshift has permission to write audit logs to the bucket.

#### **Enable Audit Logging to Amazon CloudWatch Logs**

To enable audit logging and send logs to Amazon CloudWatch Logs, use the following command:

```sh
aws redshift enable-logging \
  --region {{region}} \
  --cluster-identifier {{cluster-id}} \
  --log-destination-type cloudwatch
```

When using CloudWatch Logs, Amazon Redshift automatically creates the required log groups if they do not already exist.

## Considerations

Amazon Redshift audit logging may be interrupted under the following conditions:

- Amazon Redshift must have permission to upload logs to the specified S3 bucket. Verify that the bucket policy allows the Redshift service to write objects.

- When audit logging is enabled, Amazon Redshift validates that the S3 bucket owner remains unchanged. If the bucket owner changes, Redshift will stop delivering logs until a different bucket is configured.
