# Remediation

To ensure continuous vulnerability scanning, configure your Amazon ECR registry to use either **Scan on Push** or **Continuous Scanning**. This helps ensure that container images are scanned automatically, reducing the likelihood of deploying vulnerable images.

## Disable Manual Scanning

### **From AWS CLI**

Enable Basic scanning with Scan on Push:

```sh
aws ecr put-registry-scanning-configuration \
    --scan-type BASIC \
    --rules '[{"scanFrequency":"SCAN_ON_PUSH","repositoryFilters":[{"filter":"*","filterType":"WILDCARD"}]}]'
```

Enable Enhanced scanning with Continuous Scanning:

```sh
aws ecr put-registry-scanning-configuration \
    --scan-type ENHANCED \
    --rules '[{"scanFrequency":"CONTINUOUS_SCAN","repositoryFilters":[{"filter":"*","filterType":"WILDCARD"}]}]'
```
