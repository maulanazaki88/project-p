from fastapi import FastAPI
from fastapi.encoders import jsonable_encoder
from pymongo import MongoClient
from datetime import datetime
from pydantic import BaseModel
from typing_extensions import TypedDict, Optional
from starlette.requests import Request
import json

app = FastAPI()

# instansiasi MongoClient untuk koneksi ke database "projectp" MongoDB


class ChatBubble(BaseModel):
    username: str | None 
    message: str | None 
    time: str | None


class ActivityLog(BaseModel):
    a_id: str | None
    activity_desc: str | None
    created_at: str | None
    activity_type: str | None


class Comment(BaseModel):
    comment_id: str | None
    t_id: str | None
    chat_list: Optional[list[ChatBubble]]


class Task(BaseModel):
    t_id: str | None
    title: str | None
    description: str | None
    assigned_member: Optional[list[TypedDict(
        'assigned_member', {"u_id": str, "username": str})]]
    deadline: str | None
    priority: str | None
    created_at: str | None
    activity_list: list[ActivityLog] | None
    w_id: str | None
    workspace_name: str | None
    seen_by: Optional[list[TypedDict(
        'assigned_member', {"u_id": str, "username": str})]]
    comments: Optional[list[ChatBubble]]
    status: str | None
    author: str | None


class Notification(BaseModel):
    username: str | None
    message: str | None
    created_at: str | None
    w_id: str | None


class Workspace(BaseModel):
    w_id: str | None
    name: str | None
    description: str | None
    notification_list: Optional[list[Notification]]


class User(BaseModel):
    u_id: str | None
    username: str | None
    email: str | None
    password: str | None
    workspace_ids: list[str]
    workspace_list: Optional[list[Workspace]]
    created_at: str | None
    is_online: int | None
    updated_at: str | None


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


@app.post("/api/create-user")
async def create_user(data: Request):
    # konversi json ke dictionary
    user_dict = json.jsonable_encoder(data)
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


@app.post("/api/create-workspace")
async def create_workspace(data: Workspace):
    # konversi json ke dictionary
    workspace_dict = json.jsonable_encoder(data)
    print(workspace_dict)
    # request.data => data yg dikirimkan oleh klien

    # jumlah data ditemukan
    # memeriksa apakah sudah ada akun yang memiliki username yang sama
    w_id = f"{workspace_dict['name'][:3]}-{str(datetime.now()).replace(':', '').replace(' ', '').replace('-', '').replace('.', '')}-wks"

    workspace_dict["w_id"] = w_id

    record = workspace_dict

    workspaces_collection.insert_one(record)

    return json.dumps({"message": "success", "w_id": w_id})


@app.post("/api/create-task")
async def create_task(data: Task):
    # konversi json ke dictionary
    task_dict = json.jsonable_encoder(data)
    print(task_dict)
    # request.data => data yg dikirimkan oleh klien

    # jumlah data ditemukan
    # memeriksa apakah sudah ada akun yang memiliki username yang sama
    t_id = f"{str(datetime.now()).replace(':', '').replace(' ', '').replace('-', '').replace('.', '')}-tsk"

    task_dict["t_id"] = t_id

    record = task_dict

    tasks_collection.insert_one(record)

    return json.dumps({"message": "success", "t_id": t_id})


@app.get("/api/get-user/{u_id}")
def get_user(u_id: str):
    user = users_collection.aggregate([{'$match': {'u_id': u_id}}, {'$lookup': {'from': 'workspaces', 'localField': 'workspace_ids', 'foreignField': 'w_id', 'pipeline': [
                                      {'$lookup': {'from': 'tasks', 'localField': 'task_ids', 'foreignField': 't_id', 'pipeline': [{'$project': {'_id': 0}}], 'as': 'task_list'}}, {'$project': {"_id": 0}}], 'as': 'workspace_list'}}, {'$project': {'_id': 0}}])
    return list(user)[0]



@app.get("/api/get-workspace/{w_id}")
def get_workspace(w_id: str):
    workspace = workspaces_collection.aggregate([{'$match': {'w_id': w_id}}, {'$lookup': {
                                                'from': 'tasks', 'localField': 'task_ids', 'foreignField': 't_id', 'pipeline': [{'$project': {'_id': 0}}], 'as': 'task_list'}}, {'$project': {'_id': 0}}])

    return list(workspace)[0]


@app.get("/api/get-task/{t_id}")
def get_task(t_id: str):
    task = tasks_collection.aggregate([{'$match': {'t_id': t_id}}, {'$lookup': {'from': 'workspaces', 'localField': 'w_id', 'foreignField': 'w_id', 'pipeline': [
                                      {'$project': {'_id': 0, 'name': 1}}], 'as': 'workspace'}}, {'$project': {'_id': 0}}, {'$unwind': "$workspace"}])

    return list(task)[0]


@app.put("/api/update-user/{u_id}")
async def update_user(u_id: str, item: User):
    new_record = jsonable_encoder(item)

    updated = users_collection.replace_one(
        {"u_id": u_id}, new_record)

    updated_count = updated.raw_result["nModified"]

    return {"updated_count": updated_count}


@app.put("/api/update-workspace/{w_id}")
async def update_workspace(w_id: str, item: Workspace):
    new_record = jsonable_encoder(item)

    updated = workspaces_collection.replace_one(
        {"w_id": w_id}, new_record)

    updated_count = updated.raw_result["nModified"]

    return {"updated_count": updated_count}

@app.put("/api/update-workspace")


@app.put("/api/update-task/{t_id}")
async def update_task(t_id: str, item: Task):
    new_record = jsonable_encoder(item)

    updated = tasks_collection.replace_one(
        {"t_id": t_id}, new_record)

    updated_count = updated.raw_result["nModified"]

    return {"updated_count": updated_count}


@app.delete("/api/delete-user/{u_id}")
def deleteUser(u_id: str):
    delete = users_collection.delete_one({"u_id": u_id})

    delete_count = delete.raw_result["n"]

    return {"deleted_count": delete_count}


@app.delete("/api/delete-workspace/{w_id}")
def deleteUser(w_id: str):
    delete = workspaces_collection.delete_one({"w_id": w_id})

    delete_count = delete.raw_result["n"]

    return {"deleted_count": delete_count}


@app.delete("/api/delete-task/{t_id}")
def deleteTask(t_id: str):
    delete = tasks_collection.delete_one({"t_id": t_id})

    delete_count = delete.raw_result["n"]

    return {"deleted_count": delete_count}


@app.post('/api/sign-in')
async def signIn(data: User):
    records = jsonable_encoder(data)
    # print(records)
    get_records = users_collection.find_one(
        {"email": records["email"]}, {'_id': 0})
    if get_records["password"] == records["password"]:
        return {"message": "success", "u_id": get_records["u_id"]}
    else:
        return {"message": "failed", "u_id": ""}
    

