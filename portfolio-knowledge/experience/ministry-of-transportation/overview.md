# Ministry of Transportation Experience

## Role / Position
Engineering Intern  
Software & Data Engineering Intern

## Organization
Ministry of Transportation Ontario  
Traffic / ITS / Data Engineering related teams

## Dates
May 2024 – August 2025

## Overview
During my internship at the Ministry of Transportation Ontario, I worked on traffic data engineering, automation, database updates, PowerApps development, and reporting tools used to support transportation operations and traffic analysis. My work focused on collecting, cleaning, validating, comparing, and visualizing traffic data from multiple sources such as HERE, TomTom, Waze, Transnomis, MTO Bluetooth, and internal MTO systems.

A major part of my role involved building Python scripts and data pipelines that automated manual traffic data processing tasks, improved travel time comparison workflows, and supported Power BI reporting. I also contributed to internal tools such as the ITS Systems Inventory application using PowerApps, Microsoft DevOps, and database-backed workflows.

## Responsibilities
- Built Python automation scripts for extracting, cleaning, filtering, and comparing traffic data.
- Worked with traffic data from HERE, TomTom, Waze, Transnomis, MTO Bluetooth, and other internal MTO sources.
- Created route-based travel time processing workflows using geospatial data.
- Used Shapely, GeoPandas, and QGIS to work with route geometries, shapefiles, and highway segments.
- Parsed XML and JSON data from traffic APIs and transformed it into structured CSV and Excel outputs.
- Managed and updated Oracle SQL databases for transportation-related datasets.
- Performed recurring ONCTMS crossing database updates and reviewed SQL changes.
- Supported Power BI dashboards by preparing clean and structured datasets.
- Built and improved internal PowerApps tools for ITS inventory and asset lookup.
- Used Microsoft DevOps for version control, release pipelines, and PowerApps deployment workflows.
- Cleaned and organized SharePoint and Microsoft Planner data for internal support applications.
- Helped maintain Excel-based tracking tools and supported planning for Excel-to-database migration.
- Verified transportation datasets using Python and Databricks.
- Worked with technical staff to understand requirements, debug data issues, and improve existing workflows.

## Projects / Work Completed

### HERE Data Filtering and Route Creation
Built Python scripts to extract traffic data from HERE XML feeds and process the data by route. The scripts filtered traffic segments based on route geometry and produced travel time outputs for analysis.

This project involved creating and using shapefiles, working with route boundaries, matching traffic segments to routes, and calculating travel times based on filtered segment data.

### TomTom Virtual Machine Script
Developed a Python script that accessed TomTom API/XML links, downloaded travel time data, archived the raw files, and ran repeatedly on a virtual machine at set intervals.

The script helped automate continuous data collection instead of requiring manual downloads. It was designed to run for a user-defined duration and collect traffic data every few minutes.

### Travel Time Comparison Tool
Built a travel time comparison workflow that combined data from multiple traffic sources, including MTO, Transnomis, Waze, TomTom, and HERE.

The tool merged datasets using standardized route IDs, calculated travel times in minutes and seconds, compared percentage differences between sources, summarized total counts, and exported the results into a structured Excel file for Power BI and analysis.

The output included multiple sheets such as raw source data, comparison tables, route information, summaries, percentage ranges, and interval averages.

### VMS Data Filtering Script
Created a Python script to filter Variable Message Sign data from Excel files. The script extracted relevant sign messages and travel time information, cleaned the data, and prepared it for reporting or further analysis.

This helped reduce the amount of manual filtering required when working with large VMS datasets.

### ITS Systems Inventory PowerApps Application
Worked on an internal PowerApps application for managing and viewing ITS systems inventory data. The application included an interactive map and improved the way users could search, filter, and locate transportation assets.

The goal was to make asset lookup faster, improve internal visibility of ITS systems, and reduce manual searching through spreadsheets or disconnected records.

### PowerApps DevOps and Release Pipeline Work
Used Microsoft DevOps to support version control and deployment workflows for PowerApps. This helped improve how updates were managed and released, making the process more organized and reliable.

### Oracle SQL Database Updates
Worked with Oracle SQL databases to update and maintain transportation-related records. This included recurring ONCTMS crossing database updates, SQL reviews, and region-specific database maintenance.

I was responsible for supporting updates for the North West Region and making sure records were accurate and consistent.

### Power BI Dashboard Support
Prepared cleaned and structured data for Power BI dashboards. This included automating monthly dashboard inputs, formatting Excel outputs, and ensuring datasets were ready for visualization and reporting.

### Databricks and MDIS Data Verification
Used Databricks and Python to verify transportation datasets and check for data quality issues. This included validating data, identifying inconsistencies, and helping ensure that internal datasets were reliable.

### SharePoint and Microsoft Planner Cleanup
Cleaned and organized SharePoint and Microsoft Planner data for internal ITS support tools. This helped improve organization, tracking, and usability for teams relying on those platforms.

### TMC Excel Maintenance and Database Migration Planning
Maintained Excel-based transportation management records and supported planning for moving Excel-based workflows into a more structured database system.

## Technical Contributions
- Designed Python scripts to automate traffic data extraction, filtering, comparison, and reporting.
- Parsed XML and JSON data from external traffic data providers.
- Used Shapely and GeoPandas to perform geospatial filtering of traffic segments against route geometries.
- Created route shapefiles and used QGIS to validate route boundaries and spatial relationships.
- Built ETL-style workflows that cleaned raw traffic data and converted it into structured Excel/CSV outputs.
- Combined multiple traffic datasets into a single comparison workflow using standardized route identifiers.
- Calculated travel time differences, percentage comparisons, interval averages, completeness values, and summary statistics.
- Created scripts that produced multi-sheet Excel reports for analysis and dashboard integration.
- Improved repeatability by replacing manual spreadsheet work with reusable Python automation.
- Used Oracle SQL to query, update, and validate transportation records.
- Supported Power BI reporting by preparing consistent datasets for dashboard refreshes.
- Contributed to PowerApps frontend and data design for an ITS inventory application.
- Helped implement DevOps workflows for PowerApps release management.
- Worked with cloud and internal tools such as Databricks, SharePoint, Planner, and Microsoft DevOps.

## Tools / Technologies
- Python
- Pandas
- NumPy
- GeoPandas
- Shapely
- QGIS
- XML parsing
- JSON parsing
- REST APIs
- TomTom API
- HERE traffic data
- Waze data
- Transnomis data
- MTO Bluetooth data
- Oracle SQL
- Databricks
- Power BI
- Microsoft PowerApps
- Microsoft DevOps / Azure DevOps
- Microsoft SharePoint
- Microsoft Planner
- Microsoft Excel
- CSV / Excel automation
- Virtual machines
- ETL pipelines
- Geospatial data processing
- Shapefiles

## Skills Demonstrated
- Data engineering
- Python automation
- API integration
- ETL pipeline development
- Traffic data analysis
- Geospatial data processing
- Database management
- SQL querying and updates
- Data cleaning and validation
- Dashboard data preparation
- PowerApps development
- DevOps workflow support
- Debugging and troubleshooting
- Technical documentation
- Cross-functional communication
- Working with real-world government datasets
- Converting manual workflows into automated tools
- Understanding user requirements and turning them into technical solutions

## Challenges
- Traffic data came from multiple sources with different formats, timestamps, route IDs, and measurement methods.
- HERE, TomTom, Waze, Transnomis, and MTO datasets did not always match directly, so comparison required careful cleaning and standardization.
- Some datasets were large and difficult to process manually in Excel.
- Geospatial route matching required accuracy because incorrect route boundaries could produce incorrect travel time results.
- XML and API data had to be parsed consistently and converted into usable formats.
- Some workflows depended on legacy spreadsheets, which made automation and validation harder.
- PowerApps and DevOps workflows required careful version control so updates did not break existing internal tools.
- Database updates needed to be accurate because they affected operational transportation records.
- Power BI dashboards required clean and consistent source data to avoid misleading results.

## How I Solved Them
- Built reusable Python scripts to automate repetitive data extraction, filtering, and reporting tasks.
- Standardized route identifiers and data formats before merging datasets from different traffic sources.
- Used GeoPandas, Shapely, and QGIS to validate route shapes and improve spatial filtering accuracy.
- Created structured Excel outputs with separate sheets for raw data, cleaned data, comparisons, summaries, and percentage ranges.
- Added calculations for travel time differences, percentage comparisons, total counts, and interval averages.
- Used SQL queries and code reviews to make database updates safer and more reliable.
- Broke down large manual workflows into smaller automated steps that could be tested and reused.
- Used Microsoft DevOps to support organized PowerApps development and deployment.
- Worked closely with team members to understand existing workflows before replacing or improving them.
- Validated outputs against expected results to make sure the automation was producing accurate data.

## Impact / Results
- Reduced manual processing time for traffic data workflows by approximately 45%.
- Improved data completeness and consistency across multiple travel time routes.
- Helped compare travel time performance across sources such as HERE, TomTom, Waze, Transnomis, and MTO data.
- Improved ITS asset lookup time by approximately 30% through PowerApps inventory improvements.
- Increased automation in internal inventory workflows by approximately 50%.
- Improved PowerApps release efficiency by approximately 30% through DevOps-supported deployment workflows.
- Created reusable scripts that made monthly and recurring reporting tasks faster and more consistent.
- Supported Power BI dashboards by producing cleaner and more reliable datasets.
- Helped reduce dependency on manual Excel filtering and repetitive data preparation.
- Improved the reliability of transportation data used for analysis, reporting, and decision-making.

## Good Interview Talking Points
- I worked on real-world transportation data pipelines using Python, SQL, APIs, and geospatial tools.
- I built automation scripts that reduced manual work and made recurring reporting faster.
- One of my biggest projects was a travel time comparison tool that merged data from multiple providers like HERE, TomTom, Waze, Transnomis, and MTO sources.
- I used GeoPandas, Shapely, and QGIS to filter traffic data by route geometry and calculate route-level travel times.
- I worked with both raw data and dashboard-ready outputs, so I got experience across the full data pipeline.
- I contributed to a PowerApps ITS Systems Inventory tool that improved how users searched for and viewed transportation assets.
- I used Oracle SQL for database updates, validation, and maintenance of transportation-related records.
- I supported Power BI dashboards by preparing clean datasets and automated Excel outputs.
- I worked with government data, which taught me the importance of accuracy, validation, and reliable reporting.
- I learned how to take manual spreadsheet-heavy workflows and turn them into repeatable automated tools.
- I worked across multiple technologies, including Python, SQL, PowerApps, Power BI, DevOps, Databricks, and geospatial libraries.
- A strong project to discuss in interviews is the Travel Time Comparison pipeline because it shows data engineering, automation, API work, geospatial filtering, and business impact.