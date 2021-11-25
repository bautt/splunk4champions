#!/bin/bash

# update DAX data 
cd /home/pi/splunk4champions/splunk4champions/static
 /usr/bin/python3 s4c_getdata.py 
  sleep 30

   #update weather archive
    /usr/bin/python3 s4c_getweather.py
     sleep 300

      # github upload

      /usr/bin/git add .
      /usr/bin/git pull
      /usr/bin/git commit -m "Scripted daily data update `date`"
      /usr/bin/git push 
