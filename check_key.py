# -*- coding: utf-8 -*-
import urllib2
import json
import time

def test_api():
    print("Waiting 12 seconds for Vercel deployment to build with the secure diagnostic check...")
    time.sleep(12)
    
    url = 'https://bioedgeindia.vercel.app/api/Chat'
    data = {'message': 'Hi! Tell me one exciting biology fact.'}
    
    req = urllib2.Request(
        url, 
        json.dumps(data), 
        {'Content-Type': 'application/json'}
    )

    try:
        response = urllib2.urlopen(req)
        html = response.read()
        print("Success! Response: " + html)
    except Exception as e:
        if hasattr(e, 'read'):
            err_data = e.read()
            print("HTTP Error: " + str(e) + " - Content: " + err_data)
        else:
            print("Error: " + str(e))

if __name__ == '__main__':
    test_api()
