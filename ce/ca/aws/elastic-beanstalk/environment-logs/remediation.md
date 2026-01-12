# Remediation

## Enable log streaming to Amazon CloudWatch Logs and log rotation to Amazon S3

Configure the Elastic Beanstalk environment to retain logs by enabling log rotation to Amazon S3 and stream logs in near real time to Amazon CloudWatch Logs.

### **From Command Line**

Run the `update-environment` command using the name of the Elastic Beanstalk environment you want to reconfigure.

```sh
aws elasticbeanstalk update-environment \
    --region us-east-1 \
    --environment-name CcProdWebsite-env \
    --option-settings \
        Namespace=aws:elasticbeanstalk:hostmanager,OptionName=LogPublicationControl,Value=true \
        Namespace=aws:elasticbeanstalk:cloudwatch:logs,OptionName=RetentionInDays,Value=90 \
        Namespace=aws:elasticbeanstalk:cloudwatch:logs,OptionName=StreamLogs,Value=true
```
