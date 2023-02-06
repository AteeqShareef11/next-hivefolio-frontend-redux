import { 
    IonButtons, 
    IonContent, 
    IonHeader, 
    IonPage, 
    IonSpinner, 
    IonRouterLink, 
    IonToolbar 
  } from '@ionic/react';
  
  /* Components */
  import { NavButtons } from '../components/Buttons/NavButtons';
  import Hexagon from '../components/Hexagon/Hexagon';
  import CardUser from '../components/Card/CardUser';
  import CardGrid from '../components/CardGrid/CardGrid';
  import CardEvent from '../components/Card/CardEvent';
  import Search from '../components/Search/Search';
  import Footer from '../ui/Footer/Footer';
  
  /* User */
  import { callApi } from '../utils/utils';
  import { useCurrentUser } from '../context/AuthContext';
  import { useEffect, useState } from 'react';
  
  /* Search */
  import Select from 'react-select';
  import {useQuery, useQueryClient} from 'react-query';
  
  const getUsers = async () => {
        
      const res = await callApi({ path: '/users' });
      return res.json()
    }
  
  
  const Events = () => {
  
    const [users, setUsers] = useState([]);
    const [games, setGames] = useState([]);
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const queryClient = useQueryClient();
    const {data, state} = useQuery('users', getUsers)
  
    useEffect(() => {
  
      const getUsers = async () => {
        
        try {
          const userData = await callApi({ path: '/users' });
          const gameData = await callApi({ path: '/games' });
          const teamData = await callApi({ path: '/teams' });
  
          setUsers(userData)
          setGames(gameData)
          setTeams(teamData)
          setLoading(false)
        } catch (err) {
          console.error(err)
        }
      }
      getUsers();
    }, []);
  
  
    const handleUsers = values => {

    }
  
    const handleGames = values => {

    }
  
    const handleTeams = values => {

    }
  
      return (
        <IonPage >
          <IonHeader >
            <IonToolbar >
              <div className="flex pl-4">
                <IonRouterLink routerLink="/"><Hexagon/></IonRouterLink>
              </div>
              <IonButtons slot="end">
                <NavButtons/>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen >
            <div className="mt-8">
              <div className="m-auto">
                {loading &&
                  <IonSpinner/>
                }
              </div>
  
              <h1 className=" max-width px-4">Featured Events</h1>
  
              <div className="max-width">
                <Select
                  getOptionLabel={option => `${option.gamertag} ${option.username}`}
                  getOptionValue={option => option.id}
                  options={users}
                  instanceId="users"
                  isMulti
                  placeholder="Filter by users"
                  onChange={values => handleUsers(values.map(user => user.id))}
                />
                <br />
  
                <Select
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option.id}
                  options={games}
                  instanceId="games"
                  isMulti
                  placeholder="Filter by games"
                  onChange={values => handleGames(values.map(game => game.id))}
                />
                <br />
  
                <Select
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option.id}
                  options={teams}
                  instanceId="teams"
                  isMulti
                  placeholder="Filter by teams"
                  onChange={values => handleTeams(values.map(team => team.id))}
                />
  
  
              </div>
              
              <div className="max-width">
                
                <div>
                  {
                    users.map(user => (
                      <CardUser
                        id={user.id}
                        image={user.image}
                        email={user.email}
                        gamertag={user.gamertag}
                        team={user.teams.map((teamList) =>
                          teamList.name
                        )}
                        games={user.games.map((sub) =>
                          sub.name
                        )}
                      />
                  ))}
                </div>
                
                </div>
              </div>
              <Footer/>
          </IonContent>
        </IonPage>
      )
  }
  
  export default Events