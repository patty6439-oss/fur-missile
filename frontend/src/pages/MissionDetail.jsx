import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
 
import api from "../api/api"; 
import WeatherPanel from "../components/WeatherPanel"; 
 
 
function MissionDetail() { 
  const { missionId } = useParams(); 
  const navigate = useNavigate(); 
  const [mission, setMission] = useState(null); 
 
    const loadMission = useCallback(async () => {
        const response = await api.get(`/missions/${missionId}/`);
        setMission(response.data);
    }, [missionId]);
 
  useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMission();
}, [loadMission]);

 
  async function deleteMission() { 
    await api.delete(`/missions/${missionId}/`); 
    navigate("/missions"); 
  } 
 
  async function generateBadge() { 
    const response = await api.post( 
      `/missions/${missionId}/badge/` 
    ); 
    setMission(response.data.mission); 
  } 
 
  if (!mission) { 
    return <p>Loading mission...</p>; 
  } 
 
  return ( 
    <section> 
      <h1>{mission.title}</h1> 
      <p>{mission.mission_type}</p> 
      <p>{mission.location}</p> 
      <p>{mission.mission_date}</p> 
      <p>{mission.status}</p> 
      <p>{mission.objective}</p> 
 
      <WeatherPanel location={mission.location} /> 
 
      <section> 
        <h2>Mission Badge</h2> 
        {mission.badge_name ? ( 
          <> 
            <h3>{mission.badge_name}</h3> 
            <p>{mission.badge_motto}</p> 
            <p>Colors: {mission.badge_colors}</p> 
            <p>Symbols: {mission.badge_symbols}</p> 
          </> 
        ) : ( 
          <p>No badge generated yet.</p> 
        )} 
 
        <button onClick={generateBadge}>Generate Badge</button> 
      </section> 
 
      <button onClick={deleteMission}>Delete Mission</button> 
    </section> 
  ); 
} 
 
 
export default MissionDetail; 