export const parseElasticSearchResponse = (response) => {
  if (!response || !response.hits || !response.hits.hits) {
    return undefined
  }
  return response.hits.hits.map((hit) => hit._source)
}