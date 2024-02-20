import type {TodoDetailsQuery} from '../../__generated__/relay/TodoDetailsQuery.graphql';
import {graphql, usePreloadedQuery} from 'react-relay';
import * as React from 'react';
import {SimpleEntryPointProps} from '@loop-payments/react-router-relay';
import TodoTextInput from './TodoTextInput';
import {useAddTodoDetailsMutation} from '../mutations/AddTodoDetailsMutation';

type PreloadedQueries = {
  todoDetailsQueryRef: TodoDetailsQuery;
};
type Props = SimpleEntryPointProps<PreloadedQueries>;

function TodoDetails({queries}: Props): React.ReactNode {
  // You would normally use a fragment for this but this demonstrates nested queries.
  const {node} = usePreloadedQuery<TodoDetailsQuery>(graphql`
      query TodoDetailsQuery($todoId: ID!) @preloadable {
        node(id: $todoId) {
          __typename
          ...on Todo {
            id
            details
            ...AddTodoDetailsMutation_todo
          }
        }
      }
    `, queries.todoDetailsQueryRef);

  if (node?.__typename !== 'Todo') {
    throw `Wrong type. Expected Todo, got ${node?.__typename}}.`;
  }

  const addTodoDetailsMutation = useAddTodoDetailsMutation(node);

  const handleTextInputDelete = () => {
    addTodoDetailsMutation('');
  };

  const handleTextInputSave = (text: string) => {
    addTodoDetailsMutation(text);
  };

  console.debug("Rendering Todo Details", node)

  return <section>
    <TodoTextInput className="details" commitOnBlur={true} initialValue={node.details}
                   onDelete={handleTextInputDelete} onSave={handleTextInputSave} />
  </section>;
}

export default TodoDetails;
