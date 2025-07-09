# Remediation

## From Command Line

You can update the **Default Root Object** by using the `--default-root-object` flag:

```sh
aws cloudfront update-distribution \
    --id {{distribution-id}} \
    --default-root-object {{index.html}}
```
