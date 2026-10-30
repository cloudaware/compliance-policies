# Description

To prevent use of legacy networks, a project should not have a legacy network configured. Legacy networks are being phased out, and you can no longer create projects with them. This recommendation is to check older projects to ensure that they are not using legacy networks.

## Rationale

Legacy networks have a single network IPv4 prefix range and a single gateway IP address for the whole network. The network is global in scope and spans all cloud regions. Subnetworks cannot be created in a legacy network, and you cannot switch from legacy to auto or custom subnet networks. Legacy networks can impact high network traffic projects and are subject to a single point of contention or failure.

## Audit

### From Google Cloud CLI

For each Google Cloud Platform project:

1. Set the project name in the Google Cloud Shell:

    ```sh
    gcloud config set project {{project-id}}
    ```

2. List the networks configured in that project:

    ```sh
    gcloud compute networks list
    ```

None of the listed networks should be in the `legacy` mode.

## Default Value

By default, networks are not created in the `legacy` mode.

## References

1. <https://cloud.google.com/vpc/docs/using-legacy#creating_a_legacy_network>
2. <https://cloud.google.com/vpc/docs/using-legacy#deleting_a_legacy_network>
