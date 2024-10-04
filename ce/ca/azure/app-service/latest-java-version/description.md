# Description

Periodically, older versions of Java may be deprecated and no longer supported. Using a supported version of Java for app services is recommended to avoid potential unpatched vulnerabilities.

## Rationale

Deprecated and unsupported versions of programming and scripting languages can present vulnerabilities which may not be addressed or may not be addressable.

## Impact

If your app is written using version-dependent features or libraries, they may not be available on more recent versions. If you wish to update, research the impact thoroughly.

## Audit

Take note of currently supported version of Java here: <https://www.oracle.com/java/technologies/java-se-support-roadmap.html>

### From Azure Portal

1. Login to Azure Portal using <https://portal.azure.com>.
2. Go to `App Services`.
3. Click on each App.
4. Under `Settings` section, click on `Configuration`.
5. Click on the `General settings` pane and ensure that for a `Stack` of `Java` the `Major Version` and `Minor Version` reflect a currently supported release, and that the `Java web server version` is set to the `auto-update` option.

**NOTE**: No action is required if `Java version` is set to `Off`, as Java is not used by your web app.

### From Azure CLI

To check Java version for an existing app, run the following command:

```sh
az webapp config show --resource-group <RESOURCE_GROUP_NAME> --name <APP_NAME> --query "{LinuxFxVersion:linuxFxVersion, WindowsFxVersion:windowsFxVersion, JavaVersion:javaVersion, JavaContainerVersion:javaContainerVersion, JavaContainer:javaContainer}"
```

Ensure the Java version used within the application is a currently supported version (if java is being used for the app being audited).

### From PowerShell

For each application, store the application information within an object, and then interrogate the `SiteConfig` information for that application object:

```ps
$app = Get-AzWebApp -Name <APP_NAME> -ResourceGroup <RESOURCE_GROUP_NAME> $app.SiteConfig |Select-Object LinuxFXVersion, WindowsFxVersion, JavaVersion, JavaContainerVersion, JavaContainer
```

Ensure the Java version used within the application is a currently supported version (if Java is being used for the app being audited).

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
4. <https://www.oracle.com/java/technologies/java-se-support-roadmap.html>

## Additional Information

Take note of currently supported version of Java here: <https://www.oracle.com/java/technologies/java-se-support-roadmap.html>
