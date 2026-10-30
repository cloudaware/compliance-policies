# Remediation

## From Google Cloud Console

1. Go to `Cloud DNS` by visiting <https://console.cloud.google.com/net-services/dns/zones>.
2. For each zone of `Type Public`, set `DNSSEC` to `On`.

## From Google Cloud CLI

Use the below command to enable `DNSSEC` for Cloud DNS Zone Name.

```sh
gcloud dns managed-zones update {{zone-name}} \
    --dnssec-state on
```
