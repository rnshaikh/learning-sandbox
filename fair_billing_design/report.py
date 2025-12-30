
class CalculateReport:
    """
        Calculate Report of given User
    """
    def __init__(self):
        self.report = {}

    def calculate_sessions_time(self, log_processor, user):

        sessions = log_processor.logs[user]
        stack = []
        total_seconds = 0
        sessions_count = 0

        for i in sessions:
            if i[1] == "Start":
                stack.append(i[0])
            else:
                end_time = i[0]
                start_time = log_processor.earliest_time
                if len(stack):
                    start_time = stack.pop()
                time_diff = end_time-start_time
                total_seconds += time_diff.seconds
                sessions_count += 1

        while len(stack):
            start_time = stack.pop()
            time_diff = log_processor.latest_time - start_time
            total_seconds += time_diff.seconds
            sessions_count += 1

        self.report[user] = (sessions_count, total_seconds)


class PrintReport:
    """
        Print Report
    """

    def print_terminal(self, report):
        for key in report:
            print('{} {} {}'.format(key, report[key][0], report[key][1]))
