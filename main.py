import time

LOCKED_GROUP_NAME = "My Locked Group"

LOCKED_NICKNAMES = {
    "user1": "Admin",
    "user2": "Member"
}

def get_group_info():
    # API/library call
    pass

def set_group_name(name):
    # API/library call
    pass

def set_nickname(user_id, nickname):
    # API/library call
    pass

while True:
    info = get_group_info()

    if info["name"] != LOCKED_GROUP_NAME:
        set_group_name(LOCKED_GROUP_NAME)

    for uid, nick in LOCKED_NICKNAMES.items():
        if info["nicknames"].get(uid) != nick:
            set_nickname(uid, nick)

    time.sleep(30)
