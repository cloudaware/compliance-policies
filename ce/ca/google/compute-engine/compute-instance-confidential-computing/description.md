# Description

Google Cloud encrypts data at-rest and in-transit, but customer data must be decrypted for processing. Confidential Computing is a breakthrough technology which encrypts data in-use—while it is being processed. Confidential Computing environments keep data encrypted in memory and elsewhere outside the central processing unit (CPU).

Confidential VMs leverage the Secure Encrypted Virtualization (SEV) feature of AMD EPYC™ CPUs. Customer data will stay encrypted while it is used, indexed, queried, or trained on. Encryption keys are generated in hardware, per VM, and not exportable. Thanks to built-in hardware optimizations of both performance and security, there is no significant performance penalty to Confidential Computing workloads.

## Rationale

Confidential Computing enables customers' sensitive code and other data encrypted in memory during processing. Google does not have access to the encryption keys. Confidential VM can help alleviate concerns about risk related to either dependency on Google infrastructure or Google insiders' access to customer data in the clear.

## Impact

• Confidential Computing for Compute instances does not support live migration. Unlike regular Compute instances, Confidential VMs experience disruptions during maintenance events like a software or hardware update.

• Additional charges may be incurred when enabling this security feature. See <https://cloud.google.com/compute/confidential-vm/pricing> for more info.

## Audit

Note: Confidential Computing is currently only supported on N2D and C2D machines. To learn more about features supported by types of machines, visit <https://cloud.google.com/compute/docs/machine-types>

### From Google Cloud Console

1. Go to the `VM instances` page by visiting: <https://console.cloud.google.com/compute/instances>
2. Click on the instance name to see its VM instance details page.
3. Ensure that `Confidential VM service` is `Enabled`.

### From Google Cloud CLI

1. List the instances in your project and get details on each instance:

            gcloud compute instances list --format=json

2. Ensure that `enableConfidentialCompute` is set to `true` for all instances with machine type starting with "n2d-".

            confidentialInstanceConfig:
             enableConfidentialCompute: true

## Default Value

By default, Confidential Computing is disabled for Compute instances.

## References

1. <https://cloud.google.com/compute/confidential-vm/docs/creating-cvm-instance>
2. <https://cloud.google.com/compute/confidential-vm/docs/about-cvm>
3. <https://cloud.google.com/confidential-computing>
4. <https://cloud.google.com/blog/products/identity-security/introducing-google-cloud-confidential-computing-with-confidential-vms>
