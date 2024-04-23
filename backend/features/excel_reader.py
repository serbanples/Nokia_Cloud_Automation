import openpyxl

def read_xlsx(filename):
    data = []
    workbook = openpyxl.load_workbook(filename)
    sheet = workbook.active
    for row in sheet.iter_rows(values_only=True):
        data.append(row)
    return data

def find_entries_by_name(xlsx_data, name):
    entries = []
    for row in xlsx_data:
        name_, topology, owner, VM1, MPlane, VM2 = row
        if name_ == name:
            entry = {
                "name": name_,
                "topology": topology,
                "owner": owner,
                "VM1": VM1,
                "MPlane": MPlane,
                "VM2": VM2
            }
            entries.append(entry)
    return entries
