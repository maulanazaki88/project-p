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
    username: str | None = None
    message: str | None = None
    time: str | None = None


class ActivityLog(BaseModel):
    a_id: str | None = None
    activity_desc: str | None = None
    created_at: str | None = None
    activity_type: str | None = None


class Comment(BaseModel):
    comment_id: str | None = None
    t_id: str | None = None
    chat_list: Optional[list[ChatBubble]] = None


class Task(BaseModel):
    t_id: str | None = None
    title: str | None = None
    description: str | None = None
    assigned_member: Optional[list[TypedDict(
        'assigned_member', {"u_id": str, "username": str})]] = None
    deadline: str | None = None
    priority: str | None = None
    created_at: str | None = None
    activity_list: list[ActivityLog] | None = None
    w_id: str | None = None
    workspace_name: str | None = None
    seen_by: Optional[list[TypedDict(
        'assigned_member', {"u_id": str, "username": str})]]
    comments: Optional[list[ChatBubble]] = None
    status: str | None = None
    author: str | None = None


class Notification(BaseModel):
    username: str | None = None
    message: str | None = None
    created_at: str | None = None
    w_id: str | None = None


class Workspace(BaseModel):
    w_id: str | None = None
    name: str | None = None
    description: str | None = None
    notification_list: Optional[list[Notification]] = None
    activity_list: Optional[list[Notification]] = None
    admin_list: Optional[list[TypedDict(
        'assigned_member', {"u_id": str, "username": str})]] = None
    member_list: Optional[list[TypedDict(
        'assigned_member', {"u_id": str, "username": str})]] = None
    created_at: str | None = None
    updated_at: str | None = None
    task_ids: Optional[list[str]] = None
    status: str | None = None


class User(BaseModel):
    u_id: str | None = None
    username: str | None = None
    email: str | None = None
    password: str | None = None
    workspace_ids: list[str] = None
    created_at: str | None = None
    is_online: int | None = None
    updated_at: str | None = None

# Get datetime


def get_date_now():
    x = datetime.now()

    date = str(x).split(" ")[0]
    time = str(x).split(" ")[1]

    return (f"{date}-{time}")


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

################################## USER #####################################################################


@app.post('/api/sign-in')
async def signIn(data: User):
    records = jsonable_encoder(data)
    print(records)
    get_records = users_collection.find_one(
        {"email": records["email"]}, {'_id': 0})
    if get_records["password"] == records["password"]:
        return {"message": "success", "u_id": get_records["u_id"]}
    else:
        return {"message": "failed", "u_id": ""}


@app.post("/api/create-user")
async def create_user(data: User):
    # konversi json ke dictionary
    user_dict = jsonable_encoder(data)
    user_dict["created_at"] = get_date_now()
    user_dict["updated_at"] = get_date_now()
    # request.data => data yg dikirimkan oleh klien

    # jumlah data ditemukan
    length = users_collection.count_documents(
        {"username": user_dict["username"]})

    # memeriksa apakah sudah ada akun yang memiliki username yang sama
    if length == 0:
        # pre-designed uid
        # u_id = f"{user_dict['username'][:3]}-{str(datetime.now()).replace(':', '').replace(' ', '').replace('-', '').replace('.', '')}-usr"

        # user_dict["u_id"] = u_id

        record = user_dict

        users_collection.insert_one(record)

        return ({"message": "success", "u_id": user_dict["u_id"]})

    elif length != 0:
        return ({"message": "user-exist"})

    else:
        return ({"message": "failed"})


@app.get("/api/get-user/{u_id}")
def get_user(u_id: str):
    user = users_collection.aggregate([{'$match': {'u_id': u_id}}, {'$lookup': {'from': 'workspaces', 'localField': 'workspace_ids', 'foreignField': 'w_id', 'pipeline': [
                                      {'$lookup': {'from': 'tasks', 'localField': 'task_ids', 'foreignField': 't_id', 'pipeline': [{'$project': {'_id': 0}}], 'as': 'task_list'}}, {'$project': {"_id": 0}}], 'as': 'workspace_list'}}, {'$project': {'_id': 0}}])
    return list(user)[0]


@app.put("/api/update-user/{u_id}")
async def update_user(u_id: str, item: User):
    new_record = jsonable_encoder(item)
    new_record["updated_at"] = get_date_now()

    updated = users_collection.replace_one(
        {"u_id": u_id}, new_record)

    updated_count = updated.raw_result["nModified"]

    return {"updated_count": updated_count, "u_id": u_id}


@app.delete("/api/delete-user/{u_id}")
def deleteUser(u_id: str):
    delete = users_collection.delete_one({"u_id": u_id})

    delete_count = delete.raw_result["n"]

    return {"deleted_count": delete_count, "u_id": u_id}


class WorkspaceIds(BaseModel):
    w_id: str | None = None


@app.put("/api/update-user-add-workspace/{u_id}")
def update_user_add_workspace_list(u_id: str, item: WorkspaceIds):
    record = jsonable_encoder(item)
    updated = users_collection.update_one(
        {"u_id": u_id}, {'$push': {'workspace_ids': record["w_id"]}, '$set': {'updated_at': get_date_now()}}, upsert=False)
    updated_count = updated.raw_result["nModified"]
    print(record)

    return {"updated_count": updated_count, "u_id": u_id}


@app.put("/api/update-user-delete-workspace/{u_id}")
def update_user_delete_workspace_list(u_id: str, item: WorkspaceIds):
    record = jsonable_encoder(item)
    updated = users_collection.update_one(
        {"u_id": u_id}, {'$pull': {'workspace_ids': record['w_id']}}, {'$set': {"updated_at": get_date_now()}}, upsert=False)
    updated_count = updated.raw_result["nModified"]

    return {"updated_count": updated_count, "u_id": u_id}



################################## USER #####################################################################


################################## WORKSPACE #####################################################################

@app.post("/api/create-workspace")
async def create_workspace(data: Workspace):
    # konversi json ke dictionary
    record = jsonable_encoder(data)
    record["updated_at"] = get_date_now()
    record["created_at"] = get_date_now()
    # request.data => data yg dikirimkan oleh klien

    # jumlah data ditemukan
    # memeriksa apakah sudah ada akun yang memiliki username yang sama
    # w_id = f"{workspace_dict['name'][:3]}-{str(datetime.now()).replace(':', '').replace(' ', '').replace('-', '').replace('.', '')}-wks"

    # workspace_dict["w_id"] = w_id

    workspaces_collection.insert_one(record)

    return {"message": "success", "w_id": record["w_id"]}


class WorkspaceName(BaseModel):
    name: str | None = None
    u_id: str | None = None


@app.put("/api/update-workspace-name/{w_id}")
async def update_workspace_name(w_id: str, item: WorkspaceName):
    new_record = jsonable_encoder(item)
    new_record["updated_at"] = get_date_now()

    updated = workspaces_collection.update_one(
        {"w_id": w_id}, {'$set': {'name': new_record["name"]}})

    updated_count = updated.raw_result["nModified"]

    return {"updated_count": updated_count, "w_id": w_id}


class WorkspaceMemberChange(BaseModel):
    username: str | None = None
    u_id: str | None = None


@app.put("/api/update-workspace-add-member/{w_id}")
async def update_workspace_add_member(w_id: str, item: WorkspaceMemberChange):
    new_record = jsonable_encoder(item)
    new_record["updated_at"] = get_date_now()

    updated = workspaces_collection.update_one(
        {"w_id": w_id}, {'$push': {'member_list': new_record}})

    updated_count = updated.raw_result["nModified"]

    return {"updated_count": updated_count, "w_id": w_id}


@app.put("/api/update-workspace-delete-member/{w_id}")
async def update_workspace_del_member(w_id: str, item: WorkspaceMemberChange):
    record = jsonable_encoder(item)
    record["updated_at"] = get_date_now()

    updated = workspaces_collection.update_one(
        {"w_id": w_id}, {'$pull': {'member_list': {'u_id': {"$eq": record["u_id"]}}}})

    updated_count = updated.raw_result["nModified"]

    return {"updated_count": updated_count, "w_id": w_id}


@app.get("/api/get-workspace/{w_id}")
def get_workspace(w_id: str):
    workspace = workspaces_collection.aggregate([{'$match': {'w_id': w_id}}, {'$lookup': {
                                                'from': 'tasks', 'localField': 'task_ids', 'foreignField': 't_id', 'pipeline': [{'$project': {'_id': 0}}], 'as': 'task_list'}}, {'$project': {'_id': 0}}])

    return list(workspace)[0]


@app.put("/api/update-workspace-create-announcement/{w_id}")
async def update_workspace_create_announcement(w_id: str, item: Notification):
    record = jsonable_encoder(item)
    record["updated_at"] = get_date_now()

    updated = workspaces_collection.update_one(
        {"w_id": w_id}, {'$push': {'notification_list': record}})

    updated_count = updated.raw_result["nModified"]

    return {"updated_count": updated_count, "w_id": w_id},


@app.delete("/api/delete-workspace/{w_id}")
def delete_workspace(w_id: str):
    delete = workspaces_collection.delete_one({"w_id": w_id})

    delete_count = delete.raw_result["n"]

    return {"deleted_count": delete_count, "w_id": w_id}


class TaskIds(BaseModel):
    t_id: str | None = None


@app.put("/api/update-workspace-add-task/{w_id}")
def update_workspace_add_task(w_id: str, item: TaskIds):
    record = jsonable_encoder(item)
    updated = workspaces_collection.update_one(
        {"w_id": w_id}, {'$push': {'task_ids': record["t_id"]}, '$set': {"updated_at": get_date_now()}})
    updated_count = updated.raw_result["nModified"]

    return {"updated_count": updated_count, "w_id": w_id}


@app.put("/api/update-workspace-delete-task/{w_id}")
def update_workspace_delete_task(w_id: str, item: TaskIds):
    record = jsonable_encoder(item)
    record["updated_at"] = get_date_now()
    updated = workspaces_collection.update_one(
        {"w_id": w_id}, {'$pull': {'task_ids': record["t_id"]}})
    updated_count = updated.raw_result["nModified"]

    return {"updated_count": updated_count, "w_id": w_id}


@app.put("/api/replace-workspace/{w_id}")
def replace_workspace(w_id: str, item: Workspace):
    record = jsonable_encoder(item)
    record["updated_at"] = get_date_now()
    replaced = workspaces_collection.replace_one({"w_id": w_id}, record)

    replaced_count = replaced.raw_result["nModified"]

    return {"updated_count": replaced_count, "w_id": w_id}


class UserSnippet(BaseModel):
    username: str | None = None
    u_id: str | None = None


@app.put("/api/workspace-add-member-waiting-list/{w_id}")
def add_waiting_list(w_id: str, item: UserSnippet):
    record = jsonable_encoder(item)
    updated = workspaces_collection.update_one(
        {"w_id": w_id}, {'$push': {'waiting_list': record}})

    updated_count = updated.raw_result["nModified"]

    return {"updated_count": updated_count, "w_id": w_id}


@app.put("/api/workspace-acc-waiting-list/{w_id}")
def acc_waiting_list(w_id: str, item: UserSnippet):
    record = jsonable_encoder(item)
    updated = workspaces_collection.update_one(
        {"w_id": w_id}, {'$pull': {'waiting_list': {
            'u_id': {'$eq': record["u_id"]}}}}
    )

    updated_count = updated.raw_result["nModified"]

    return {"updated_count": updated_count, "w_id": w_id}


@app.put("/api/workspace-rej-waiting-list/{w_id}")
def rej_waiting_list(w_id: str, item: UserSnippet):
    record = jsonable_encoder(item)
    updated = workspaces_collection.update_one(
        {"w_id": w_id}, {'$pull': {'waiting_list': {
            'u_id': {'$eq': record["u_id"]}}}}
    )

    updated_count = updated.raw_result["nModified"]

    return {"updated_count": updated_count, "w_id": w_id}


class RemoveMember(BaseModel):
    u_id: str | None = None


@app.put("/api/workspace-remove-member/{w_id}")
def workspace_remove_member(w_id: str, item: RemoveMember):
    record = jsonable_encoder(item)
    updated = workspaces_collection.update_one(
        {"w_id": w_id}, {'$pull': {'member_list': {'u_id': {'$eq': record["u_id"]}}}})

    updated_count = updated.raw_result["nModified"]
    return {"updated_count": updated_count, "w_id": w_id}


################################## WORKSPACE #####################################################################


################################## TASK #####################################################################

@app.post("/api/create-task")
async def create_task(data: Task):
    # konversi json ke dictionary
    record = jsonable_encoder(data)
    record["created_at"] = get_date_now()
    record["updated_at"] = get_date_now()
    # request.data => data yg dikirimkan oleh klien

    # jumlah data ditemukan
    # memeriksa apakah sudah ada akun yang memiliki username yang sama
    # t_id = f"{str(datetime.now()).replace(':', '').replace(' ', '').replace('-', '').replace('.', '')}-tsk"

    # task_dict["t_id"] = t_id

    tasks_collection.insert_one(record)

    return ({"message": "success", "t_id": record["t_id"]})


@app.put("/api/update-task/{t_id}")
async def update_task(t_id: str, item: Task):
    new_record = jsonable_encoder(item)
    new_record["updated_at"] = get_date_now()

    updated = tasks_collection.replace_one(
        {"t_id": t_id}, new_record)

    updated_count = updated.raw_result["nModified"]

    return {"updated_count": updated_count, "t_id": t_id}


@app.get("/api/get-task/{t_id}")
def get_task(t_id: str):
    task = tasks_collection.aggregate([{'$match': {'t_id': t_id}}, {'$lookup': {'from': 'workspaces', 'localField': 'w_id', 'foreignField': 'w_id', 'pipeline': [
                                      {'$project': {'_id': 0, 'name': 1}}], 'as': 'workspace'}}, {'$project': {'_id': 0}}, {'$unwind': "$workspace"}])

    return list(task)[0]


class TaskTitle(BaseModel):
    title: str


@app.put("/api/update-task-title/{t_id}")
def update_task_title(t_id: str, item: TaskTitle):
    record = jsonable_encoder(item)
    record["updated_at"] = get_date_now()
    updated = tasks_collection.update_one(
        {'t_id': t_id}, {'$set': {'title': record['title']}})
    updated_count = updated.raw_result["nModified"]

    return {'updated_count': updated_count}


class TaskDescription(BaseModel):
    description: str


@app.put("/api/update-task-description/{t_id}")
def update_task_description(t_id: str, item: TaskDescription):
    record = jsonable_encoder(item)
    record["updated_at"] = get_date_now()
    updated = tasks_collection.update_one(
        {'t_id': t_id}, {'$set': {'description': record['description']}})
    updated_count = updated.raw_result["nModified"]

    return {'updated_count': updated_count}


class TaskDeadline(BaseModel):
    deadline: str


@app.put("/api/update-task-deadline/{t_id}")
def update_task_deadline(t_id: str, item: TaskDeadline):
    record = jsonable_encoder(item)
    record["updated_at"] = get_date_now()
    updated = tasks_collection.update_one(
        {'t_id': t_id}, {'$set': {'deadline': record['deadline']}})
    updated_count = updated.raw_result["nModified"]

    return {'updated_count': updated_count, "t_id": t_id}


class TaskPriority(BaseModel):
    priority: str


@app.put("/api/update-task-priority/{t_id}")
def update_task_priority(t_id: str, item: TaskPriority):
    record = jsonable_encoder(item)
    record["updated_at"] = get_date_now()
    updated = tasks_collection.update_one(
        {'t_id': t_id}, {'$set': {'priority': record['priority']}})
    updated_count = updated.raw_result["nModified"]

    return {'updated_count': updated_count, "t_id": t_id}


class TaskParticipants(BaseModel):
    username: str
    u_id: str


@app.put("/api/update-task-add-participant/{t_id}")
def update_task_participants(t_id: str, item: TaskParticipants):
    record = jsonable_encoder(item)
    record["updated_at"] = get_date_now()
    updated = tasks_collection.update_one(
        {'t_id': t_id}, {'$push': {'assigned_member': record}})
    updated_count = updated.raw_result["nModified"]

    return {'updated_count': updated_count, "t_id": t_id}


@app.put("/api/update-task-delete-participant/{t_id}")
def update_task_participants(t_id: str, item: TaskParticipants):
    record = jsonable_encoder(item)
    record["updated_at"] = get_date_now()
    updated = tasks_collection.update_one(
        {'t_id': t_id}, {'$pull': {'assigned_member': {'u_id': {'$eq': record['u_id']}}}})
    updated_count = updated.raw_result["nModified"]

    return {'updated_count': updated_count, "t_id": t_id}


class TaskStatus(BaseModel):
    status: str


@app.put("/api/update-task-status/{t_id}")
def update_task_status(t_id: str, item: TaskStatus):
    record = jsonable_encoder(item)
    record["updated_at"] = get_date_now()
    updated = tasks_collection.update_one(
        {'t_id': t_id}, {'$set': {'status': record['status']}})
    updated_count = updated.raw_result["nModified"]

    return {'updated_count': updated_count, "t_id": t_id}


@app.put("/api/update-task-add-comment/{t_id}")
def update_task_add_comment(t_id: str, item: ChatBubble):
    record = jsonable_encoder(item)
    record["updated_at"] = get_date_now()
    updated = tasks_collection.update_one(
        {'t_id': t_id}, {'$push': {'comments': record}})
    updated_count = updated.raw_result["nModified"]

    return {'updated_count': updated_count, "t_id": t_id}


@app.delete("/api/delete-task/{t_id}")
def deleteTask(t_id: str):
    delete = tasks_collection.delete_one({"t_id": t_id})

    delete_count = delete.raw_result["n"]

    return {"deleted_count": delete_count, "t_id": t_id}


################################## TASK #####################################################################
