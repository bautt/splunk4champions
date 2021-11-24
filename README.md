# splunk4champions
## _Splunk SE Workshop for advanced users_
![](https://github.com/bautt/splunk4champions/blob/master/splunk4champions/static/appIcon_2x.png)

 Splunk4Champions is  a session for more experienced Splunk users (champions) who are still willing to learn some new tricks and get deeper understanding of how Splunk search works.
We want to share hints & tricks on how to use Splunk searches more efficiently and also provide some underlying theory for that. This is an interactive hands-on workshop which will require your participation and also provide your dozens of follow-up links to find more information. 

### Target audience: 
Advanced Splunk users 
Splunk admins

### Content:
- Options and GUI Settings
- Using Job Inspector
- What is a bucket, bloom filter, index and retention?
- Search performance: good and bad searches
- Data correlation with examples
- Converting log data to metrics
- Dashboard hints 

### Benefit:
- Sustainable and energy saving usage of Splunk
- New insights and inspiration

### Design Goals: 
Zero-Powerpoint: all information needed is included in the app

### Download and installation:
If you download a release https://github.com/bautt/splunk4champions/releases/ it will unpack as "splunk4champions".  Move the app in to $SPLUNKHOME/etc/apps or use Web to install and restart. :rocket:

*This app will create 3 new indexes (s4c_access, s4c_stocks, s4c_weather) and  upload 1.8 GB of example data.*

**Do not install on production systems.**

## Workshop Content 
This workshop contains 6 Main sections, each divided in multiple subsections. 

### Splunk Settings 
This is an easy introduction: quick review of the relevant settings for Splunk user interface.

![](https://github.com/bautt/splunk4champions/blob/master/1-Settings.png)
### Job Inspector
How to use job inspector and interpret results, how to share job inspector results with colleagues. 

![](https://github.com/bautt/splunk4champions/blob/master/2-JobInspector.png)

### Theory
How is data stored and searched in Splunk? Some basic understanding of Splunk deployment and internal architecture is important if you want to optimize. results. We also included most popular search tips and a quiz here. 

![](https://github.com/bautt/splunk4champions/blob/master/3-Theory.png)

### Data
We have last five years of DAX close data and few years of weather data - let us see, if we can gain any meaningful insights from it. 

![](https://github.com/bautt/splunk4champions/blob/master/4-Data.png)

### Metrics
Why would you store metric data as a text? This section is an introduction in to Splunk metrics with some hands-on exercises. 

![](https://github.com/bautt/splunk4champions/blob/master/5-Metrics.png)

### Dashboards
Examples for getting more from the dashboars while saving the planet. 

![](https://github.com/bautt/splunk4champions/blob/master/6-Dashboards.png)



###### Authors: Andreas Greeske (Chief developer) / Tomas Baublys
