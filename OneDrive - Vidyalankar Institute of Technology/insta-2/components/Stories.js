import { faker } from '@faker-js/faker';
import { useEffect, useState } from "react";
import Story from "./Story";

function Stories() {

//   useEffect(() => {
//     const suggestions = [...Array(20)].map((_, i) => ({
//         ...faker.helpers.contextualCard(),
//         id: i,
//     }));
//     console.log(suggestions);
//   }, []);

const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    }));
    setSuggestions(suggestions);
  }, []);


  return (
    <div className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 
    border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>
        {suggestions.map((profile) => (
            <Story 
            key={profile.id} 
            img={profile.avatar} 
            username={profile.username} />
        ))}
    </div>
  );
}

export default Stories; 