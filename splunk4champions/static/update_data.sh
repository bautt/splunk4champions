#!/bin/bash

# update DAX data 
echo "starting" 
cd /home/pi/splunk4champions/splunk4champions/static
 /usr/bin/python3 s4c_getdata.py 
  sleep 30

   #update weather archive
    /usr/bin/python3 s4c_getweather.py
     sleep 300

      # github upload

      /usr/bin/git -C /home/pi/splunk4champions/splunk4champions/static add .
      /usr/bin/git -C /home/pi/splunk4champions/splunk4champions/static pull
      /usr/bin/git -C /home/pi/splunk4champions/splunk4champions/static commit -m "Scripted daily data update `date`"
      /usr/bin/git -C /home/pi/splunk4champions/splunk4champions/static push 
