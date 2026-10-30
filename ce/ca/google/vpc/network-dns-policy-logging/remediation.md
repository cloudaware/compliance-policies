# Remediation

## From Google Cloud CLI

### Add New DNS Policy With Logging Enabled

For each VPC network that needs a DNS policy with logging enabled:

```sh
gcloud dns policies create enable-dns-logging \
    --enable-logging \
    --description="Enable DNS Logging" \
    --networks={{vpc-network-name}}
```

The `{{vpc-network-name}}` value can include one or more networks in a comma-separated list.

### Enable Logging for Existing DNS Policy

For each VPC network that has an existing DNS policy that needs logging enabled:

```sh
gcloud dns policies update {{policy-name}} \
    --enable-logging \
    --networks={{vpc-network-name}}
```

The `{{vpc-network-name}}` value can include one or more networks in a comma-separated list.
