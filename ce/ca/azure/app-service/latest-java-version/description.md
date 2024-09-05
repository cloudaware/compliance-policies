# Description

Periodically, newer versions are released for Java software either due to security flaws or to include additional functionality. Using the latest Java version for web apps is recommended in order to take advantage of security fixes, if any, and/or new functionalities of the newer version.

## Rationale

Newer versions may contain security enhancements and additional functionality. Using the latest software version is recommended in order to take advantage of enhancements and new capabilities. With each software installation, organizations need to determine if a given update meets their requirements. They must also verify the compatibility and support provided for any additional software against the update revision that is selected.

## Impact

If your app is written using version-dependent features or libraries, they may not be available on the latest version. If you wish to upgrade, research the impact thoroughly. Upgrading may have unforeseen consequences that could result in downtime.

## Audit

### From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Click on each App.
4. Under `Settings` section, click on `Configuration`.
5. Click on the `General settings` pane and ensure that for a `Stack` of `Java` the `Major Version` and `Minor Version` reflect the latest stable and supported release, and that the `Java web server version` is set to the `auto-update` option.

**NOTE**: No action is required if Java version is set to Off, as Java is not used by your web app.

### From Azure CLI

To check Java version for an existing app, run the following command:

```sh
az webapp config show --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --query "{LinuxFxVersion:linuxFxVersion, WindowsFxVersion:windowsFxVersion, JavaVersion:javaVersion, JavaContainerVersion:javaContainerVersion, JavaContainer:javaContainer}"
```

The output should return the latest available version of Java (if java is being used for the web application being audited).

### From PowerShell

For each application, store the application information within an object, and then interrogate the `SiteConfig` information for that application object:

```ps
$app = Get-AzWebApp -Name <app name> -ResourceGroup <resource group name> $app.SiteConfig |Select-Object LinuxFXVersion, WindowsFxVersion, JavaVersion, JavaContainerVersion, JavaContainer
```

Ensure the Java version used within the application is a currently supported version (if java is being used for the web application being audited).

### From Azure Policy

If referencing a digital copy of this Benchmark, clicking a Policy ID will open a link to the associated Policy definition in Azure.

- **Policy ID**: [e1d1b522-02b0-4d18-a04f-5ab62d20445f](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2Fe1d1b522-02b0-4d18-a04f-5ab62d20445f) - **Name**: `Function app slots that use Java should use a specified 'Java version'`
- **Policy ID**: [9d0b6ea4-93e2-4578-bf2f-6bb17d22b4bc](https://portal.azure.com/#view/Microsoft_Azure_Policy/PolicyDetailBlade/definitionId/%2Fproviders%2FMicrosoft.Authorization%2FpolicyDefinitions%2F9d0b6ea4-93e2-4578-bf2f-6bb17d22b4bc) - **Name**: `Function apps that use Java should use a specified 'Java version'`

## Default Value

The default setting is whichever setting was chosen in the creation of the webapp.

## References

1. <https://docs.microsoft.com/en-us/azure/app-service/web-sites-configure#general-settings>
2. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-posture-vulnerability-management#pv-3-define-and-establish-secure-configurations-for-compute-resources>
3. <https://learn.microsoft.com/en-us/security/benchmark/azure/mcsb-posture-vulnerability-management#pv-6-rapidly-and-automatically-remediate-vulnerabilities>
4. <https://www.oracle.com/java/technologies/downloads/#java11>
