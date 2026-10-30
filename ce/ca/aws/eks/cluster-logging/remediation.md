# Remediation

## From Command Line

To enable control plane logging for your Amazon EKS cluster, update the logging configuration with the following command:

```sh
aws eks update-cluster-config \
    --region {{region-name}} \
    --name {{cluster-name}} \
    --logging '{"clusterLogging":[{"types":["api","audit","authenticator","controllerManager","scheduler"],"enabled":true}]}'
```
