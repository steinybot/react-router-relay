import OtherAppQuery from '../../__generated__/relay/OtherAppQuery.graphql';
import {JSResource, SimpleEntryPoint} from '@loop-payments/react-router-relay';

type OtherApp = typeof import('../components/OtherApp').default;

const OtherAppEntryPoint: SimpleEntryPoint<OtherApp> = {
  getPreloadProps({request, params}) {
    const url = new URL(request.url)
    return {
      queries: {
        otherAppQueryRef: {
          parameters: {
            kind: 'PreloadableConcreteRequest',
            params: OtherAppQuery.params,
          },
          variables: {
            userId: params?.userId ?? 'me',
            status: url.searchParams.get('status') || undefined,
          },
        },
      },
    };
  },

  root: JSResource<OtherApp>('OtherApp', () => ((import(
    /* webpackPrefetch: true */
    '../components/OtherApp') as any) as Promise<OtherApp>)),
};

export default OtherAppEntryPoint;