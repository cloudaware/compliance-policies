# Description

Periodically, newer versions are released for Python software either due to security flaws or to include additional functionality. Using the latest full Python version for web apps is recommended in order to take advantage of security fixes, if any, and/or additional functionalities of the newer version.

## Rationale

Newer versions may contain security enhancements and additional functionality. Using the latest software version is recommended in order to take advantage of enhancements and new capabilities. With each software installation, organizations need to determine if a given update meets their requirements. They must also verify the compatibility and support provided for any additional software against the update revision that is selected. Using the latest full version will keep your stack secure to vulnerabilities and exploits.

## Impact

If your app is written using version-dependent features or libraries, they may not be available on the latest version. If you wish to upgrade, research the impact thoroughly. Upgrading may have unforeseen consequences that could result in downtime.

## Audit

### From Azure Console

1. From Azure Home open the Portal Menu in the top left.
2. Go to `App Services`.
3. Click on each App.
4. Under `Settings` section, click on `Configuration`.
5. Click on the `General settings` pane and ensure that for a Stack of Python, with `Major Version` of `Python 3`, that the `Minor Version` is set to the latest stable version available (Python 3.11, at the time of writing).

**NOTE**: No action is required if `Python version` is set to `Off`, as Python is not used by your web app.

### From Azure CLI

To check Python version for an existing app, run the following command:

```sh
az webapp config show --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --query "{LinuxFxVersion:linuxFxVersion,WindowsFxVersion:windowsFxVersion,PythonVersion:pythonVersion}
```

The output should return the latest stable version of Python.

**NOTE**: No action is required if the output is empty, as Python is not used by your web app.

### From PowerShell

```ps
$app = Get-AzWebApp -Name <app name> -ResourceGroup <resource group name> $app.SiteConfig |Select-Object LinuxFXVersion, WindowsFxVersion, PythonVersion
```

Ensure the output of the above command shows the latest version of Python.

**NOTE**: No action is required if the output is empty, as Python is not used by your web app.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [9c014953-ef68-4a98-82af-fd0f6b2306c8](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F9c014953-ef68-4a98-82af-fd0f6b2306c8) - **Name**: `App Service app slots that use Python should use a specified 'Python version'`
- **Policy ID**: [7008174a-fd10-4ef0-817e-fc820a951d73](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F7008174a-fd10-4ef0-817e-fc820a951d73) - **Name**: `App Service apps that use Python should use a specified 'Python version'`

## Default Value

The version of Python is whatever was selected upon App creation.

## References

1. <https://docs.microsoft.com/en-us/azure/app-service/web-sites-configure#general-settings>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-posture-vulnerability-management#pv-6-rapidly-and-automatically-remediate-vulnerabilities>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-posture-vulnerability-management#pv-3-define-and-establish-secure-configurations-for-compute-resources>
4. <https://www.python.org/downloads/>

## Additional Information

The latest stable version can be confirmed by going to python.org. Navigate to the downloads, and then find the most recent version that is marked by security in the maintenance column.
