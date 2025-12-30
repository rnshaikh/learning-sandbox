import sys

from process_log import LogProcessor
from report import CalculateReport, PrintReport

if __name__ == "__main__":
    if len(sys.argv) == 2:
        file_path = sys.argv[1]
        try:
            file = open(file_path, 'r')

            log_processor = LogProcessor(file=file)
            log_processor.process_log()

            report_obj = CalculateReport()
            for key in log_processor.logs:
                report_obj.calculate_sessions_time(log_processor, key)

            print_obj = PrintReport()
            print_obj.print_terminal(report_obj.report)

        except Exception as e:
            print("Internal Error:", e)
    else:
        print("Please specify only file path as command line argument")
