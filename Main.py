from fbchat import Client
from fbchat.models import *
import time

# =====  𝐌𝐑 𝐒𝐔𝐑𝐀𝐉=====
EMAIL = "YOUR_EMAIL"
PASSWORD = "YOUR_PASSWORD"

# ===== GROUP SETTINGS =====
GROUP_ID = "GROUP_THREAD_ID"

LOCKED_GROUP_NAME = "MY LOCKED GROUP"

# User nicknames lock
LOCKED_NICKNAMES = {
    "USER_ID_1": "OWNER",
    "USER_ID_2": "ADMIN"
}


class LockBot(Client):

    def onPeopleAdded(self, added_ids, author_id, thread_id, **kwargs):
        pass

    def onNicknameChange(self, author_id, changed_for, new_nickname,
                         thread_id, thread_type, **kwargs):

        if thread_id != GROUP_ID:
            return

        locked_name = LOCKED_NICKNAMES.get(changed_for)

        if locked_name and new_nickname != locked_name:
            print(f"Restoring nickname for {changed_for}")

            self.changeNickname(
                nickname=locked_name,
                user_id=changed_for,
                thread_id=thread_id,
                thread_type=ThreadType.GROUP
            )

    def onTitleChange(self, author_id, new_title,
                      thread_id, thread_type, **kwargs):

        if thread_id != GROUP_ID:
            return

        if new_title != LOCKED_GROUP_NAME:
            print("Restoring group name")

            self.changeThreadTitle(
                title=LOCKED_GROUP_NAME,
                thread_id=thread_id,
                thread_type=ThreadType.GROUP
            )


while True:
    try:
        bot = LockBot(EMAIL, PASSWORD)
        print("Bot Started")
        bot.listen()
    except Exception as e:
        print(e)
        time.sleep(10)
