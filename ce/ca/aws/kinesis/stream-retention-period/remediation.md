# Remediation

## Update Retention Period

### **From Command Line**

To increase the retention period of an Amazon Kinesis Stream to 7 days (168 hours), run the following command:

```sh
aws kinesis increase-stream-retention-period \
    --stream-name {{stream-name}} \
    --retention-period-hours 168
```
