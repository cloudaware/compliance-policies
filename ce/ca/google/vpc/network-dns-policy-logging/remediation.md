# Remediation

## From Google Cloud CLI

### Add New DNS Policy With Logging Enabled

For each VPC network that needs a DNS policy with logging enabled:

    gcloud dns policies create enable-dns-logging --enable-logging --description="Enable DNS Logging" --networks=VPC_NETWORK_NAME

The VPC_NETWORK_NAME can be one or more networks in comma-separated list

### Enable Logging for Existing DNS Policy

For each VPC network that has an existing DNS policy that needs logging enabled:

    gcloud dns policies update POLICY_NAME --enable-logging --networks=VPC_NETWORK_NAME

The VPC_NETWORK_NAME can be one or more networks in comma-separated list
