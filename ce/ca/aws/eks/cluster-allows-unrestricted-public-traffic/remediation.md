# Remediation

## From Command Line

Execute the following command to restrict your EKS API server endpoint to approved CIDR ranges and enable private endpoint access. `{{publicAccessCidrs}}` is a single CIDR or comma-separated list. Note that CIDR blocks must exclude reserved addresses.

If you rely solely on the public endpoint, you must include every egress IP used by your VPC (for example, the NAT Gateway’s public IP) in `publicAccessCidrs`. Enabling the private endpoint simplifies traffic flow for internal components and reduces the need to enumerate VPC egress addresses.

```sh
aws eks update-cluster-config \
    --region {{region-code}} \
    --name {{cluster-name}} \
    --resources-vpc-config endpointPublicAccess=true,publicAccessCidrs="{{publicAccessCidrs}}",endpointPrivateAccess=true
```
