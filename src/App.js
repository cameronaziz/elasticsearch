import React from 'react';
import { ElasticSearchProvider } from './elasticSearch'
import Search from './Search'
import Profile from './Profile'

const App = () => {
  const [currentPerson, setCurrentPerson] = React.useState()

  return (
    <ElasticSearchProvider
      url="http://localhost:9200/"
    >
      <Search
        setCurrentPerson={setCurrentPerson}
      />
      {currentPerson &&
        <Profile person={currentPerson} />
      }
    </ElasticSearchProvider>
  );
}

export default App;
