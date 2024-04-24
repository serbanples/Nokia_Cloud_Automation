import paramiko
import openpyxl

def read_xlsx(filename):
    data = []
    workbook = openpyxl.load_workbook(filename)
    sheet = workbook.active
    for row in sheet.iter_rows(values_only=True):
        data.append(row)
    return data

def test_ssh_connection(hostname, username):
    ssh_client = paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        ssh_client.connect(hostname=hostname, 
                           username=username, 
                           password='')
        print("SSH connection established successfully to", hostname)
        return True

    except Exception as e:
        print("Failed to connect to", hostname, ":", e)
        return False

    finally:
        ssh_client.close()

if __name__ == "__main__":
    xlsx_file = 'task3.xlsx'
    xlsx_data = read_xlsx(xlsx_file)
    
    input_topology = input("Enter the topology: ")

    found = False
    for row in xlsx_data:
        name, topology, owner, VM1, MPlane, VM2 = row
        if topology == input_topology:
            found = True
            if test_ssh_connection(VM2, name):
                break
            elif test_ssh_connection(VM1, name):
                break
    
    if not found:
        print("Topology not found in the Excel file:", input_topology)
