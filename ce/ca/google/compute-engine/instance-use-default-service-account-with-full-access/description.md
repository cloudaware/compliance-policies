# Description

To support principle of least privileges and prevent potential privilege escalation it is recommended that instances are not assigned to default service account `Compute Engine default service account` with Scope `Allow full access to all Cloud APIs`.

## Rationale

Along with ability to optionally create, manage and use user managed custom service accounts, Google `Compute Engine provides default service account` Compute Engine default service account for an instances to access necessary cloud services. `Project Editor` role is assigned to `Compute Engine default service account` hence, This service account has almost all capabilities over all cloud services except billing. However, when `Compute Engine default service account` assigned to an instance it can operate in 3 scopes.

            1. Allow default access: Allows only minimum access required to run an Instance (Least Privileges) 
            2. Allow full access to all Cloud APIs: Allow full access to all the cloud APIs/Services (Too much access) 
            3. Set access for each API: Allows Instance administrator to choose only those APIs that are needed to perform specific business functionality expected by instance

When an instance is configured with `Compute Engine default service account` with Scope `Allow full access to all Cloud APIs`, based on IAM roles assigned to the user(s) accessing Instance, it may allow user to perform cloud operations/API calls that user is not supposed to perform leading to successful privilege escalation.

## Impact

In order to change service account or scope for an instance, it needs to be stopped.

## Audit

### From Google Cloud Console

1. Go to the `VM instances` page by visiting: <https://console.cloud.google.com/compute/instances>.
2. Click on each instance name to go to its `VM instance details` page.
3. Under the `API and identity management`, ensure that `Cloud API access scopes` is not set to `Allow full access to all Cloud APIs`.

### From Google Cloud CLI

1. List the instances in your project and get details on each instance:

            gcloud compute instances list --format=json | jq -r '. | "SA Scopes: \(.[].serviceAccounts[].scopes) Name: \(.[].name) Email: \(.[].serviceAccounts[].email)"'

2. Ensure that the service account section has an email that does not match the pattern `[PROJECT_NUMBER]-compute@developer.gserviceaccount.com`.

## Exception

VMs created by GKE should be excluded. These VMs have names that start with `gke-` and are labeled `goog-gke-node`

## Default Value

While creating an VM instance, default service account is used with scope `Allow default access`.

## References

1. <https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances>
2. <https://cloud.google.com/compute/docs/access/service-accounts>

## Additional Information

• User IAM roles will override service account scope but configuring minimal scope ensures defense in depth

• Non-default service accounts do not offer selection of access scopes like default service account. IAM roles with non-default service accounts should be used to control VM access.
