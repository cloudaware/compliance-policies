# Remediation

## Enable Object Versioning

### **From Google Cloud CLI**

To enable versioning, use the `--versioning` flag:

```sh
gcloud storage buckets update gs://{{bucket-name}} \
    --versioning
```
