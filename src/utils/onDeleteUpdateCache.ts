import { ApolloCache, FetchResult } from '@apollo/client';

export function update<TData = Record<string, any>>(
  cache: ApolloCache<TData>,
  results: FetchResult<TData, Record<string, any>, Record<string, any>>,
) {
  const data: { [key: string]: any } = results?.data || {};
  for (const [, mutations] of Object.entries(data)) {
    for (const [, results] of Object.entries(mutations)) {
      if (Array.isArray(results)) {
        results.forEach((node) => {
          const id = cache.identify(node);
          cache.evict({ id });
        });
      }
    }
  }
  cache.gc();
}

const onDeleteUpdateCache = (
  cache: ApolloCache<Record<string, any>>,
  results: FetchResult,
) => update(cache, results);

export default onDeleteUpdateCache;
