import os
import json
from twilio.rest import Client

base_path = os.path.dirname(__file__)
secret_path = os.path.join(base_path, '../private/twilio.json')

with open(secret_path, "r") as f:
    # Parse the JSON data into a Python variable
    secrets = json.load(f)
    account_sid = secrets['accountSid']
    auth_token  = secrets['authToken']
    from_number = secrets['phoneNumber']
    fail_to_number =  secrets['fail_to_number']

def send_text(message_body, to=fail_to_number):
    print('Sending Twilio Text')
    client = Client(account_sid, auth_token)
    try:
        message = client.messages.create(
            to=to, 
            from_=from_number,
            body=message_body)
        print('Text Sent. SID:', message.sid)
    except Exception as e:
        print(e)
