# Description

Periodically newer versions are released for PHP software either due to security flaws or to include additional functionality. Using the latest PHP version for web apps is recommended in order to take advantage of security fixes, if any, and/or additional functionalities of the newer version.

## Rationale

Newer versions may contain security enhancements and additional functionality. Using the latest software version is recommended in order to take advantage of enhancements and new capabilities. With each software installation, organizations need to determine if a given update meets their requirements. They must also verify the compatibility and support provided for any additional software against the update revision that is selected.

## Impact

If your app is written using version-dependent features or libraries, they may not be available on the latest version. If you wish to upgrade, research the impact thoroughly. Upgrading may have unforeseen consequences that could result in downtime.

## Audit

### From Azure Portal

1. From Azure Home open the Portal Menu in the top left.
2. Go to `App Services`.
3. Click on each App.
4. Under `Settings` section, click on `Configuration`.
5. Click on the `General settings` pane, ensure that for a `Stack` of `PHP` the `Major Version` and `Minor Version` reflect the latest stable and supported release.

The latest stable version can be confirmed by going to php.net. Navigate to the downloads, and then find the most recent version that is marked by `Current Stable PHP [version_number]`.

**NOTE**: No action is required If PHP version is set to Off as PHP is not used by your web app.

### From Azure CLI

To check PHP version for an existing app, run the following command:

```sh
az webapp config show --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --query "{LinuxFxVersion:linuxFxVersion,PHP_Version:phpVersion}"
```

### From PowerShell

```ps
$application = Get-AzWebApp -ResourceGroupName <resource group name> -Name <app name> $application.SiteConfig | select-object LinuxFXVersion, phpVersion
```

The output should return the latest available version of PHP. Any other version of PHP would be considered a finding.

**NOTE**: No action is required, If the output is empty as PHP is not used by your web app.

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [f466b2a6-823d-470d-8ea5-b031e72d79ae](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Ff466b2a6-823d-470d-8ea5-b031e72d79ae) - **Name**: `App Service app slots that use PHP should use a specified 'PHP version'`
- **Policy ID**: [7261b898-8a84-4db8-9e04-18527132abb3](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F7261b898-8a84-4db8-9e04-18527132abb3) - **Name**: `App Service apps that use PHP should use a specified 'PHP version'`

## Default Value

The version of PHP is whatever was selected upon App creation.

## References

1. <https://docs.microsoft.com/en-us/azure/app-service/web-sites-configure#general-settings>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-posture-vulnerability-management#pv-6-rapidly-and-automatically-remediate-vulnerabilities>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-posture-vulnerability-management#pv-3-define-and-establish-secure-configurations-for-compute-resources>
4. <https://www.php.net/downloads>
