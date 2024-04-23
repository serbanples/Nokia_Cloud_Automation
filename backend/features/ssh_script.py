import paramiko

def test_ssh_connection(hostname, username):
    ssh_client = paramiko.SSHClient()
    ssh_client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        ssh_client.connect(hostname=hostname, 
                           username=username, 
                           password='')
        return True, "SSH connection established successfully to " + hostname

    except Exception as e:
        return False, "An error occurred while connecting to " + hostname + ": " + str(e)

    finally:
        ssh_client.close()