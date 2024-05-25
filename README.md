# Nokia_Cloud_Automation

## Installation Guide

### Prerequisites
Before installing Nokia_Cloud_Automation, ensure you have the following prerequisites installed on your system:
- Python (version 3.6 or higher)
- pip (Python package manager)
- Git

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/serbanples/Nokia_Cloud_Automation.git

2. **Create python Env**
    ```markdown
    <!-- If the following command does not work, try using pip3 instead -->
    cd backend
    backend % python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt


2. **Install JavaScript dependencies**
    ```bash
    cd fronten
    npm install

3. **Run python Backend service**
    ```markdown
    <!-- If the following command does not work, try using pip3 instead -->
    cd backend
    flask run

4. **Run JavaScript Frontend**
    ```bash
    cd fronten
    npm run dev
