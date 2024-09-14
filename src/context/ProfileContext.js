import axios from 'axios';
import {createContext, useEffect, useState} from 'react';

const ProfileContext = createContext();

const ProfileProvider = ({children}) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProfileData = async () => {
    const options = {
      method: 'GET',
      url: 'https://spotify23.p.rapidapi.com/user_profile/',
      params: {
        id: 'nocopyrightsounds',
        playlistLimit: '10',
        artistLimit: '10',
      },
      headers: {
        'x-rapidapi-key': '17bfa31bbbmsh1355592a7405f9bp1dd229jsnd7e87c1e1260',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com',
      },
    };
    try {
      const response = await axios.request(options);
      setProfileData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <ProfileContext.Provider
      value={{profileData, loading, error, getProfileData}}>
      {children}
    </ProfileContext.Provider>
  );
};
export {ProfileProvider, ProfileContext};
