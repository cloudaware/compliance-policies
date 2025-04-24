# Description

Cloud DNS logging records the queries from the name servers within your VPC to Stackdriver. Logged queries can come from Compute Engine VMs, GKE containers, or other GCP resources provisioned within the VPC.

## Rationale

Security monitoring and forensics cannot depend solely on IP addresses from VPC flow logs, especially when considering the dynamic IP usage of cloud resources, HTTP virtual host routing, and other technology that can obscure the DNS name used by a client from the IP address. Monitoring of Cloud DNS logs provides visibility to DNS names requested by the clients within the VPC. These logs can be monitored for anomalous domain names, evaluated against threat intelligence.

Note: For full capture of DNS, firewall must block egress UDP/53 (DNS) and TCP/443 (DNS over HTTPS) to prevent client from using external DNS name server for resolution.

## Impact

Enabling of Cloud DNS logging might result in your project being charged for the additional logs usage.

## Audit

### From Google Cloud CLI

1. List all VPCs networks in a project:

            gcloud compute networks list --format="table[box,title='All VPC Networks'](name:label='VPC Network Name')"

2. List all DNS policies, logging enablement, and associated VPC networks:

            gcloud dns policies list --flatten="networks[]" --format="table[box,title='All DNS Policies By VPC Network'](name:label='Policy Name',enableLogging:label='Logging Enabled':align=center,networks.networkUrl.basename():label='VPC Network Name')"

Each VPC Network should be associated with a DNS policy with logging enabled.

## Default Value

Cloud DNS logging is disabled by default on each network.

## References

1. <https://cloud.google.com/dns/docs/monitoring>

## Additional Information

Only queries that reach a name server are logged. Cloud DNS resolvers cache responses, queries answered from caches, or direct queries to an external DNS resolver outside the VPC are not logged.
