from googleapiclient.errors import HttpError
from google.oauth2 import service_account
from apiclient import discovery

import os.path

SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']

SAMPLE_SPREADSHEET_ID = '1uUaH4NNnmE96WwHNZDy0defGaBAynW8URW_SKhUCtbc'

final_string = ""

fids = []
years = []
disasters = []

creds = None

if os.path.exists('token.json'):
    creds = service_account.Credentials.from_service_account_file('token.json', scopes=SCOPES)

try:
    service = discovery.build('sheets', 'v4', credentials=creds)

    # Call the Sheets API
    sheet = service.spreadsheets()
    result = sheet.values().get(spreadsheetId=SAMPLE_SPREADSHEET_ID,
                                    range="A2:AB65096").execute()
    values = result.get('values', [])

    if not values:
        print('No data found.')

    count_type = 0

    data = {}

    for row in values:
        fips_code = row[18]
        year = row[5]
        disaster_type = row[6]

        if fips_code not in data:
            data[fips_code] = {}

        if year not in data[fips_code]:
            data[fips_code][year] = {}

        if disaster_type not in data[fips_code][year]:
            data[fips_code][year][disaster_type] = 0

        data[fips_code][year][disaster_type] += 1

    for fips_code, years in data.items():
        for year, disasters in years.items():
            for disaster_type, count in disasters.items():
                final_string += f"\"{fips_code}\",\"{year}\",\"{disaster_type}\",\"{count}\"\n"

      
except HttpError as err:
    print(err)

with open("results.txt", "w", encoding="utf-8") as text_file:
    text_file.write(final_string)
    print("done")