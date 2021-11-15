from locust import HttpUser, task, between


class HestiaTask(HttpUser):
    wait_time = between(1, 3)

    def on_start(self):
        self.client.get("/")

    def _get_csv(self, file_path, file_content_type='text/plain'):
        import os
        file_name = os.path.basename(file_path)
        file_content = open(file_path, 'rb')
        return file_name, file_content, file_content_type

    @task()
    def posts(self):

        files = {"uploadCsv": self._get_csv("sample.csv")}
        self.client.post("/api/pivot", data={}, files=files)
