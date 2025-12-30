import sys
import db_connection
from settings import TOKEN, URI
from process_data import Process
from save_data import SaveMysql

if __name__ == "__main__":

    if not TOKEN:
        print("Token not provided.")
        exit()

    if not URI:
        print("URI not provided.")
        exit()

    if len(sys.argv) == 4:
        date_start = sys.argv[1]
        date_end = sys.argv[2]
        dimensions = sys.argv[3]

        try:
            process_obj = Process(date_start, date_end, dimensions)
            process_obj.fetch_data()
            save_obj = SaveMysql(process_obj)
            save_obj.save_data()

        except Exception as e:
            print("Internal Error:", e)
    else:
        print("Please specify only file path as command line argument")



