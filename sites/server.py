from flask import Flask, jsonify
import requests

app = Flask(__name__)

# SharePoint URL и идентификационные данные
SHAREPOINT_SITE = "https://regconru.sharepoint.com/sites/URS-Russia-Site"
EXCEL_FILE_PATH = "/_layouts/15/Doc2.aspx?action=edit&sourcedoc=%7Bdaff6f84-7194-41c0-92ef-f1800c1e0872%7D&wdOrigin=TEAMS-MAGLEV.teamsSdk_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1731315242117&web=1"

# Получите эти данные из SharePoint
CLIENT_ID = 'ВАШ_CLIENT_ID'
CLIENT_SECRET = 'ВАШ_CLIENT_SECRET'
TENANT_ID = 'ВАШ_TENANT_ID'

def get_access_token():
    # URL для получения токена доступа
    token_url = f"https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/token"
    token_data = {
        'grant_type': 'client_credentials',
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'scope': 'https://graph.microsoft.com/.default'
    }
    response = requests.post(token_url, data=token_data)
    response.raise_for_status()
    token = response.json().get('access_token')
    return token

@app.route('/api/data', methods=['GET'])
def get_excel_data():
    try:
        access_token = get_access_token()
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Accept': 'application/json;odata=verbose'
        }

        # URL для доступа к файлу Excel на SharePoint
        excel_url = f"{SHAREPOINT_SITE}{EXCEL_FILE_PATH}"
        response = requests.get(excel_url, headers=headers)
        response.raise_for_status()
        
        # Получаем и возвращаем данные (в реальном приложении данные нужно парсить)
        data = response.json()
        return jsonify(data)

    except requests.exceptions.RequestException as e:
        print(f"Ошибка при обращении к SharePoint: {e}")
        return jsonify({"error": "Ошибка при загрузке данных"}), 500

if __name__ == '__main__':
    app.run(port=3000)
