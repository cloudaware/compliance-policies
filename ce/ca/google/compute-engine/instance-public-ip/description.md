# Description

Compute instances should not be configured to have external IP addresses.

## Rationale

To reduce your attack surface, Compute instances should not have public IP addresses. Instead, instances should be configured behind load balancers, to minimize the instance's exposure to the internet.

## Impact

Removing the external IP address from your Compute instance may cause some applications to stop working.

## Audit

### From Google Cloud Console

1. Go to the `VM instances` page by visiting: <https://console.cloud.google.com/compute/instances>.
2. For every VM, ensure that there is no `External IP` configured.

### From Google Cloud CLI

            gcloud compute instances list --format=json

1. The output should not contain an `accessConfigs` section under `networkInterfaces`. Note that the `natIP` value is present only for instances that are running or for instances that are stopped but have a static IP address. For instances that are stopped and are configured to have an ephemeral public IP address, the `natIP` field will not be present. Example output:

            networkInterfaces: 
            - accessConfigs: 
                - kind: compute#accessConfig 
                  name: External NAT 
                  networkTier: STANDARD 
                  type: ONE_TO_ONE_NAT

## Exception

 Instances created by GKE should be excluded because some of them have external IP addresses and cannot be changed by editing the instance settings. Instances created by GKE should be excluded. These instances have names that start with `gke-` and are labeled `goog-gke-node`.

## Prevention

 You can configure the `Define allowed external IPs for VM instances` Organization Policy to prevent VMs from being configured with public IP addresses. Learn more at: <https://console.cloud.google.com/orgpolicies/compute-vmExternalIpAccess>

## Default Value

By default, Compute instances have a public IP address.

## References

1. <https://cloud.google.com/load-balancing/docs/backend-service#backends_and_external_ip_addresses>
2. <https://cloud.google.com/compute/docs/instances/connecting-advanced#sshbetweeninstances>
3. <https://cloud.google.com/compute/docs/instances/connecting-to-instance>
4. <https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address#unassign_ip>
5. <https://cloud.google.com/resource-manager/docs/organization-policy/org-policy-constraints>

## Additional Information

You can connect to Linux VMs that do not have public IP addresses by using Identity-Aware Proxy for TCP forwarding. Learn more at <https://cloud.google.com/compute/docs/instances/connecting-advanced#sshbetweeninstances>

For Windows VMs, see <https://cloud.google.com/compute/docs/instances/connecting-to-instance>.
