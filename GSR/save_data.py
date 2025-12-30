from db_connection import mydb

class SaveData:

    def __init__(self, process_obj):
        self.process_obj = process_obj

    def save_data(self):
        pass


class SaveMysql(SaveData):

    def __init__(self, process_obj):
        super().__init__(process_obj)

    def save_data(self):
        mycursor = mydb.cursor()
        sql = """INSERT INTO ascend (app, platform, date,
                     ad_cpm , install_rate,
                     ad_revenue , spent,  fill_rate,
                     unfilled_impressions, impressions, clicks,
                     measurable_impressions, viewable_impressions, page_views) VALUES
                     (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"""
        val = self.process_obj.resp_val
        try:
          mycursor.executemany(sql, val)
          print(mycursor.rowcount, "records inserted.")
        except Exception as e:
          raise Exception(e)
        mydb.commit()

