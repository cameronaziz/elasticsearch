import React from 'react'
import { AppBar, Toolbar, Input, List, ListItem, ListItemText } from '@material-ui/core';
import { ElasticSearchContext } from './elasticSearch'

const Search = (props) => {
  const { setCurrentPerson } = props
  const { search } = React.useContext(ElasticSearchContext)
  const inputRef = React.useRef(null)
  const [searchValue, setSearchValue] = React.useState('')
  const [people, setPeople] = React.useState([])

  const update = async (event) => {
    const { value } = event.target
    setSearchValue(value)
    if (value.length === 0) {
      setPeople([])
    } else {
      const response = await search({
        index: 'bank',
        term: value,
        fields: ['firstname', 'lastname'],
        wildcard: true
      })
      setPeople(response)
    }
  }

  const handleClickListItem = (person) => () => {
    setPeople([])
    setSearchValue('')
    setCurrentPerson(person)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        Search for Account&nbsp;
        <Input
          style={{ color: '#fff'}}
          value={searchValue}
          onChange={update}
          ref={inputRef}
          />
      </Toolbar>
        {people.length > 0 &&
          <List>
            {people.map((person) => (
              <ListItem
                key={person.account_number}
                button
                onClick={handleClickListItem(person)}
              >
                <ListItemText
                  primary={`${person.firstname} ${person.lastname}`}
                />
              </ListItem>
            ))}
          </List>
        }
    </AppBar>
  )
}

export default Search
