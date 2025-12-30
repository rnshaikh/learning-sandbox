from collections import defaultdict
import datetime


class LogProcessor:
    """
        Processed log: removed invalid entry
    """
    def __init__(self, file=None):
        self.logs = defaultdict(list)
        self.file = file
        self.latest_time = datetime.datetime.strptime('00:00:00', '%H:%M:%S')
        self.earliest_time = datetime.datetime.strptime('23:59:59', '%H:%M:%S')

    def format_time(self, time):
        try:
            time = datetime.datetime.strptime(time, "%H:%M:%S")
            return time
        except:
            pass

    def is_valid_log(self, arr):
        try:
            if len(arr) < 3 or len(arr) > 3:
                return False
            time, name, mark = arr[0], arr[1], arr[2]

            if not name.isalnum():
                return False
            if not self.format_time(time):
                return False
            if mark not in ['Start', 'End']:
                return False
            return True
        except:
            return False

    def process_log(self):
        lines = self.file.readlines()
        for line in lines:
            line = line.strip()
            arr = line.split(" ")
            if self.is_valid_log(arr):
                time = self.format_time(arr[0])
                name, mark = arr[1], arr[2]
                self.latest_time = max(self.latest_time, time)
                self.earliest_time = min(self.earliest_time, time)
                self.logs[name].append([time, mark])
