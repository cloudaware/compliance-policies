# Remediation

## From Command Line

Use the `update-instance-attribute` command to turn on `CONTACTFLOW_LOGS`:

```sh
aws connect update-instance-attribute \
  --instance-id {{connect-instance-id}} \
  --attribute-type CONTACTFLOW_LOGS \
  --value true
```  
