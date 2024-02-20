import TodoDetailsQuery from '../../__generated__/relay/TodoDetailsQuery.graphql';
import {JSResource, SimpleEntryPoint} from '@loop-payments/react-router-relay';
type TodoDetails = typeof import('../components/TodoDetails').default;

const TodoDetailsEntrypoint: SimpleEntryPoint<TodoDetails> = {
  getPreloadProps({params}) {
    return {
      queries: {
        todoDetailsQueryRef: {
          parameters: {
            kind: 'PreloadableConcreteRequest',
            params: TodoDetailsQuery.params,
          },
          variables: {
            todoId: params?.todoId
          },
        },
      },
    };
  },

  root: JSResource<TodoDetails>('TodoDetails', () => ((import(
    /* webpackPrefetch: true */
    '../components/TodoDetails') as any) as Promise<TodoDetails>)),
};

export default TodoDetailsEntrypoint;