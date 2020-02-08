import React from 'react'
import fetch from 'node-fetch'
import { parseElasticSearchResponse } from './helpers'

const defaultState = {
  runQuery: () => {}
}

const ElasticSearchContext = React.createContext(defaultState)

export const ElasticSearchProvider = (props) => {

  /*
    interface Query {
      index: string // the index within elastic search
      fields: string[] | string // the field(s) to search upon
      term: string // what to actually search
      wildcard: boolean // if the search should add wildcards
    }
  */

  const search = async (searchQuery) => {
    const fields = Array.isArray(searchQuery.fields) ? searchQuery.fields : [searchQuery.fields]
    const query = searchQuery.wildcard ? `*${searchQuery.term}*` : searchQuery.term
    const body = {
      query: {
        query_string: {
          query,
          fields
        }
      }
    }
    const response = await fetch(`${props.url}${searchQuery.index}/_search?pretty`, {
        method: 'POST',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    const jsonResponse = await response.json()
    return parseElasticSearchResponse(jsonResponse)
  }

  const value = {
    search,
  }

  return (
    <ElasticSearchContext.Provider value={value}>
      {props.children}
    </ElasticSearchContext.Provider>
  )
}

export default ElasticSearchContext
