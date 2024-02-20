import type {AddTodoDetailsMutation_todo$key} from '../../__generated__/relay/AddTodoDetailsMutation_todo.graphql';
import {useCallback} from 'react';
import {graphql, useFragment, useMutation} from 'react-relay';

const mutation = graphql`
  mutation AddTodoDetailsMutation($input: AddTodoDetailsInput!) {
    addTodoDetails(input: $input) {
      todo {
        id
        details
      }
    }
  }
`;

export function useAddTodoDetailsMutation(todoRef: AddTodoDetailsMutation_todo$key): (details: string) => void {
  const todo = useFragment(graphql`
      fragment AddTodoDetailsMutation_todo on Todo {
        id
        details
      }
    `, todoRef);
  const [commit] = useMutation(mutation);
  return useCallback((details: string) => {
    const payload = {
      id: todo.id,
      details,
    };
    commit({
      variables: {
        input: {
          ...payload,
        },
      },
      optimisticResponse: {
        addTodoDetails: {
          todo: payload,
        },
      },
    });
  }, [todo, commit]);
}