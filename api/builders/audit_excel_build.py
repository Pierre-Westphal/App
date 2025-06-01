from openpyxl import Workbook
import datetime
import os 
from config.config import AppConfig


class AuditExcelBuilder:
    def __init__(self, audit_data):
        config = AppConfig()
        self.audit_data = audit_data
        self.workbook = Workbook()
        self.sheet = self.workbook.active
        self.sheet.title = "Audit Report"
        self.folder_path = config.EXPORT_PATH

    def build_excel(self):
        # Add headers
        headers = ["Audit ID", "Username", "timestamp", "method", "path", "details"]
        self.sheet.append(headers)

        # Add data rows
        for audit in self.audit_data:
            row = [audit.get("audit_id"), audit.get("username"), audit.get("timestamp"), audit.get("method"), audit.get("path"), audit.get("details")]
            self.sheet.append(row)

        datetime_now = datetime.datetime.now()
        timestamp_seconds_from_datetime = datetime_now.timestamp()
        
        file_name = f"audit_report_{timestamp_seconds_from_datetime}.xlsx"

        if not os.path.exists(self.folder_path):
            os.makedirs(self.folder_path)

        file_path = os.path.join(self.folder_path, file_name)
        self.workbook.save(file_path)

        return self.workbook, file_path