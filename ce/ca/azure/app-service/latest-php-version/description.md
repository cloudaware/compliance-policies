# Description

Periodically, older versions of PHP may be deprecated and no longer supported. Using a supported version of PHP for app services is recommended to avoid potential unpatched vulnerabilities.

## Rationale

Deprecated and unsupported versions of programming and scripting languages can present vulnerabilities which may not be addressed or may not be addressable.

## Impact

If your app is written using version-dependent features or libraries, they may not be available on more recent versions. If you wish to update, research the impact thoroughly.

## Audit

Take note of the currently supported versions of PHP here: <https://www.php.net/supported-versions.php>

### From Azure Console

1. From Azure Home open the Portal Menu in the top left.
2. Go to `App Services`.
3. Click on each App.
4. Under `Settings` section, click on `Configuration`.
5. Click on the `General settings` pane, ensure that for a `Stack` of `PHP` the `Major Version` and `Minor Version` reflect a currently supported release.

**NOTE**: No action is required if `PHP version` is set to `Off`, as PHP is not used by your web app.

### From Azure CLI

To check PHP version for an existing app, run the following command:

```sh
az webapp config show --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --query "{LinuxFxVersion:linuxFxVersion,PHP_Version:phpVersion}"
```

The output should return a currently supported version of PHP. Any other version of PHP would be considered a finding.

**NOTE**: No action is required if the output is empty, as PHP is not used by your app.

### From PowerShell

```ps
$application = Get-AzWebApp -ResourceGroupName <RESOURCE_GROUP_NAME> -Name <APP_NAME> $application.SiteConfig | select-object LinuxFXVersion, phpVersion
```

The output should return a currently supported version of PHP. Any other version of PHP would be considered a finding.

**NOTE**: No action is required if the output is empty, as PHP is not used by your app.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [f466b2a6-823d-470d-8ea5-b031e72d79ae](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Ff466b2a6-823d-470d-8ea5-b031e72d79ae) - **Name**: `App Service app slots that use PHP should use a specified 'PHP version`
- **Policy ID**: [7261b898-8a84-4db8-9e04-18527132abb3](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F7261b898-8a84-4db8-9e04-18527132abb3) - **Name**: `App Service apps that use PHP should use a specified 'PHP version'`

## Default Value

The version of PHP is whatever was selected upon App creation.

## References

1. <https://docs.microsoft.com/en-us/azure/app-service/web-sites-configure#general-settings>
2. <https://docs.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-posture-vulnerability-management#pv-7-rapidly-and-automatically-remediate-software-vulnerabilities>
3. <https://docs.microsoft.com/en-us/security/benchmark/azure/security-controls-v3-posture-vulnerability-management#pv-3-establish-secure-configurations-for-compute-resources>
4. <https://www.php.net/supported-versions.php>

## Additional Information

Currently supported versions can be confirmed here: <https://www.php.net/supported-versions.php>
