from flask import request, jsonify
from pydantic import ValidationError, BaseModel
from typing import List, Dict
from loaders.logger import c_log

api_data: Dict[str, List[dict]] = {}
next_id = 0

def handle_request(route, item_id=None):
    if request.method == 'GET':
        return get_data(api_data.get(route, []), item_id, f'GET request to {request.path}')
    elif request.method == 'POST':
        return create_data(api_data.setdefault(route, []), f'POST request to {request.path}')
    elif request.method == 'PUT':
        return update_data(api_data.get(route, []), item_id, f'PUT request to {request.path}')
    elif request.method == 'DELETE':
        return delete_data(api_data.get(route, []), item_id, f'DELETE request to {request.path}')
    else:
        return jsonify({"error": "Method not allowed"}), 405

def get_data(data, data_id=None, call_msg=None):
    if data_id is not None:
        try:
            data_id = int(data_id)
        except ValueError:
            c_log('error', f'{call_msg} / Invalid ID format.')
            return 'Invalid ID format', 400

        single_data = next((d for d in data if d['id'] == data_id), None)
        if single_data:
            c_log('success', f'Data with ID:{data_id} was RETRIEVED!')
            return jsonify(single_data)
        else:
            c_log('error', f'{call_msg} / Data with ID:{data_id} was not found.')
            return 'Data not found', 404
    else:
        c_log('success', call_msg)
        return jsonify(data)


def create_data(data, call_msg):
    global next_id

    new_data = request.json
    if not new_data:
        c_log('error', f'{call_msg} / No new_data on HTTP request.')
        return jsonify({"error": "Invalid input"}), 400

    next_id += 1
    new_data['id'] = next_id
    data.append(new_data)
    c_log('success', call_msg)
    return jsonify(new_data), 201

def update_data(data, data_id, call_msg):
    updated_data = request.get_json()
    if not updated_data:
        c_log('warning', call_msg)
        return jsonify({"error": "Invalid input"}), 400

    if data is None:
        c_log('error', f'{call_msg} / Data object is None.')
        return 'Data object is None', 500

    for d in data:
        if str(d['id']) == str(data_id):
            d.update(updated_data)
            c_log('success', call_msg)
            return jsonify(updated_data)
    c_log('error', f'{call_msg} / Data with ID:{data_id} was not found.')
    return 'Data not found', 404

def delete_data(data, data_id, call_msg):
    if data is None:
        c_log('error', f'{call_msg} / Data object is None.')
        return 'Data object is None', 500

    for i, d in enumerate(data):
        if str(d['id']) == str(data_id):
            del data[i]
            c_log('success', call_msg)
            return {"message": f'Deleted ID: {data_id}'}
    c_log('error', f'{call_msg} / Data with ID: {data_id} was not found.')
    return 'Data not found', 404

def create_routes(app, routes):
    for base_route in routes:
        # Route without ID
        endpoint_no_id = f"{base_route.replace('/', '_')}_no_id"
        app.add_url_rule(base_route, endpoint=endpoint_no_id, view_func=lambda: handle_request(base_route, None), methods=['GET', 'POST'])
        
        # Route with ID
        endpoint_with_id = f"{base_route.replace('/', '_')}_with_id"
        app.add_url_rule(f"{base_route}/<item_id>", endpoint=endpoint_with_id, view_func=lambda item_id: handle_request(base_route, item_id), methods=['GET', 'PUT', 'DELETE'])
