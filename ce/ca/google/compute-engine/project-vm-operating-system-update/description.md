# Description

Google Cloud Virtual Machines have the ability via an OS Config agent API to periodically (about every 10 minutes) report OS inventory data. A patch compliance API periodically reads this data, and cross references metadata to determine if the latest updates are installed.

This is not the only Patch Management solution available to your organization and you should weigh your needs before committing to using this method.

## Rationale

Keeping virtual machine operating systems up to date is a security best practice. Using this service will simplify this process.

## Impact

Most Operating Systems require a restart or changing critical resources to apply the updates. Using the Google Cloud VM manager for its OS Patch management will incur additional costs for each VM managed by it. Please view the VM manager pricing reference for further information.

## Audit

### From Google Cloud Console

Determine if OS Config API is Enabled for the Project

1. Navigate into a project. In the expanded navigation menu located at the top left of the screen hover over `APIs & Services`. Then in the menu right of that select `API Libraries`
2. Search for `VM Manager` (OS Config API) or scroll down in the left hand column and select the filter labeled `Compute` where it is the last listed. Open this API.
3. Verify the blue button at the top is enabled.

Determine if VM Instances have correct metadata tags for OSConfig parsing

1. From the main Google Cloud console, open the hamburger menu in the top left. Mouse over Computer Engine to expand the menu next to it.
2. Under the `Settings` heading, select `Metadata`.
3. In this view there will be a list of the project wide metadata tags for VMs. Determine if the tag `enable-osconfig` is set to `true`.

Determine if the Operating System of VM Instances have the local OS-Config Agent running

There is no way to determine this from the Google Cloud console. The only way is to run operating specific commands locally inside the operating system via remote connection. For the sake of brevity of this recommendation please view the docs/troubleshooting/vm-manager/verify-setup reference at the bottom of the page. If you initialized your VM instance with a Google Supplied OS Image with a build date of later than v20200114 it will have the service installed. You should still determine its status for proper operation.

Verify the service account you have setup for the project in Recommendation 4.1 is running

1. Go to the `VM instances` page by visiting: <https://console.cloud.google.com/compute/instances>.
2. Click on each instance name to go to its `VM instance details` page.
3. Under the section `Service Account`, take note of the service account
4. Run the commands locally for your operating system that are located at the docs/troubleshooting/vm-manager/verify-setup#service-account-enabled reference located at the bottom of this page. They should return the name of your service account.

Determine if Instances can connect to public update hosting

Each type of operating system has its own update process. You will need to determine on each operating system that it can reach the update servers via its network connection. The VM Manager doesn't host the updates, it will only allow you to centrally issue a command to each VM to update.

Determine if OS Config API is Enabled for the Project

1. In each project you wish to enable run the following command

            gcloud services list

2. If osconfig.googleapis.com is in the left hand column it is enabled for this project.

Determine if VM Manager is Enabled for the Project

1. Within the project run the following command:

            gcloud compute instances os-inventory describe VM-NAME \ --zone=ZONE

The output will look like

            INSTANCE_ID         INSTANCE_NAME   OS                                      OSCONFIG_AGENT_VERSION          UPDATE_TIME 
            29255009728795105   centos7         CentOS Linux 7 (Core)                       20210217.00-g1.el7        2021-04-12T22:19:36.559Z 
            5138980234596718741 rhel-8          Red Hat Enterprise Linux 8.3 (Ootpa)        20210316.00-g1.el8        2021-09-16T17:19:24Z 
            7127836223366142250 windows         Microsoft Windows Server 2019 Datacenter    20210316.00.0+win@1       2021-09-16T17:13:18Z

Determine if VM Instances have correct metadata tags for OSConfig parsing

1. Select the project you want to view tagging in.

From Google Cloud Console

1. From the main Google Cloud console, open the hamburger menu in the top left. Mouse over Computer Engine to expand the menu next to it.
2. Under the `Settings` heading, select `Metadata`.
3. In this view there will be a list of the project wide metadata tags for Vms. Verify a tag of `enable-osconfig` is in this list and it is set to `true`.

### From Command Line

Run the following command to view instance data

            gcloud compute instances list --format="table(name,status,tags.list())"

On each instance it should have a tag of `enable-osconfig` set to `true`

Determine if the Operating System of VM Instances have the local OS-Config Agent running

There is no way to determine this from the Google Cloud CLI. The best way is to run the the commands inside the operating system located at 'Check OS-Config agent is installed and running' at the /docs/troubleshooting/vm-manager/verify-setup reference at the bottom of the page. If you initialized your VM instance with a Google Supplied OS Image with a build date of later than v20200114 it will have the service installed. You should still determine its status.

Verify the service account you have setup for the project in Recommendation 4.1 is running

1. Go to the `VM instances` page by visiting: <https://console.cloud.google.com/compute/instances>.
2. Click on each instance name to go to its `VM instance details` page.
3. Under the section `Service Account`, take note of the service account
4. View the compute/docs/troubleshooting/vm-manager/verify-setup#service-account-enabled resource at the bottom of the page for operating system specific commands to run locally.

Determine if Instances can connect to public update hosting

Linux
Debian Based Operating Systems

            sudo apt update

The output should have a numbered list of lines with Hit: URL of updates.

Redhat Based Operating Systems

            yum check-update

The output should show a list of packages that have updates available.

Windows

            ping http://windowsupdate.microsoft.com/

The ping should successfully be delivered and received.

## Default Value

By default most operating systems and programs do not update themselves. The Google Cloud VM Manager which is a dependency of the OS Patch management feature is installed on Google Built OS images with a build date of v20200114 or later. The VM manager is not enabled in a project by default and will need to be setup.

## References

1. <https://cloud.google.com/compute/docs/manage-os>
2. <https://cloud.google.com/compute/docs/os-patch-management>
3. <https://cloud.google.com/compute/docs/vm-manager>
4. <https://cloud.google.com/compute/docs/images/os-details#vm-manager>
5. <https://cloud.google.com/compute/docs/vm-manager#pricing>
6. <https://cloud.google.com/compute/docs/troubleshooting/vm-manager/verify-setup>
7. <https://cloud.google.com/compute/docs/instances/view-os-details#view-data-tools>
8. <https://cloud.google.com/compute/docs/os-patch-management/create-patch-job>
9. <https://cloud.google.com/nat/docs/set-up-network-address-translation>
10. <https://cloud.google.com/vpc/docs/configure-private-google-access>
11. <https://workbench.cisecurity.org/sections/811638/recommendations/1334335>
12. <https://cloud.google.com/compute/docs/manage-os#agent-install>
13. <https://cloud.google.com/compute/docs/troubleshooting/vm-manager/verify-setup#service-account-enabled>
14. <https://cloud.google.com/compute/docs/os-patch-management#use-dashboard>
15. <https://cloud.google.com/compute/docs/troubleshooting/vm-manager/verify-setup#metadata-enabled>

## Additional Information

This is not your only solution to handle updates. This is a Google Cloud specific recommendation to leverage a resource to solve the need for comprehensive update procedures and policy. If you have a solution already in place you do not need to make the switch.

There are also further resources that would be out of the scope of this recommendation. If you need to allow your VMs to access public hosted updates, please see the reference to setup NAT or Private Google Access.
