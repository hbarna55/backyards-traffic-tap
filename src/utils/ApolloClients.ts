import ApolloBoostClient from "apollo-boost";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { WebSocketLink } from "apollo-link-ws";
import { APOLLO_CLIENT_HTTPS_URI, APOLLO_CLIENT_WWS_URI } from "config";

class ApolloClients {
  private httpsClient: ApolloClient<unknown> | null = null;
  private wssClient: ApolloClient<NormalizedCacheObject> | null = null;

  getHttpsClient = () => {
    if (!this.httpsClient) {
      this.httpsClient = new ApolloBoostClient({
        uri: APOLLO_CLIENT_HTTPS_URI,
      });
    }
    return this.httpsClient;
  };

  getWssClient = () => {
    if (!this.wssClient) {
      const wsLink = new WebSocketLink({
        uri: APOLLO_CLIENT_WWS_URI,
        options: {
          reconnect: true,
        },
      });
      this.wssClient = new ApolloClient({
        link: wsLink,
        cache: new InMemoryCache(),
      });
    }
    return this.wssClient;
  };
}

export default new ApolloClients();
