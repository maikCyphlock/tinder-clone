import React,{useState,useEffect} from 'react'
import axios from 'axios';

function MatchesDisplay({matches}) {
  const matchedUserIds = matches.map(({user_id}) => user_id);
  const [matchesProfile, setMatchesProfile] = useState(null)
  console.log({matchesProfile});
  const GetMatches = async () => {
  
    try {
      const response = await axios.get("http://localhost:8080/users", {
        params: {
          userIds: JSON.stringify(matchedUserIds),
        },
      });
      return setMatchesProfile(response.data);
    } catch (error) {
      return console.log(error);
    }
  }

  useEffect(()=>{
    GetMatches();
  }, [matches])

  console.log(matchesProfile);
  return (
    <div className='matches-display'>
    {
      matchesProfile?.map((match,_index) =>(
        <div key={_index} className='match-card'>
          <div className="img-container">
            <img src={match?.url} alt={`${match.first_name}-photo`}/>
          </div>

          <h3>{match?.first_name}</h3>
        </div>
      ))
    }
    </div>
  )
}

export default MatchesDisplay