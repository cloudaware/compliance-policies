# Description

Periodically, older versions of Python may be deprecated and no longer supported. Using a supported version of Python for App Services is recommended to avoid potential unpatched vulnerabilities.

## Rationale

Deprecated and unsupported versions of programming and scripting languages can present vulnerabilities that may not be addressed or may not be addressable.

## Impact

If your app is written using version-dependent features or libraries, they may not be available on more recent versions. If you wish to update, research the impact thoroughly.

## Audit

Take note of the currently supported versions (given a status of "security") of Python here: <https://devguide.python.org/versions/>

### From Azure Portal

1. In the Azure portal, open the portal menu in the upper left.
2. Go to `App Services`.
3. Select each app.
4. Under `Settings` section, click on `Configuration`.
5. Select the `General settings` pane and ensure that for a `Stack` of `Python`, the `Major Version` and `Minor Version` reflect a currently supported release.

The latest stable version can be confirmed on python.org. Navigate to the downloads page and find the most recent version marked as `Current Stable Python [version_number]`.

**Note**: No action is required if `Python version` is set to `Off`, as Python is not used by your web app.

### From Azure CLI

To check Python version for an existing app, run the following command:

```sh
az webapp config show \
    --resource-group {{resource-group-name}} \
    --name {{app-name}} \
    --query "{LinuxFxVersion:linuxFxVersion,WindowsFxVersion:windowsFxVersion,PythonVersion:pythonVersion}"
```

The output should return a currently supported version of Python.

**NOTE**: No action is required if the output is empty, as Python is not used by your app.

### From PowerShell

```ps
$app = Get-AzWebApp `
    -Name {{app-name}} `
    -ResourceGroup {{resource-group-name}} `
    $app.SiteConfig |
    Select-Object LinuxFXVersion, WindowsFxVersion, PythonVersion
```

Ensure the output of the above command shows a currently supported version of Python.

**NOTE**: No action is required if the output is empty, as Python is not used by your app.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [9c014953-ef68-4a98-82af-fd0f6b2306c8](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F9c014953-ef68-4a98-82af-fd0f6b2306c8) - **Name**: `App Service app slots that use Python should use a specified 'Python version'`
- **Policy ID**: [7008174a-fd10-4ef0-817e-fc820a951d73](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F7008174a-fd10-4ef0-817e-fc820a951d73) - **Name**: `App Service apps that use Python should use a specified 'Python version'`

## Default Value

The version of Python is whatever was selected upon App creation.

## References

1. <https://docs.microsoft.com/en-us/azure/app-service/web-sites-configure#general-settings>
2. <https://docs.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-posture-vulnerability-management#pv-7-rapidly-and-automatically-remediate-software-vulnerabilities>
3. <https://docs.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-posture-vulnerability-management#pv-3-establish-secure-configurations-for-compute-resources>
4. <https://devguide.python.org/versions/>

## Additional Information

Currently supported versions of Python can be confirmed by going to <https://devguide.python.org/versions/>. The currently supported versions are given the status of "security."
