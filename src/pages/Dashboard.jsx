import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import ChatContainer from "../components/Chatcontainer";
import axios from "axios";
import { useCookies } from "react-cookie";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [cookies] = useCookies(["user"]);
  const [lastDirection, setLastDirection] = useState();
  const [genderedUser, setGenderedUser] = useState(null);
  const { UserId } = cookies;

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user", {
        params: {
          userId: UserId,
        },
      });
      return setUser(response.data);
    } catch (error) {
      return console.log(error);
    }
  };

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/gendered-users", {
        params: {
          gender: user?.gender_interest,
        },
      });

      setGenderedUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put("http://localhost:8080/addmatch",{
        UserId,
        matchedUserId
      })
      getUser();
    } catch(err) {
      console.error(err);
    }
  }
  console.  log(user);
  useEffect(() => {
    getUser();
    getGenderedUsers();
  }, []);

  console.log("user ", user);
  console.log("genderedUser ", genderedUser);

  const swiped = (direction, swipedUserId) => {
    if(direction === 'right'){
      updateMatches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const matchedUserIds = user?.matches?.map(({user_id}) => user_id)?.concat(UserId);
  const filteredGenderedUsers = genderedUser?.filter((genderedUser) => !matchedUserIds?.includes(genderedUser.user_id));

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };
  return (
    <div className="dashboard">
      <ChatContainer user={user} />
      <div className="swipe-container">
        <div className="card-container">
          {filteredGenderedUsers?.map((GenderUser) => (
            <TinderCard
              className="swipe"
              key={GenderUser.name}
              onSwipe={(dir) => swiped(dir, GenderUser.user_id)}
              onCardLeftScreen={() => outOfFrame(GenderUser.first_name)}
            >
              <div
                style={{ backgroundImage: `url(${GenderUser.url})` }}
                className="card"
              >
                <h3>{GenderUser.first_name}</h3>
              </div>
            </TinderCard>
          ))}

          <div className="swipe-info">
            {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
