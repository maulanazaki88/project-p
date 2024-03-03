from flask import Flask, request
from datetime import datetime
from pymongo import MongoClient
import json

app = Flask(__name__)

# instansiasi MongoClient untuk koneksi ke database "projectp" MongoDB

client = MongoClient(
    "mongodb+srv://thandeousJake:rdwlffng88@tjlesson.k9uokcl.mongodb.net/", 27017)
database = client["projectp"]  # sama utk setiap crud operation

# disesuaikan dengan nama data
activity_collection = database["activities"]
chat_collection = database["chat"]
comments_collection = database["comments"]
notifications_collection = database["notifications"]
tasks_collection = database["tasks"]
users_collection = database["users"]
workspaces_collection = database["workspaces"]


# config
if __name__ == "__main__":
    # app.run(debug=True)
    app.run(port=8000)
# user model

# CREATE


@app.route("/api/create-user", methods=['POST'])
def create_user():
    # konversi json ke dictionary
    user_dict = json.loads(request.data)
    # request.data => data yg dikirimkan oleh klien

    # jumlah data ditemukan
    length = users_collection.count_documents(
        {"username": user_dict["username"]})

    # memeriksa apakah sudah ada akun yang memiliki username yang sama
    if length == 0:
        # pre-designed uid
        u_id = f"{user_dict['username'][:3]}-{str(datetime.now()).replace(':', '').replace(' ', '').replace('-', '').replace('.', '')}-usr"

        user_dict["u_id"] = u_id

        record = user_dict

        users_collection.insert_one(record)

        return json.dumps({"message": "success", "u_id": u_id})

    elif length != 0:
        return json.dumps({"message": "user-exist"})

    else:
        return json.dumps({"message": "failed"})


@app.route("/api/create-workspace", methods=['POST'])
def create_workspace():
    # konversi json ke dictionary
    workspace_dict = json.loads(request.data)
    print(workspace_dict)
    # request.data => data yg dikirimkan oleh klien

    # jumlah data ditemukan
    # memeriksa apakah sudah ada akun yang memiliki username yang sama
    w_id = f"{workspace_dict['name'][:3]}-{str(datetime.now()).replace(':', '').replace(' ', '').replace('-', '').replace('.', '')}-wks"

    workspace_dict["w_id"] = w_id

    record = workspace_dict

    workspaces_collection.insert_one(record)

    return json.dumps({"message": "success", "w_id": w_id})


@app.route("/api/create-task", methods=['POST'])
def create_task():
    # konversi json ke dictionary
    task_dict = json.loads(request.data)
    print(task_dict)
    # request.data => data yg dikirimkan oleh klien

    # jumlah data ditemukan
    # memeriksa apakah sudah ada akun yang memiliki username yang sama
    t_id = f"{str(datetime.now()).replace(':', '').replace(' ', '').replace('-', '').replace('.', '')}-tsk"

    task_dict["t_id"] = t_id

    record = task_dict

    tasks_collection.insert_one(record)

    return json.dumps({"message": "success", "t_id": t_id})

# READ untuk data user


@app.route("/api/get-user/<string:u_id>", methods=['GET'])
def get_user(u_id):
    user = users_collection.aggregate([{'$match': {'u_id': u_id}}, {'$lookup': {'from': 'workspaces', 'localField': 'workspace_ids', 'foreignField': 'w_id', 'pipeline': [
                                      {'$lookup': {'from': 'tasks', 'localField': 'task_ids', 'foreignField': 't_id', 'pipeline': [{'$project': {'_id': 0}}], 'as': 'task_list'}}, {'$project': {"_id": 0}}], 'as': 'workspace_list'}}, {'$project': {'_id': 0}}])
    return json.dumps(list(user)[0])


@app.route("/api/get-workspace/<string:w_id>", methods=['GET'])
def get_workspace(w_id):
    workspace = workspaces_collection.aggregate([{'$match': {'w_id': w_id}}, {'$lookup': {
                                                'from': 'tasks', 'localField': 'task_ids', 'foreignField': 't_id', 'pipeline': [{'$project': {'_id': 0}}], 'as': 'task_list'}}, {'$project': {'_id': 0}}])

    return json.dumps(list(workspace)[0])
# Mengambil semua data user


@app.route("/api/get-task/<string:t_id>", methods=['GET'])
def get_task(t_id):
    task = tasks_collection.aggregate([{'$match': {'t_id': t_id}}, {'$lookup': {'from': 'workspaces', 'localField': 'w_id', 'foreignField': 'w_id', 'pipeline': [
                                      {'$project': {'_id': 0, 'name': 1}}], 'as': 'workspace'}}, {'$project': {'_id': 0}}, {'$unwind': "$workspace"}])

    return json.dumps(list(task)[0])


@app.route("/api/get-all-users", methods=['GET'])
def get_all_user():
    users = users_collection.find({}, {"_id": 0})
    users_list = list(users)

    return json.dumps(users_list)

# UPDATE untuk data user


@app.route("/api/update-user/<string:u_id>", methods=['PUT'])
def update_user(u_id):
    new_record = json.loads(request.data)

    updated = users_collection.replace_one(
        {"u_id": u_id}, new_record)

    updated_count = updated.raw_result["nModified"]

    return json.dumps({"updated_count": updated_count})


@app.route("/api/update-workspace/<string:w_id>", methods=['PUT'])
def update_workspace(w_id):
    new_record = json.loads(request.data)

    updated = workspaces_collection.replace_one(
        {"w_id": w_id}, new_record)

    updated_count = updated.raw_result["nModified"]

    return json.dumps({"updated_count": updated_count})


@app.route("/api/update-task/<string:t_id>", methods=['PUT'])
def update_task(t_id):
    new_record = json.loads(request.data)

    updated = tasks_collection.replace_one(
        {"t_id": t_id}, new_record)

    updated_count = updated.raw_result["nModified"]

    return json.dumps({"updated_count": updated_count})


# DELETE untuk data user


@app.route("/api/delete-user/<string:u_id>", methods=['DELETE'])
def deleteUser(u_id):
    delete = users_collection.delete_one({"u_id": u_id})

    delete_count = delete.raw_result["n"]

    return json.dumps({"deleted_count": delete_count})


@app.route('/api/sign-in', methods=["POST"])
def signIn():
    records = json.loads(request.data)
    print(records)
    get_records = users_collection.find_one(
        {"email": records["email"]}, {'_id': 0})
    if get_records["password"] == records["password"]:
        return json.dumps({"message": "success", "u_id": get_records["u_id"]})
    else:
        return json.dumps({"message": "failed", "u_id": ""})
