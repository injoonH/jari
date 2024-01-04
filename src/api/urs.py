from collections import namedtuple
from datetime import datetime, timedelta
from pprint import pprint

import httpx

User = namedtuple("User", ["id", "name"])

BASE_URL = "https://libit.kaist.ac.kr/Clicker"


def pad_id(user_id: int) -> str:
    return "0" + str(user_id)


def reserve_room(
    room_id: int,
    user_id: int,
    date: datetime,
    duration: timedelta,
    title: str,
    members: list[User],
):
    hour, minute = divmod(duration.seconds // 60, 60)

    with httpx.Client(base_url=BASE_URL) as client:
        res = client.get(
            "/BookingPublicObjects",
            params={
                "strDeviceName": "desktop",
                "strRoomId": room_id,
                "strUserId": pad_id(user_id),
                "strDate": date.strftime("%Y%m%d"),
                "strTime": date.strftime("%H%M"),
                "strDuration": hour,
                "strDurationHalf": minute,
                "strSubject": title,
                "strMembersJoin": "".join(
                    [f"{pad_id(member.id)}^{member.name};" for member in members]
                ),
            },
        )
    return res.json()


def main():
    res = reserve_room(
        20180327171329138,  # N10 Group Study Room 4
        20210705,
        datetime(2024, 1, 8, 16, 0),
        timedelta(hours=1, minutes=30),
        "Jari Test",
        [],
    )
    pprint(res)
    print(res["l_communication_message"])


if __name__ == "__main__":
    main()
