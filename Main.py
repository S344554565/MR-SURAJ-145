# requirements:
# fbchat==1.9.7

from fbchat import Client
from fbchat.models import ThreadType
import time

ONWER = "MR SURAJ"
PASSWORD = "SURAJ@143"

GROUP_ID = "YOUR_GROUP_ID"

LOCKED_GROUP_NAME = "My Locked Group"

LOCKED_NICKNAMES = {
    "USER_ID_1": "Admin",
    "USER_ID_2": "Member"
}


class LockBot(Client):

    def onPeopleAdded(self, added_ids, author_id, thread_id, **kwargs):
        if thread_id == GROUP_ID:
            self.changeThreadTitle(
                LOCKED_GROUP_NAME,
                thread_id=GROUP_ID,
                thread_type=ThreadType.GROUP
            )

    def check_lock(self):
        while True:
            try:
                info = self.fetchThreadInfo(GROUP_ID)[GROUP_ID]

                # Group name lock
                if info.name != LOCKED_GROUP_NAME:
                    self.changeThreadTitle(
                        LOCKED_GROUP_NAME,
                        thread_id=GROUP_ID,
                        thread_type=ThreadType.GROUP
                    )

                # Nickname lock
                for uid, nick in LOCKED_NICKNAMES.items():
                    self.changeNickname(
                        nick,
                        uid,
                        thread_id=GROUP_ID,
                        thread_type=ThreadType.GROUP
                    )

            except Exception as e:
                print("Error:", e)

            time.sleep(30)


bot = LockBot(EMAIL, PASSWORD)
bot.check_lock()
