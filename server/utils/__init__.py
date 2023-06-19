PACKAGE_NAME = "utils"
VERSION = "1.0.0"

from termcolor import colored

RESPONSE_TYPES = {
    "ERROR": 'An error occured, Please try again later',
    "QUERY_ERROR": 'The operation could not be completed, Please try again later',
    "INPUT_ERROR": 'The input you provided was invalid, Please check your data'
}
COLORS_BY_TYPE = {
    'ERROR': 'red',
    'INFO': 'blue',
    'SUCCESS': 'green',
    'WARNING': 'orange'
}
def log(type, message):
    print(f"{colored(type, COLORS_BY_TYPE[type])}:   {message}")

def getStandardResponse(type):
    return RESPONSE_TYPES[type] if type in RESPONSE_TYPES else RESPONSE_TYPES['ERROR']        

def getResponseDict():
    return {'status': 'err', 'data': None}