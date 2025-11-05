# Description

A network policy is a specification of how groups of pods are allowed to communicate with each other and other network endpoints. NetworkPolicy resources use labels to select pods and define rules which specify what traffic is allowed to the selected pods. The Kubernetes Network Policy API allows the cluster administrator to specify what pods are allowed to communicate with each other.

## Rationale

By default, pods are non-isolated; they accept traffic from any source. Pods become isolated by having a NetworkPolicy that selects them. Once there is any NetworkPolicy in a namespace selecting a particular pod, that pod will reject any connections that are not allowed by any NetworkPolicy. (Other pods in the namespace that are not selected by any NetworkPolicy will continue to accept all traffic.)

## Audit

### From Google Cloud Console

1. Go to Kubernetes GCP Console visiting <https://console.cloud.google.com/kubernetes/list?>
2. From the list of clusters, make sure for each cluster `Network policy for master` and `Network policy for nodes` are Enabled under Cluster section

### From Google Cloud CLI

To check Network policy is enabled for an existing cluster, run the following command

    ```sh
        gcloud container clusters describe [CLUSTER_NAME] --zone [COMPUTE_ZONE] --format json | jq '.networkPolicy'
    ```

Ensure the output of the above command has JSON key attribute `enabled` set to `true`

    ```sh
        {
        "enabled": true
        }
    ```

If Network policy is disabled above command output will return null.

## Impact

Enabling/Disabling Network Policy causes a rolling update of all cluster nodes, similar to performing a cluster upgrade. This operation is long-running and will block other operations on the cluster (including delete) until it has run to completion.

## Default Value

By default, Network Policy is disabled when you create a new cluster.

## References

1. <https://kubernetes.io/docs/concepts/services-networking/network-policies/#thenetworkpolicy-resource>
2. <https://kubernetes.io/docs/reference/generated/kubernetesapi/v1.10/#networkpolicy-v1-networking>
