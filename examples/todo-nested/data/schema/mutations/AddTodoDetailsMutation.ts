import {fromGlobalId, mutationWithClientMutationId} from 'graphql-relay';
import {GraphQLFieldConfig, GraphQLID, GraphQLNonNull, GraphQLString} from 'graphql';
import {GraphQLTodo} from '../nodes';
import {addTodoDetails, getTodoOrThrow, Todo} from '../../database';

type Input = {
  readonly details: string;
  readonly id: string;
  readonly userId: string;
};

type Payload = {
  readonly todoId: string;
};

const AddTodoDetailsMutation: GraphQLFieldConfig<any, any> = mutationWithClientMutationId({
  name: 'AddTodoDetails',
  inputFields: {
    details: {
      type: new GraphQLNonNull(GraphQLString),
    },
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  outputFields: {
    todo: {
      type: new GraphQLNonNull(GraphQLTodo),
      resolve: ({
                  todoId,
                }: Payload): Todo => getTodoOrThrow(todoId),
    },
  },
  mutateAndGetPayload: ({
                          id,
                          details,
                        }: Input): Payload => {
    const todoId = fromGlobalId(id).id;
    addTodoDetails(todoId, details);
    return {
      todoId,
    };
  },
});
export {AddTodoDetailsMutation};