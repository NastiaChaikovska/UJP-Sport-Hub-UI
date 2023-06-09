import React, {useEffect, useState} from 'react';
import './TeamComponent.css';
import TeamIcon from "./TeamIcon";
import ShortArticleUser from "../article/ShortArticleUser";
import axios from "axios";

export default function TeamComponent({team, isSubscribed}) {
  console.log(isSubscribed);
  console.log(isSubscribed);
  const [articlesByTeamsId, setArticlesByTeamsId] = useState([]);

  useEffect(() => {
    getArticleByTeamsFollow();
  }, []);

  function getArticleByTeamsFollow() {
    const url = isSubscribed ? "teams": "team";
    console.log('function getArticleByTeamsFollow');
    const set1AuthToken = JSON.parse(localStorage.getItem('user'))
    console.log('token: ', set1AuthToken['jwt']);
    console.log(team);
    console.log(team.team.id)
    axios.get(`https://ujp-sports-hub.herokuapp.com/api/v1/articles/${url}/${team.team.id}`, {
      headers: {
        authorization:set1AuthToken['jwt'],
      }
    })
      .then((response) => {
        const data = response.data
        console.log('getArticles')
        console.log(response.data)
        setArticlesByTeamsId([...data])
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("error.response.status: ", error.response.status);
        }
      })
  }
  return (
    <div className='team_component'>
      <div className='team_head'>
        {team.subscriptionId && 
        
        <TeamIcon title={team.team.name} logo={team.team.logo} subscriptionId={team.subscriptionId} following={"following"} />
        }
      </div>
        <div className='team_component_body'>
        {
            articlesByTeamsId.map(article => <ShortArticleUser shortArticle={article}/>)
        }
        </div>
    </div>
  );
};