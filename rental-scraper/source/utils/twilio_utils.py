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
    to_numbers =  secrets['to']

def send_text(message_body):
    print('Sending Twilio Text')
    client = Client(account_sid, auth_token)
    try:
        message = client.messages.create(
            to=to_numbers, 
            from_=from_number,
            body=message_body)
        print('Text Sent. SID:', message.sid)
    except Exception as e:
        print(e)
