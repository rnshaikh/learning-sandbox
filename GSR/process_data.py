import requests
from settings import TOKEN, URI


class Process:

    def __init__(self, date_start, date_end, dimensions):

        self.date_start = date_start
        self.date_end = date_end
        self.dimensions = dimensions
        self.resp = None
        self.resp_val = None

    def process_resp(self):
        val = []
        for i in self.resp["connections"]:
            val.append((i["app"], i["platform"], i["date"],
             i["ad_cpm"] , i["install_rate"],
             i["ad_revenue"] , i["spent"],  i["fill_rate"],
             i["unfilled_impressions"], i["impressions"], i["clicks"],
             i["measurable_impressions"], i["viewable_impressions"], i["page_views"]))
        self.resp_val = val

    def fetch_data(self):
        headers = {
            "Authorization": "Token "+TOKEN
        }
        params = {
            "allow_mock": "true",
            "period": "custom_date",
            "start_date": self.date_end,
            "end_date": self.date_end,
            "group_by": self.dimensions,
            "lock_on_collection": "false"
        }
        resp = requests.get(URI,params=params, headers=headers)

        if resp.status_code == 200:
            obj = resp.json()
            self.resp = obj
            self.process_resp()
        else:
            raise Exception(resp.json())
