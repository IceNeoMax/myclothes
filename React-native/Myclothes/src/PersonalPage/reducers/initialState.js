/**
 * Created by vjtc0n on 9/22/16.
 */
import {Record} from 'immutable'

const Form = Record({
    searchedMember: new (Record({
        members: [
            {
                user_name: '',
                id: ''
            }
        ]
    })),
    isFetching:false,
    error: null,
    allPost: new (Record({
        posts: [
            {

            }
        ]
    }))
});

var InitialState = Record({
    form: new Form()
});

export default InitialState