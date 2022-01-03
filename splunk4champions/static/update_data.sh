#!/bin/bash

# update DAX data 
echo "starting at `date`"
cd /home/pi/splunk4champions/splunk4champions/static
 /usr/bin/python3 s4c_getdata.py 
   #update weather archive
echo "starting weather tar.g at `date`"
    /usr/bin/python3 s4c_getweather.py
      # github upload
echo "starting git stuf at `date`"
      /usr/bin/git -C /home/pi/splunk4champions/splunk4champions/static add .
      /usr/bin/git -C /home/pi/splunk4champions/splunk4champions/static pull
      /usr/bin/git -C /home/pi/splunk4champions/splunk4champions/static commit -m "Scripted daily data update `date`"
      /usr/bin/git -C /home/pi/splunk4champions/splunk4champions/static push 
