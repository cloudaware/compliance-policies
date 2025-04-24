# Remediation

## From Google Cloud Console

Enabling OS Patch Management on a Project by Project Basis

### Install OS Config API for the Project

1. Navigate into a project. In the expanded portal menu located at the top left of the screen hover over "APIs & Services". Then in the menu right of that select "API Libraries"
2. Search for "VM Manager (OS Config API) or scroll down in the left hand column and select the filter labeled "Compute" where it is the last listed. Open this API.
3. Click the blue 'Enable' button.

Add MetaData Tags for OSConfig Parsing

1. From the main Google Cloud console, open the portal menu in the top left. Mouse over Computer Engine to expand the menu next to it.
2. Under the "Settings" heading, select "Metadata".
3. In this view there will be a list of the project wide metadata tags for VMs. Click edit and 'add item' in the key column type 'enable-osconfig' and in the value column set it to 'true'.

From Command Line

1. For project wide tagging, run the following command

            gcloud compute project-info add-metadata \ 
                --project <PROJECT_ID>\ 
                --metadata=enable-osconfig=TRUE

Please see the reference /compute/docs/troubleshooting/vm-manager/verify-setup#metadata-enabled at the bottom for more options like instance specific tagging.

Note: Adding a new tag via commandline may overwrite existing tags. You will need to do this at a time of low usage for the least impact.

### Install and Start the Local OSConfig for Data Parsing

There is no way to centrally manage or start the Local OSConfig agent. Please view the reference of manage-os#agent-install to view specific operating system commands.

### Setup a project wide Service Account

Please view Recommendation 4.1 to view how to setup a service account. Rerun the audit procedure to test if it has taken effect.

### Enable NAT or Configure Private Google Access to allow Access to Public Update Hosting

For the sake of brevity, please see the attached resources to enable NAT or Private Google Access. Rerun the audit procedure to test if it has taken effect.

## From Command Line

### Install OS Config API for the Project

1. In each project you wish to audit run gcloud services enable osconfig.googleapis.com

### Install and Start the Local OSConfig for Data Parsing

Please view the reference of manage-os#agent-install to view specific operating system commands.

### Setup a project wide Service Account

Please view Recommendation 4.1 to view how to setup a service account. Rerun the audit procedure to test if it has taken effect.

### Enable NAT or Configure Private Google Access to allow Access to Public Update Hosting

For the sake of brevity, please see the attached resources to enable NAT or Private Google Access. Rerun the audit procedure to test if it has taken effect.

### Determine if Instances can connect to public update hosting

Linux Debian Based Operating Systems

            sudo apt update

The output should have a numbered list of lines with Hit: URL of updates.

Redhat Based Operating Systems

            yum check-update

The output should show a list of packages that have updates available.

Windows

            ping http://windowsupdate.microsoft.com/

The ping should successfully be delivered and received.
