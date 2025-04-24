# Description

Compute Engine instance cannot forward a packet unless the source IP address of the packet matches the IP address of the instance. Similarly, GCP won't deliver a packet whose destination IP address is different than the IP address of the instance receiving the packet. However, both capabilities are required if you want to use instances to help route packets.

Forwarding of data packets should be disabled to prevent data loss or information disclosure.

## Rationale

Compute Engine instance cannot forward a packet unless the source IP address of the packet matches the IP address of the instance. Similarly, GCP won't deliver a packet whose destination IP address is different than the IP address of the instance receiving the packet. However, both capabilities are required if you want to use instances to help route packets. To enable this source and destination IP check, disable the `canIpForward` field, which allows an instance to send and receive packets with non-matching destination or source IPs.

## Impact

Deleting instance(s) acting as routers/packet forwarders may break the network connectivity.

## Audit

### From Google Cloud Console

1. Go to the `VM Instances` page by visiting: <https://console.cloud.google.com/compute/instances>.
2. For every instance, click on its name to go to the `VM instance details` page.
3. Under the `Network interfaces` section, ensure that `IP forwarding` is set to `Off` for every network interface.

### From Google Cloud CLI

1. List all instances:

            gcloud compute instances list --format='table(name,canIpForward)'

2. Ensure that `CAN_IP_FORWARD` column in the output of above command does not contain `True` for any VM instance.

## Exception

Instances created by GKE should be excluded because they need to have IP forwarding enabled and cannot be changed. Instances created by GKE have names that start with `gke-`.

## Default Value

By default, instances are not configured to allow IP forwarding.

## References

1. <https://cloud.google.com/vpc/docs/using-routes#canipforward>

## Additional Information

You can only set the `canIpForward` field at instance creation time. After an instance is created, the field becomes read-only.
